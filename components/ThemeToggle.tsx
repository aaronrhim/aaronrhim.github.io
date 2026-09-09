"use client";

import { useEffect, useSyncExternalStore } from "react";

type Setting = "system" | "light" | "dark";

/** Fired on `window` after a theme change so every mounted toggle re-reads. */
const THEME_EVENT = "themesettingchange";

/**
 * The authoritative theme setting is the `data-theme-setting` attribute on
 * <html>, written by the inline script in app/layout.tsx before first paint.
 * This component reads it rather than keeping a second copy in React state.
 *
 * `useSyncExternalStore` rather than `useState` + `useEffect`. Reading the DOM
 * into state on mount means the first render is always wrong and then corrected
 * - which is both a cascading render and, in the version this replaces, a real
 * bug: an effect that ran with the stale initial value overwrote `data-theme`
 * with the OS preference, so choosing light on a dark machine snapped straight
 * back to dark on every navigation. Treating <html> as the external store it
 * already is removes the whole class of problem.
 */
function subscribe(onChange: () => void) {
  window.addEventListener(THEME_EVENT, onChange);
  return () => window.removeEventListener(THEME_EVENT, onChange);
}

function getSnapshot(): Setting {
  return (document.documentElement.dataset.themeSetting as Setting | undefined) ?? "system";
}

/** The server cannot know the choice, and "system" is the honest default. */
function getServerSnapshot(): Setting {
  return "system";
}

export default function ThemeToggle() {
  const setting = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  /**
   * Keep `data-theme` correct for whatever the setting currently is, and follow
   * the OS while that setting is "system" - so a machine that flips to dark at
   * sunset takes the page with it. Writes to the DOM, never to React state,
   * which is what an effect is actually for.
   *
   * `sync()` resolves the theme for EVERY setting rather than bailing out early
   * for the non-system ones, and that is load-bearing. During hydration
   * `useSyncExternalStore` hands back the server snapshot - "system" - so this
   * effect runs once with a value that may not be the user's real choice. An
   * earlier version returned early unless the setting was "system", which meant
   * that first pass wrote the OS preference to `data-theme` and the corrected
   * pass, seeing a non-system setting, returned without undoing it. Choosing
   * light on a dark machine snapped back to dark on every navigation. Making
   * the effect idempotent for all three settings removes the sequencing problem
   * entirely.
   */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => {
      document.documentElement.dataset.theme =
        setting === "system" ? (mq.matches ? "dark" : "light") : setting;
    };
    sync();
    if (setting !== "system") return;
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [setting]);

  function cycle() {
    const next: Setting = setting === "light" ? "dark" : setting === "dark" ? "system" : "light";
    const resolved =
      next === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : next;

    document.documentElement.dataset.themeSetting = next;
    document.documentElement.dataset.theme = resolved;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private window, or storage blocked by policy. The choice simply will
      // not persist, which is never worth failing the interaction over.
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  }

  const label =
    setting === "light"
      ? "Theme: light. Switch to dark."
      : setting === "dark"
        ? "Theme: dark. Follow the system setting."
        : "Theme: following the system. Switch to light.";

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={label}
      title={label}
      /* Fixed 2rem box. al-folio carries a comment on exactly this rule - "Fix
         footprint to prevent navbar shifting when icon changes" - because three
         glyphs of different widths in an auto-sized button make the nav jump
         every time it is pressed. */
      className="text-text-dim hover:text-accent inline-flex h-8 w-8 shrink-0 items-center justify-center transition-colors duration-200"
    >
      {setting === "light" ? <SunIcon /> : setting === "dark" ? <MoonIcon /> : <SystemIcon />}
    </button>
  );
}

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden {...stroke}>
      <circle cx="8" cy="8" r="3.1" />
      <path d="M8 1v1.6M8 13.4V15M1 8h1.6M13.4 8H15M3 3l1.1 1.1M11.9 11.9L13 13M13 3l-1.1 1.1M4.1 11.9L3 13" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden {...stroke}>
      <path d="M13.4 9.6A5.8 5.8 0 0 1 6.4 2.6a5.8 5.8 0 1 0 7 7Z" />
    </svg>
  );
}

/**
 * A circle split down the middle, half outline and half filled. al-folio builds
 * this by clipping two Font Awesome glyphs together; as plain SVG it is a
 * stroked circle plus a half-disc, which is fewer moving parts and does not
 * depend on an icon font having loaded.
 */
function SystemIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
      <circle cx="8" cy="8" r="5.6" {...stroke} />
      <path d="M8 2.4a5.6 5.6 0 0 1 0 11.2Z" fill="currentColor" />
    </svg>
  );
}
