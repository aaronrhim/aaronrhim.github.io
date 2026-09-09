"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Container from "./Container";
import ThemeToggle from "./ThemeToggle";
import { NAV, PROFILE } from "@/lib/content";

/**
 * al-folio's navbar: 57px tall, right-aligned links, one hairline along the
 * bottom, and an active state that is colour and weight only - no pill, no
 * underline, no bottom border, no background.
 *
 * One deliberate improvement on the original. al-folio makes the bar
 * translucent with `opacity: 0.95` on the ELEMENT, which fades the nav labels
 * along with the background and leaves text ghosting through from underneath;
 * `backdrop-filter` appears nowhere in its codebase. An alpha background plus
 * a backdrop blur gives the intended effect without washing out the labels.
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // A route is current if it is the route or a page beneath it, so a project
  // detail page still marks "Projects".
  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="border-rule bg-bg/85 fixed top-0 right-0 left-0 z-40 border-b backdrop-blur">
      <Container>
        <nav aria-label="Main" className="flex h-14 items-center justify-between gap-4">
          {/**
           * The split-weight wordmark - al-folio's actual signature, and it
           * costs one span. The first name at 600 against the surname at 300
           * gives the mark a hierarchy without a logo, a second typeface or a
           * colour. On the home page the mark is hidden, because it would be
           * repeating the H1 immediately below it.
           */}
          <Link
            href="/"
            className="text-text hover:text-text text-[1.05rem] hover:no-underline"
            aria-label={`${PROFILE.name} - home`}
          >
            <span className={pathname === "/" ? "sr-only" : undefined}>
              <span className="font-semibold">Aaron</span> <span className="font-light">Rhim</span>
            </span>
          </Link>

          <div className="flex items-center gap-1">
            <ul className="hidden items-center gap-6 sm:flex">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isCurrent(item.href) ? "page" : undefined}
                    className={
                      isCurrent(item.href)
                        ? "text-accent text-[0.95rem] font-semibold hover:no-underline"
                        : "text-text hover:text-accent text-[0.95rem] font-light transition-colors duration-200 hover:no-underline"
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <span className="bg-rule mx-2 hidden h-4 w-px sm:block" aria-hidden />
            <ThemeToggle />

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="text-text -mr-2 inline-flex h-8 w-8 items-center justify-center sm:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              {/* al-folio's hand-rolled hamburger: three 22x2px bars, 4px
                  apart, rotating into an X over 200ms. */}
              <span aria-hidden className="flex flex-col items-center gap-[4px]">
                <Bar className={open ? "translate-y-[6px] rotate-45" : ""} />
                <Bar className={open ? "opacity-0" : ""} />
                <Bar className={open ? "-translate-y-[6px] -rotate-45" : ""} />
              </span>
            </button>
          </div>
        </nav>
      </Container>

      {/* Rendered always, collapsed by grid-template-rows so the open height is
          the content's natural height rather than a max-height ceiling that
          either clips or eases wrong. */}
      <div
        id="mobile-nav"
        className="grid transition-[grid-template-rows] duration-300 ease-out sm:hidden"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <Container className="pb-4">
            <ul className="border-rule flex flex-col border-t pt-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isCurrent(item.href) ? "page" : undefined}
                    tabIndex={open ? undefined : -1}
                    onClick={() => setOpen(false)}
                    className={
                      isCurrent(item.href)
                        ? "text-accent block py-2 font-semibold hover:no-underline"
                        : "text-text block py-2 font-light hover:no-underline"
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </div>
      </div>
    </header>
  );
}

function Bar({ className = "" }: { className?: string }) {
  return (
    <span
      className={`bg-text block h-[2px] w-[22px] rounded-[1px] transition-all duration-200 ${className}`}
    />
  );
}
