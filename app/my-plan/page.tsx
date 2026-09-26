"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { PlanCard } from "@/components/plan-card";
import { SearchSort, type SortKey } from "@/components/search-sort";
import { Loading } from "@/components/loading";
import { useFitLog } from "@/components/providers";
export default function MyPlanPage() {
  const { plan, saved, hydrated } = useFitLog();
  const [tab, setTab] = useState<"plan" | "saved">("plan");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("duration");
  const current = tab === "plan" ? plan : saved;
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return [...current]
      .filter(
        (workout) =>
          !term ||
          workout.name.toLowerCase().includes(term) ||
          workout.categories.some((tag) => tag.toLowerCase().includes(term)),
      )
      .sort((a, b) => a[sort] - b[sort]);
  }, [current, query, sort]);
  const minutes = plan.reduce((sum, workout) => sum + workout.duration, 0);
  const calories = plan.reduce((sum, workout) => sum + workout.calories, 0);
  if (!hydrated)
    return (
      <section className="px-0 py-[58px] pb-[86px]">
        <div className="mx-auto w-[min(1220px,calc(100%-48px))]">
          <Loading />
        </div>
      </section>
    );
  return (
    <section className="px-0 py-[58px] pb-[86px] max-[640px]:py-12 max-[640px]:pb-16">
      <div className="mx-auto w-[min(1220px,calc(100%-48px))] max-[640px]:w-[calc(100%-24px)]">
        <p className="mb-[15px] text-[9px] font-black uppercase leading-none tracking-[.18em] text-[#96989d]">
          <span className="mr-2 inline-block h-0.5 w-5 bg-[#ccff00] align-middle" />{" "}
          TRAINING LOG
        </p>
        <h1 className="m-0 font-[Impact] text-[clamp(50px,6.5vw,82px)] font-black uppercase leading-[.9] tracking-[-.015em]">
          MY PLAN
        </h1>
        <p className="my-[11px] mb-[29px] text-[11px] text-[#8a8b8e]">
          Cap of five lifts for today. Finish them, then load more.
        </p>
        <div className="mb-[22px] grid grid-cols-3 gap-2 max-[640px]:gap-1.5">
          {[
            ["Exercises", plan.length],
            ["Minutes", minutes],
            ["Calories", calories],
          ].map(([label, value]) => (
            <div
              className="stat rounded border border-[#252933] bg-[#15171d] px-5 py-[18px] shadow-none max-[640px]:px-3"
              key={String(label)}
            >
              <span className="stat-title text-[8px] font-black uppercase tracking-[.13em] text-[#777a80]">
                {label}
              </span>
              <strong className="stat-value mt-1 text-[30px] font-black leading-none text-[#f1f2f4] max-[640px]:text-[28px]">
                {value}
              </strong>
            </div>
          ))}
        </div>
        <div
          className="tabs mb-[17px] border-b border-[#252933]"
          role="tablist"
        >
          <button
            className={`tab min-h-[42px] rounded-none border-b-2 border-transparent px-[17px] text-[9px] font-black uppercase tracking-[.1em] ${tab === "plan" ? "tab-active border-[#ccff00] text-[#f1f2f4]" : "text-[#777a80]"}`}
            type="button"
            onClick={() => setTab("plan")}
          >
            Today&apos;s Plan ({plan.length})
          </button>
          <button
            className={`tab min-h-[42px] rounded-none border-b-2 border-transparent px-[17px] text-[9px] font-black uppercase tracking-[.1em] ${tab === "saved" ? "tab-active border-[#ccff00] text-[#f1f2f4]" : "text-[#777a80]"}`}
            type="button"
            onClick={() => setTab("saved")}
          >
            Saved ({saved.length})
          </button>
        </div>
        <div className="mb-[13px] flex justify-between gap-[15px] max-[640px]:flex-col">
          <p className="mb-0 mt-3.5 text-[9px] font-black uppercase tracking-[.18em] text-[#96989d]">
            {tab === "plan" ? "TODAY" : "BOOKMARKED"}
          </p>
          <SearchSort
            query={query}
            setQuery={setQuery}
            sort={sort}
            setSort={setSort}
          />
        </div>
        {filtered.length === 0 ? (
          <div className="flex min-h-[270px] flex-col items-center justify-center border border-dashed border-[#30353d] bg-[#101216] p-7 text-center">
            <h2 className="m-0 font-[Impact] text-[38px] font-black uppercase leading-[.9]">
              NOTHING HERE YET
            </h2>
            <p className="my-2 mb-[18px] text-[10px] text-[#8a8b8e]">
              {tab === "plan"
                ? "Browse the library and add a lift to get today moving."
                : "Save a lift from the library to keep it close for later."}
            </p>
            <Link
              href="/"
              className="btn min-h-10 rounded border-[#ccff00] bg-[#ccff00] px-[15px] text-[9px] font-black uppercase tracking-[.12em] text-[#090b08] shadow-none hover:bg-[#c2f800]"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="grid gap-2">
            {filtered.map((workout) => (
              <PlanCard
                key={workout.id}
                workout={workout}
                saved={tab === "saved"}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
