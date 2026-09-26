"use client";
import { useEffect, useMemo, useState } from "react";
import { getWorkouts } from "@/lib/api";
import type { Workout } from "@/lib/types";
import { SearchSort, type SortKey } from "@/components/search-sort";
import { WorkoutCard } from "@/components/workout-card";
import { Loading } from "@/components/loading";
export function HomeLibrary() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("duration");
  useEffect(() => {
    let cancelled = false;
    getWorkouts()
      .then((items) => {
        if (!cancelled) setWorkouts(items);
      })
      .catch(() => {
        if (!cancelled)
          setError(
            "We could not load the workout library. Please refresh and try again.",
          );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return [...workouts]
      .filter(
        (workout) =>
          !term ||
          workout.name.toLowerCase().includes(term) ||
          workout.categories.some((tag) => tag.toLowerCase().includes(term)),
      )
      .sort((a, b) => a[sort] - b[sort]);
  }, [workouts, query, sort]);
  return (
    <section
      className="px-0 py-[58px] pb-[86px] max-[640px]:py-12 max-[640px]:pb-16"
      id="library"
    >
      <div className="mx-auto w-[min(1220px,calc(100%-48px))] max-[640px]:w-[calc(100%-24px)]">
        <div className="mb-[25px] flex items-end justify-between gap-[30px] max-[980px]:flex-col max-[980px]:items-stretch">
          <div>
            <p className="mb-[15px] text-[9px] font-black uppercase leading-none tracking-[.18em] text-[#96989d]">
              <span className="mr-2 inline-block h-0.5 w-5 bg-[#ccff00] align-middle" />{" "}
              THE LIBRARY
            </p>
            <h2 className="m-0 font-[Impact] text-[clamp(42px,5vw,62px)] font-black uppercase leading-[.9] tracking-[-.015em]">
              THE <em className="not-italic text-[#ccff00]">LIBRARY.</em>
            </h2>
            <p className="mt-2.5 text-[11px] text-[#8a8b8e]">
              Twelve lifts covering every major muscle group.
            </p>
          </div>
          <SearchSort
            query={query}
            setQuery={setQuery}
            sort={sort}
            setSort={setSort}
          />
        </div>
        {loading && <Loading />}
        {!loading && error && (
          <div className="border border-dashed border-[#343942] p-7 text-center text-[11px] text-[#8a8b8e]">
            {error}
          </div>
        )}
        {!loading && !error && filtered.length === 0 && (
          <div className="border border-dashed border-[#343942] p-7 text-center text-[11px] text-[#8a8b8e]">
            No workouts match that search.
          </div>
        )}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-3 gap-3 max-[980px]:grid-cols-2 max-[640px]:grid-cols-1">
            {filtered.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
