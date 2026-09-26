"use client";
import { Check, Heart } from "@/components/icons";
import type { Workout } from "@/lib/types";
import { useFitLog } from "@/components/providers";
export function DetailActions({ workout }: { workout: Workout }) {
  const { addToPlan, saveForLater, isInPlan, isSaved, plan } = useFitLog();
  const inPlan = isInPlan(workout.id);
  const full = plan.length >= 5 && !inPlan;
  return (
    <div className="mt-6 flex flex-wrap gap-2 max-[760px]:[&_.btn]:w-full">
      <button
        className="btn h-10 min-h-10 rounded border-[#ccff00] bg-[#ccff00] px-[15px] text-[9px] font-black uppercase tracking-[.12em] text-[#090b08] shadow-none hover:border-[#c2f800] hover:bg-[#c2f800]"
        type="button"
        disabled={inPlan || full}
        onClick={() => addToPlan(workout)}
      >
        <Check size={17} />{" "}
        {inPlan
          ? "IN TODAY’S PLAN"
          : full
            ? "PLAN IS FULL"
            : "ADD TO TODAY’S PLAN"}
      </button>
      <button
        className="btn h-10 min-h-10 rounded border-[#41444b] bg-transparent px-[15px] text-[9px] font-black uppercase tracking-[.12em] text-[#f1f2f4] shadow-none hover:border-[#6b6f77] hover:bg-[#171920]"
        type="button"
        disabled={isSaved(workout.id)}
        onClick={() => saveForLater(workout)}
      >
        <Heart size={17} /> {isSaved(workout.id) ? "SAVED" : "SAVE FOR LATER"}
      </button>
    </div>
  );
}
