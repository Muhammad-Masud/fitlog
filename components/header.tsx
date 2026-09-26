"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "@/components/icons";
import { useFitLog } from "@/components/providers";

const links = [
  { href: "/", label: "Workout" },
  { href: "/my-plan", label: "My Plan" },
];
const container =
  "mx-auto w-[min(1220px,calc(100%-48px))] max-[640px]:w-[calc(100%-24px)]";

export function Header() {
  const { plan, saved } = useFitLog();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="navbar sticky top-0 z-50 border-b border-[#252933] bg-[#0f1115]/95 px-0 backdrop-blur-xl">
      <div
        className={`${container} grid min-h-[62px] grid-cols-[1fr_auto_1fr] items-center gap-7 max-[980px]:grid-cols-[1fr_auto] max-[640px]:min-h-14`}
      >
        <Link
          className="inline-flex w-fit items-center gap-[9px] text-[13px] font-black tracking-[.18em] max-[640px]:text-[11px]"
          href="/"
          onClick={() => setOpen(false)}
        >
          <img
            className="h-[25px] w-[25px] object-contain max-[640px]:h-[23px] max-[640px]:w-[23px]"
            src="/logo.png"
            alt="FitLog logo"
          />
          <span>FITLOG</span>
        </Link>
        <nav
          className="flex h-[62px] items-center gap-[34px] text-[10px] font-extrabold uppercase tracking-[.14em] max-[980px]:hidden"
          aria-label="Main navigation"
        >
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith("/my-plan");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative inline-flex h-full items-center text-[#85878c] transition-colors hover:text-[#f1f2f4] ${active ? "text-[#f1f2f4] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#ccff00]" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex justify-end gap-[7px] max-[980px]:hidden">
          <Link
            className="badge h-[30px] min-w-[76px] justify-between rounded-full border border-[#ccff00] bg-[#ccff00] px-2.5 text-[9px] font-black uppercase tracking-[.1em] text-[#090b08]"
            href="/my-plan"
          >
            Plan <b className="text-[11px]">{plan.length}</b>
          </Link>
          <Link
            className="badge h-[30px] min-w-[76px] justify-between rounded-full border border-[#4b4e55] bg-transparent px-2.5 text-[9px] font-black uppercase tracking-[.1em] text-[#d9dadd]"
            href="/my-plan"
          >
            Saved <b className="text-[11px]">{saved.length}</b>
          </Link>
        </div>
        <button
          className="btn btn-square btn-ghost hidden h-[38px] w-[38px] justify-self-end rounded-sm border border-[#252933] text-[#f1f2f4] max-[980px]:inline-grid"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="grid border-t border-[#252933] bg-[#0d0f13] px-6 py-[9px] pb-[17px] max-[640px]:px-3">
          {links.map((link) => (
            <Link
              key={link.href}
              className="border-b border-[#252933] py-3 text-[9px] font-black uppercase tracking-[.12em] text-[#9b9da2]"
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            className="border-b border-[#252933] py-3 text-[9px] font-black uppercase tracking-[.12em] text-[#9b9da2]"
            href="/my-plan"
            onClick={() => setOpen(false)}
          >
            Plan{" "}
            <span className="float-right text-[#ccff00]">{plan.length}</span>
          </Link>
          <Link
            className="py-3 text-[9px] font-black uppercase tracking-[.12em] text-[#9b9da2]"
            href="/my-plan"
            onClick={() => setOpen(false)}
          >
            Saved{" "}
            <span className="float-right text-[#ccff00]">{saved.length}</span>
          </Link>
        </div>
      )}
    </header>
  );
}
