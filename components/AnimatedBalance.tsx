"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import RotatingNavText, { RotatingNavTextHandle } from "@/components/RotatingNavText";
import { useMoney } from "@/lib/money-context";
import { formatVND, formatVNDDelta } from "@/lib/currency";

export default function AnimatedBalance({
  value,
  holdMs = 1000,
  rotateMs = 300,
  className = "",
  snapDelayMs = 10,
}: {
  value: string | number;
  holdMs?: number;
  rotateMs?: number;
  className?: string;
  snapDelayMs?: number;
}) {
  const { overflowTick, underflowTick, leverPullTick } = useMoney();
  const lastLeverPullTickRef = useRef(0);
  const lastCallWasLeverPullRef = useRef(false);
  const lastOverTickRef = useRef(0);
  const lastUnderTickRef = useRef(0);
  const prev = useRef(Number(value));
  const format = (n: number) => formatVND(n);

  const [trio, setTrio] = useState([format(Number(value)), format(Number(value)), format(Number(value))]);
  const [leverAward, setLeverAward] = useState(false);

  const [deltaColor, setDeltaColor] = useState("green");
  const [rtKey, setRtKey] = useState(0);
  const rtRef = useRef<RotatingNavTextHandle | null>(null);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  // width measurement + animation
  const contentRef = useRef<HTMLSpanElement | null>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const update = () => {
      const w = el.getBoundingClientRect().width;
      setWidth(w);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [rtKey]);

  useEffect(() => {
    if (overflowTick === 0 || overflowTick === lastOverTickRef.current) return;
    lastOverTickRef.current = overflowTick;
    setLeverAward(false);

    const prevStr = format(prev.current);
    setDeltaColor("red");
    setTrio([prevStr, "OVERFLOW", prevStr]);
    setRtKey((k) => k + 1);

    timers.current.push(
      window.setTimeout(() => {
        rtRef.current?.jumpTo(1);
        timers.current.push(
          window.setTimeout(() => {
            rtRef.current?.jumpTo(2);
          }, rotateMs + holdMs),
        );
      }, snapDelayMs),
    );

    return () => clearTimers();
  }, [overflowTick, holdMs, rotateMs, snapDelayMs]);

  useEffect(() => {
    if (underflowTick === 0 || underflowTick === lastUnderTickRef.current) return;
    lastUnderTickRef.current = underflowTick;
    setLeverAward(false);

    const prevStr = format(prev.current);
    setDeltaColor("red");
    setTrio([prevStr, "BROKE", prevStr]);
    setRtKey((k) => k + 1);

    timers.current.push(
      window.setTimeout(() => {
        rtRef.current?.jumpTo(1);
        timers.current.push(
          window.setTimeout(() => {
            rtRef.current?.jumpTo(2);
          }, rotateMs + holdMs),
        );
      }, snapDelayMs),
    );

    return () => clearTimers();
  }, [underflowTick, holdMs, rotateMs, snapDelayMs]);

  useEffect(() => {
    if (
      leverPullTick !== 0 &&
      leverPullTick !== lastLeverPullTickRef.current &&
      lastCallWasLeverPullRef.current
    ) {
      lastLeverPullTickRef.current = leverPullTick;
      setLeverAward(true);

      clearTimers();
      const next = Number(value);
      const prevVal = prev.current;

      if (Number.isFinite(next) && Number.isFinite(prevVal) && next !== prevVal) {
        const delta = +(next - prevVal).toFixed(2);
        const deltaStr = formatVNDDelta(delta);
        const baseStr = format(next);

        if (delta > 40) {
          setDeltaColor("jackpot");
        } else {
          setDeltaColor("green");
        }
        setTrio(["---", deltaStr, baseStr]);
        setRtKey((k) => k + 1);

        timers.current.push(
          window.setTimeout(() => {
            rtRef.current?.jumpTo(1);
            timers.current.push(
              window.setTimeout(() => {
                rtRef.current?.jumpTo(2);
              }, rotateMs + 400),
            );
          }, snapDelayMs),
        );
      }

      prev.current = next;

      lastCallWasLeverPullRef.current = false;
      return () => clearTimers();
    } else {
      if (leverPullTick !== 0 && leverPullTick !== lastLeverPullTickRef.current) {
        lastLeverPullTickRef.current = leverPullTick;
        lastCallWasLeverPullRef.current = true;
      } else {
        lastCallWasLeverPullRef.current = false;
      }
      setLeverAward(false);
      clearTimers();
      const next = Number(value);
      const prevVal = prev.current;

      if (Number.isFinite(next) && Number.isFinite(prevVal) && next !== prevVal) {
        const delta = +(next - prevVal).toFixed(2);
        const deltaStr = formatVNDDelta(delta);
        const baseStr = format(next);
        const prevStr = format(prevVal);

        setDeltaColor(delta >= 0 ? "green" : "red");

        setTrio([prevStr, deltaStr, baseStr]);
        setRtKey((k) => k + 1);

        timers.current.push(
          window.setTimeout(() => {
            rtRef.current?.jumpTo(1);
            timers.current.push(
              window.setTimeout(() => {
                rtRef.current?.jumpTo(2);
              }, rotateMs + holdMs),
            );
          }, snapDelayMs),
        );
      } else {
        const b = Number.isFinite(next) ? format(next) : "—";
        setTrio([b, b, b]);
      }

      prev.current = next;

      return () => clearTimers();
    }
  }, [value, holdMs, rotateMs, snapDelayMs, leverPullTick]);

  return (
    <motion.span
      layout="size"
      initial={false}
      className={`inline-block w-[10ch] text-right align-baseline tabular-nums ${className}`}
      style={{ lineHeight: 1, overflow: "hidden" }}
      animate={{ width }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <span ref={contentRef} className="inline-block items-baseline">
        <RotatingNavText
          key={rtKey}
          ref={rtRef}
          texts={trio}
          auto={false}
          loop={false}
          className=""
        />
      </span>
    </motion.span>
  );
}
