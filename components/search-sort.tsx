"use client";
import { ChevronDown, Search } from "@/components/icons";
export type SortKey = "duration" | "calories" | "rating";
export function SearchSort({
  query,
  setQuery,
  sort,
  setSort,
}: {
  query: string;
  setQuery: (value: string) => void;
  sort: SortKey;
  setSort: (value: SortKey) => void;
}) {
  return (
    <div className="flex items-center gap-2 max-[980px]:w-full max-[640px]:flex-col max-[640px]:items-stretch">
      <label className="flex min-h-[38px] w-[220px] items-center gap-[7px] rounded border border-[#252933] bg-[#101216] px-2.5 text-[#72757b] max-[980px]:flex-1 max-[640px]:w-full">
        <Search size={17} />
        <span className="sr-only">Search workouts</span>
        <input
          className="input h-auto min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 text-[10px] text-[#f1f2f4] shadow-none outline-none placeholder:text-[#666970] focus:border-0 focus:outline-none focus:ring-0"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search workout or tag"
        />
      </label>
      <label className="relative flex min-h-[38px] items-center gap-[7px] rounded border border-[#252933] bg-[#101216] px-[9px] text-[9px] uppercase tracking-[.1em] text-[#72757b] focus-within:border-[#3b404a] max-[640px]:justify-between">
        <span>Sort By</span>
        <select
          className="select h-auto min-h-0 appearance-none border-0 bg-transparent p-0 pr-[21px] text-[9px] font-extrabold uppercase text-[#d8dade] shadow-none outline-none focus:border-0 focus:outline-none focus:ring-0"
          value={sort}
          onChange={(event) => setSort(event.target.value as SortKey)}
          aria-label="Sort workouts"
        >
          <option value="duration">Duration</option>
          <option value="calories">Calories</option>
          <option value="rating">Rating</option>
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-[7px] text-[#888b91]"
          size={15}
        />
      </label>
    </div>
  );
}
