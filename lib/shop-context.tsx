"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useMoney } from "./money-context";

export type ThemeId = "default" | "matrix" | "sunset" | "ocean" | "void" | "gold";

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  type: "theme" | "effect" | "cosmetic";
  themeId?: ThemeId;
}

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: "theme-matrix",
    name: "Matrix Mode",
    description: "Green phosphor glow. You are the code.",
    price: 1.00,
    icon: "🟩",
    type: "theme",
    themeId: "matrix",
  },
  {
    id: "theme-sunset",
    name: "Sunset",
    description: "Warm amber and rose tones. Golden hour forever.",
    price: 1.50,
    icon: "🌅",
    type: "theme",
    themeId: "sunset",
  },
  {
    id: "theme-ocean",
    name: "Deep Ocean",
    description: "Cool teal and sapphire. Calm like the deep.",
    price: 1.50,
    icon: "🌊",
    type: "theme",
    themeId: "ocean",
  },
  {
    id: "theme-void",
    name: "The Void",
    description: "Pure black. Nothing. Everything.",
    price: 2.00,
    icon: "🌑",
    type: "theme",
    themeId: "void",
  },
  {
    id: "theme-gold",
    name: "Gilded",
    description: "Prestige gold accents. You've earned this.",
    price: 3.00,
    icon: "✨",
    type: "theme",
    themeId: "gold",
  },
];

export const THEME_VARS: Record<ThemeId, Record<string, string>> = {
  default: {
    "--background": "#0a0a0a",
    "--foreground": "#ededed",
    "--highlight": "#ef4444",
    "--highlight-rgb": "239 68 68",
  },
  matrix: {
    "--background": "#030f03",
    "--foreground": "#a3ffb0",
    "--highlight": "#00ff41",
    "--highlight-rgb": "0 255 65",
  },
  sunset: {
    "--background": "#0f080a",
    "--foreground": "#fde8d8",
    "--highlight": "#f97316",
    "--highlight-rgb": "249 115 22",
  },
  ocean: {
    "--background": "#020b12",
    "--foreground": "#d0f0ff",
    "--highlight": "#06b6d4",
    "--highlight-rgb": "6 182 212",
  },
  void: {
    "--background": "#000000",
    "--foreground": "#ffffff",
    "--highlight": "#a855f7",
    "--highlight-rgb": "168 85 247",
  },
  gold: {
    "--background": "#0a0800",
    "--foreground": "#fef3c7",
    "--highlight": "#f59e0b",
    "--highlight-rgb": "245 158 11",
  },
};

const SHOP_STORAGE_KEY = "shop_state_v1";

interface ShopState {
  owned: string[];
  activeTheme: ThemeId;
}

interface ShopContextType {
  owned: string[];
  activeTheme: ThemeId;
  shopOpen: boolean;
  setShopOpen: (open: boolean) => void;
  purchase: (item: ShopItem) => boolean;
  activateTheme: (themeId: ThemeId) => void;
  isOwned: (id: string) => boolean;
}

const ShopContext = createContext<ShopContextType | null>(null);

function loadShopState(): ShopState {
  try {
    if (typeof window === "undefined") return { owned: [], activeTheme: "default" };
    const raw = localStorage.getItem(SHOP_STORAGE_KEY);
    if (raw) return JSON.parse(raw) as ShopState;
  } catch {}
  return { owned: [], activeTheme: "default" };
}

function applyTheme(themeId: ThemeId) {
  if (typeof document === "undefined") return;
  const vars = THEME_VARS[themeId] || THEME_VARS.default;
  const root = document.documentElement;
  Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
}

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const { balance, awardOnce } = useMoney();
  const [state, setState] = useState<ShopState>(loadShopState);
  const [shopOpen, setShopOpen] = useState(false);

  // Apply theme on mount and whenever activeTheme changes
  useEffect(() => {
    applyTheme(state.activeTheme);
  }, [state.activeTheme]);

  // Persist on change
  useEffect(() => {
    try { localStorage.setItem(SHOP_STORAGE_KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  const purchase = (item: ShopItem): boolean => {
    if (state.owned.includes(item.id)) {
      // Already owned — just activate if it's a theme
      if (item.themeId) activateTheme(item.themeId);
      return false;
    }
    if (balance < item.price) return false;

    // Deduct via a negative award — we use a unique deduct ID
    const deductId = `shop_purchase_${item.id}_${Date.now()}`;
    // We can't directly deduct from the money context, so we use a workaround:
    // award a negative amount using the internal setBalance approach
    // Actually the cleanest way: dispatch a custom event the money context listens to
    window.dispatchEvent(new CustomEvent("shop:purchase", {
      detail: { price: item.price, itemId: item.id }
    }));

    setState(prev => ({
      ...prev,
      owned: [...prev.owned, item.id],
      activeTheme: item.themeId ?? prev.activeTheme,
    }));

    return true;
  };

  const activateTheme = (themeId: ThemeId) => {
    setState(prev => ({ ...prev, activeTheme: themeId }));
  };

  const isOwned = (id: string) => state.owned.includes(id);

  const value = useMemo(() => ({
    owned: state.owned,
    activeTheme: state.activeTheme,
    shopOpen,
    setShopOpen,
    purchase,
    activateTheme,
    isOwned,
  }), [state, shopOpen]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const c = useContext(ShopContext);
  if (!c) throw new Error("useShop must be used within ShopProvider");
  return c;
}
