"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "./supabase-client";

// Small client-side persistence layer that talks to Supabase directly.
// If Supabase isn't configured or the API fails, we fall back to localStorage first, then in-memory only.

const STORAGE_KEY = "redtext_claims_v1";

type ClaimInfo = { claimed: boolean; amount: number };

type MoneyContextType = {
  balance: number;
  awardOnce: (rewardId: string, kind?: string, amount?: number) => boolean;
  hasAward: (rewardId: string) => boolean;
  claimedCount: number;
  overflowTick: number;
  underflowTick: number;
  leverPullTick: number;
  // helper for debugging
  setBalance?: (n: number) => void;
};

const MoneyContext = createContext<MoneyContextType | null>(null);

function computeBalanceFromClaims(claims: Record<string, ClaimInfo>) {
  const total = Object.values(claims).reduce((acc, c) => (c?.claimed ? acc + (c.amount || 0) : acc), 0);
  return +(total).toFixed(2);
}

export function MoneyProvider({ children }: { children: React.ReactNode }) {
  const [claims, setClaims] = useState<Record<string, ClaimInfo>>(() => {
    try {
      if (typeof window === "undefined") return {};
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Record<string, ClaimInfo>) : {};
    } catch (e) {
      return {};
    }
  });

  const [balance, setBalance] = useState(() => computeBalanceFromClaims(claims));
  const [overflowTick, setOverflowTick] = useState(0);
  const [underflowTick, setUnderflowTick] = useState(0);
  const [leverPullTick, setLeverPullTick] = useState(0);

  // load persisted claims from localStorage immediately and then merge with server
  useEffect(() => {
    let mounted = true;

    const localRaw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (localRaw) {
      try {
        const localClaims = JSON.parse(localRaw) as Record<string, ClaimInfo>;
        if (mounted) {
          setClaims(localClaims);
          setBalance(computeBalanceFromClaims(localClaims));
        }
      } catch (e) {
        console.warn("Failed to parse local redtext claims", e);
      }
    }

    (async () => {
      try {
        if (!supabase) return;
        
        const { data: serverClaimsData, error } = await supabase
          .from("redtext_claims")
          .select("reward_id, claimed, amount");
          
        if (error || !serverClaimsData) return;

        if (mounted) {
          const merged: Record<string, ClaimInfo> = { ...(claims || {}) };

          serverClaimsData.forEach((r: any) => {
            if (r?.reward_id && r?.claimed) {
              const amt = typeof r?.amount === "number" ? r.amount : 0.25;
              merged[r.reward_id] = { claimed: true, amount: amt };
            }
          });

          // write merged back to localStorage
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
          } catch (e) {
            console.warn("Failed to persist merged claims to localStorage", e);
          }

          setClaims(merged);
          setBalance(computeBalanceFromClaims(merged));
        }
      } catch (e) {
        // ignore - offline or no supabase configured
        console.warn("Failed to load redtext claims:", e);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // persist claims to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(claims));
    } catch (e) {
      console.warn("Failed to persist claims to localStorage", e);
    }
  }, [claims]);



  const persistClaim = async (rewardId: string, amount?: number) => {
    try {
      if (!supabase) return;
      
      await supabase
        .from("redtext_claims")
        .upsert({ 
          reward_id: rewardId, 
          claimed: true, 
          amount: amount,
          updated_at: new Date().toISOString() 
        }, { onConflict: "reward_id" });
    } catch (e) {
      console.warn("Failed to persist redtext claim", e);
    }
  };

  const awardOnce = (rewardId: string, kind = "redtext", amount = 0.25) => {
    if (claims[rewardId]?.claimed) return false;

    // update local claims immediately
    setClaims((c) => {
      const next = { ...c, [rewardId]: { claimed: true, amount } };
      // update balance derived from claims
      setBalance(computeBalanceFromClaims(next));
      return next;
    });

    // persist claim in background (best effort)
    void persistClaim(rewardId, amount);

    // trigger overflow/underflow ticks if needed (demo thresholds) - compute next value based on current balance
    setTimeout(() => {
      setBalance((b) => {
        const next = +(b + 0).toFixed(2); // already updated above
        if (next > 9999) setOverflowTick((t) => t + 1);
        if (next < 0) setUnderflowTick((t) => t + 1);
        return next;
      });
    }, 0);

    // emulate lever pull event for demonstration
    setLeverPullTick((t) => t + 1);

    // show header briefly when an award is claimed (simulate user scrolling up)
    try {
      if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("reward:showHeader"));
    } catch (e) {
      /* ignore */
    }

    return true;
  };

  const hasAward = (rewardId: string) => !!claims[rewardId]?.claimed;

  // Global click handler for elements annotated with data-reward-id
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest("[data-reward-id]") as HTMLElement | null;
      if (!el) return;
      const id = el.getAttribute("data-reward-id");
      if (!id) return;
      const amountAttr = el.getAttribute("data-reward-amount");
      const amount = amountAttr ? Number(amountAttr) : 0.25;
      try {
        awardOnce(id, "external", amount);
      } catch (err) {
        // fail silently
      }
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [awardOnce]);

  // Shop purchase deduction handler
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ price: number; itemId: string }>).detail;
      if (!detail) return;
      const deductId = `shop_deduct_${detail.itemId}`;
      // Use a negative award to deduct
      setClaims((c) => {
        const next = { ...c, [deductId]: { claimed: true, amount: -(detail.price) } };
        setBalance(computeBalanceFromClaims(next));
        return next;
      });
    };
    window.addEventListener("shop:purchase", handler);
    return () => window.removeEventListener("shop:purchase", handler);
  }, []);

  const value = useMemo(
    () => ({ balance, awardOnce, hasAward, claimedCount: Object.values(claims).filter((c) => c.claimed).length, overflowTick, underflowTick, leverPullTick, setBalance }),
    [balance, overflowTick, underflowTick, leverPullTick, claims],
  );

  return <MoneyContext.Provider value={value}>{children}</MoneyContext.Provider>;
}

export function useMoney() {
  const c = useContext(MoneyContext);
  if (!c) throw new Error("useMoney must be used within MoneyProvider");
  return c;
}
