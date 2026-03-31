"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Check, Lock } from "lucide-react";
import { SHOP_ITEMS, THEME_VARS, useShop, ThemeId } from "@/lib/shop-context";
import { useMoney } from "@/lib/money-context";
import { formatVND } from "@/lib/currency";

export default function ShopPanel() {
  const { shopOpen, setShopOpen, purchase, activateTheme, isOwned, activeTheme } = useShop();
  const { balance } = useMoney();
  const panelRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Close on outside click (desktop only — mobile has backdrop)
  useEffect(() => {
    if (!shopOpen || isMobile) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setShopOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [shopOpen, setShopOpen, isMobile]);

  const ShopContent = () => (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/8">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-white/50" />
          <span className="text-sm font-bold text-white tracking-tight">Cửa hàng</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/40 font-mono">
            Số dư: <span className="text-emerald-400 font-bold">{formatVND(balance)}</span>
          </span>
          <button
            onClick={() => setShopOpen(false)}
            className="text-white/30 hover:text-white/70 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Section label */}
      <div className="px-4 pt-3 pb-1">
        <p className="text-[10px] font-bold tracking-widest text-white/25 uppercase">Chủ đề / Themes</p>
      </div>

      {/* Items */}
      <div className="px-3 pb-3 space-y-1.5 overflow-y-auto" style={{ maxHeight: isMobile ? "55vh" : "22rem" }}>
        {SHOP_ITEMS.map((item) => {
          const owned = isOwned(item.id);
          const active = item.themeId === activeTheme;
          const canAfford = balance >= item.price;
          const themeColors = item.themeId ? THEME_VARS[item.themeId] : null;
          const accentColor = themeColors?.["--highlight"] ?? "#ef4444";
          const vndPrice = formatVND(item.price);

          return (
            <button
              key={item.id}
              onClick={() => {
                if (owned) {
                  if (item.themeId) activateTheme(item.themeId as ThemeId);
                } else {
                  purchase(item);
                }
              }}
              disabled={!owned && !canAfford}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150
                ${active
                  ? "bg-white/[0.08] ring-1 ring-white/20"
                  : owned
                  ? "hover:bg-white/[0.06] cursor-pointer"
                  : canAfford
                  ? "hover:bg-white/[0.05] cursor-pointer"
                  : "opacity-40 cursor-not-allowed"
                }`}
            >
              {/* Color swatch */}
              <div
                className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-base"
                style={{
                  background: themeColors
                    ? `linear-gradient(135deg, ${themeColors["--background"]} 0%, ${accentColor}50 100%)`
                    : "#1a1a1a",
                  border: `1px solid ${accentColor}40`,
                }}
              >
                {item.icon}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-white/90 truncate">{item.name}</span>
                  {active && (
                    <span className="text-[9px] font-bold tracking-widest text-emerald-400/80 uppercase">Active</span>
                  )}
                </div>
                <p className="text-[11px] text-white/35 leading-tight mt-0.5 truncate">{item.description}</p>
              </div>

              {/* Status/price */}
              <div className="flex-shrink-0 text-right">
                {owned ? (
                  active ? (
                    <Check className="w-4 h-4 text-emerald-400 ml-auto" />
                  ) : (
                    <span className="text-xs text-white/30 font-medium">Apply</span>
                  )
                ) : canAfford ? (
                  <span className="text-xs font-bold text-emerald-400">{vndPrice}</span>
                ) : (
                  <div className="flex items-center gap-1 text-white/25">
                    <Lock className="w-3 h-3" />
                    <span className="text-xs font-bold">{vndPrice}</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Reset theme footer */}
      {activeTheme !== "default" && (
        <div className="px-3 pb-2">
          <button
            onClick={() => activateTheme("default")}
            className="w-full text-center text-[11px] text-white/25 hover:text-white/50 transition-colors py-1.5"
          >
            Reset to default theme
          </button>
        </div>
      )}

      {/* Hint */}
      <div className="px-4 py-2.5 bg-white/[0.02] border-t border-white/5">
        <p className="text-[10px] text-white/20 leading-snug">
          Kiếm tiền bằng cách click vào <span className="text-red-400/60">chữ đỏ</span> trên trang web.
        </p>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <AnimatePresence>
        {shopOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[280] bg-black/60 backdrop-blur-sm"
              onClick={() => setShopOpen(false)}
            />
            {/* Bottom sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[290] rounded-t-3xl border-t border-x border-white/10 bg-[#0e0e0e] shadow-2xl shadow-black/80 overflow-hidden"
            >
              {/* Drag indicator */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-white/15" />
              </div>
              <ShopContent />
              {/* Safe area padding for phones */}
              <div className="h-6" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  // Desktop: dropdown
  return (
    <AnimatePresence>
      {shopOpen && (
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: -8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.97 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="absolute top-full right-0 mt-3 w-80 rounded-2xl border border-white/10 bg-[#0e0e0e] shadow-2xl shadow-black/60 overflow-hidden z-[300]"
        >
          <ShopContent />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
