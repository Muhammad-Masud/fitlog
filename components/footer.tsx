import Link from "next/link";
export function Footer() {
  return (
    <footer className="border-t border-[#252933] bg-[#0b0d10]">
      <div className="mx-auto flex min-h-[82px] w-[min(1220px,calc(100%-48px))] items-center justify-between gap-5 max-[640px]:min-h-[105px] max-[640px]:flex-col max-[640px]:items-start max-[640px]:justify-center max-[640px]:py-5 max-[640px]:w-[calc(100%-24px)]">
        <Link
          className="inline-flex w-fit items-center gap-[9px] text-[13px] font-black tracking-[.18em]"
          href="/"
        >
          <img
            className="h-[25px] w-[25px] object-contain"
            src="/logo.png"
            alt="FitLog logo"
          />
          <span>FITLOG</span>
        </Link>
        <p className="m-0 text-[8px] tracking-[.02em] text-[#62656b]">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
