import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export function Hero() {
  return (
    <section className="overflow-hidden border-b border-[#252933] bg-[#0f1115]">
      <div className="mx-auto grid min-h-[470px] w-[min(1220px,calc(100%-48px))] grid-cols-[minmax(0,1.08fr)_minmax(310px,.92fr)] items-center gap-[50px] max-[980px]:grid-cols-1 max-[980px]:min-h-0 max-[980px]:pt-[38px] max-[640px]:w-[calc(100%-24px)] max-[640px]:pt-7">
        <div>
          <p className="mb-[15px] text-[9px] font-black uppercase leading-none tracking-[.18em] text-[#96989d]">
            <span className="mr-2 inline-block h-0.5 w-5 bg-[#ccff00] align-middle" />{" "}
            WORKOUT LIBRARY
          </p>
          <h1 className="max-w-[650px] font-[Impact] text-[clamp(54px,6.2vw,86px)] font-black uppercase leading-[.9] tracking-[-.015em] max-[640px]:text-[49px]">
            TRAIN WITH INTENT.{" "}
            <em className="not-italic text-[#ccff00]">LOG EVERY SET.</em>
          </h1>
          <p className="my-[22px] mb-[25px] max-w-[560px] text-[12px] leading-[1.65] text-[#8a8b8e] max-[640px]:text-[11px]">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <Link
            className="btn h-10 min-h-10 rounded border-[#ccff00] bg-[#ccff00] px-[15px] text-[9px] font-black uppercase tracking-[.12em] text-[#090b08] shadow-none hover:border-[#c2f800] hover:bg-[#c2f800]"
            href="#library"
          >
            BROWSE WORKOUTS <ArrowRight size={17} />
          </Link>
        </div>
        <div className="relative grid min-h-[410px] place-items-center max-[980px]:min-h-[330px] max-[640px]:min-h-[285px]">
          <div className="absolute h-[290px] w-[290px] rounded-full bg-[#ccff00]/[.055] blur-[42px]" />
          <img
            className="relative z-10 w-[min(430px,100%)] drop-shadow-[0_22px_36px_rgba(0,0,0,.62)] max-[640px]:w-[300px]"
            src="/banner.png"
            alt="FitLog training illustration"
          />
        </div>
      </div>
    </section>
  );
}
