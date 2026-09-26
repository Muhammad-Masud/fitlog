"use client";
import Link from "next/link";
import type { Workout } from "@/lib/types";
import { Clock, Flame, Star } from "@/components/icons";
export function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${encodeURIComponent(workout.id)}`}
      className="card group overflow-hidden rounded border border-[#252933] bg-[#15171d] shadow-none transition duration-150 hover:-translate-y-0.5 hover:border-[#3c414b] hover:bg-[#171920]"
    >
      <div className="grid h-[185px] place-items-center overflow-hidden bg-[#111318] max-[640px]:h-[235px]">
        <img
          src={workout.image || "/banner.png"}
          alt={workout.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-[13px] pb-3.5">
        <div className="flex flex-wrap gap-[5px]">
          {workout.categories.slice(0, 2).map((tag) => (
            <span
              className="rounded-sm border border-[#343840] bg-white/[.01] px-1.5 py-1 text-[7px] font-black uppercase tracking-[.12em] text-[#a5a7ab]"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mb-1 mt-2.5 text-[13px] font-bold leading-[1.15] tracking-[.035em]">
          {workout.name}
        </h3>
        <p className="m-0 text-[9px] text-[#8a8b8e]">{workout.equipment}</p>
        <div className="mt-[13px] flex flex-wrap items-center gap-[11px] text-[8px] text-[#777a80]">
          {" "}
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
    </Link>
  );
}
