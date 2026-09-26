"use client";
import Link from "next/link";
import type { StoredWorkout } from "@/lib/types";
import { Check, Clock, Flame, Star, X } from "@/components/icons";
import { useFitLog } from "@/components/providers";
export function PlanCard({
  workout,
  saved,
}: {
  workout: StoredWorkout;
  saved?: boolean;
}) {
  const { markDone, removeFromPlan, removeFromSaved } = useFitLog();
  return (
    <article
      className={`card grid grid-cols-[112px_minmax(0,1fr)_auto] items-center gap-4 rounded border border-[#252933] bg-[#15171d] p-2.5 shadow-none max-[640px]:grid-cols-[84px_1fr] ${workout.done ? "opacity-50" : ""}`}
    >
      <div className="h-[92px] overflow-hidden rounded-sm bg-[#111318] max-[640px]:h-[84px]">
        <img
          className="h-full w-full object-cover"
          src={workout.image || "/banner.png"}
          alt=""
        />
      </div>
      <div>
        <div className="flex flex-wrap gap-[5px]">
          {workout.categories.slice(0, 2).map((tag) => (
            <span
              className="rounded-sm border border-[#343840] px-1.5 py-1 text-[7px] font-black uppercase tracking-[.12em] text-[#a5a7ab]"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mb-0.5 mt-1.5 text-[14px] font-bold">{workout.name}</h3>
        <p className="m-0 text-[9px] text-[#8a8b8e]">{workout.equipment}</p>
        <div className="mt-[13px] flex flex-wrap gap-[11px] text-[8px] text-[#777a80]">
          <span className="inline-flex items-center gap-1">
            <Clock size={14} /> {workout.duration} min
          </span>
          <span className="inline-flex items-center gap-1">
            <Flame size={14} /> {workout.calories} kcal
          </span>
          <span className="inline-flex items-center gap-1 text-[#ccff00]">
            <Star size={14} /> {workout.rating.toFixed(1)}
          </span>
        </div>
      </div>
      <div className="flex max-w-[300px] flex-wrap items-center justify-end gap-1.5 max-[640px]:col-span-full max-[640px]:max-w-none max-[640px]:justify-start">
        <Link
          href={`/workout/${encodeURIComponent(workout.id)}`}
          className="btn btn-ghost min-h-[31px] h-[31px] rounded-sm border border-[#353942] px-[9px] text-[8px] font-black uppercase tracking-[.08em] text-[#d4d6d9] shadow-none hover:border-[#666a72] hover:bg-transparent"
        >
          View Details
        </Link>
        {!saved && (
          <button
            className="btn btn-ghost min-h-[31px] h-[31px] rounded-sm border border-[#353942] px-[9px] text-[8px] font-black uppercase tracking-[.08em] text-[#d4d6d9] shadow-none hover:border-[#666a72] hover:bg-transparent"
            type="button"
            onClick={() => markDone(workout.id)}
            disabled={workout.done}
          >
            <Check size={14} />
            {workout.done ? "Done" : "Mark as Done"}
          </button>
        )}
        <button
          className="btn btn-square btn-ghost h-[31px] min-h-[31px] w-[31px] rounded-sm border border-[#353942] text-[#85888e] shadow-none hover:border-[#5a3638] hover:bg-transparent hover:text-[#ff6464]"
          type="button"
          onClick={() =>
            saved ? removeFromSaved(workout.id) : removeFromPlan(workout.id)
          }
          aria-label={saved ? "Remove from saved" : "Remove from plan"}
        >
          <X size={17} />
        </button>
      </div>
    </article>
  );
}
