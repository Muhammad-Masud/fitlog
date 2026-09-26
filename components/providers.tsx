"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { StoredWorkout, Workout } from "@/lib/types";

const PLAN_KEY = "fitlog-plan";
const SAVED_KEY = "fitlog-saved";
type Toast = { id: number; message: string };
type FitLogContextValue = {
  plan: StoredWorkout[];
  saved: StoredWorkout[];
  hydrated: boolean;
  toasts: Toast[];
  addToPlan: (workout: Workout) => boolean;
  saveForLater: (workout: Workout) => boolean;
  removeFromPlan: (id: string) => void;
  removeFromSaved: (id: string) => void;
  markDone: (id: string) => void;
  isInPlan: (id: string) => boolean;
  isSaved: (id: string) => boolean;
};
const FitLogContext = createContext<FitLogContextValue | null>(null);

export function Providers({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<StoredWorkout[]>([]);
  const [saved, setSaved] = useState<StoredWorkout[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    try {
      const storedPlan = JSON.parse(
        localStorage.getItem(PLAN_KEY) ?? "[]",
      ) as StoredWorkout[];
      const storedSaved = JSON.parse(
        localStorage.getItem(SAVED_KEY) ?? "[]",
      ) as StoredWorkout[];
      setPlan(Array.isArray(storedPlan) ? storedPlan : []);
      setSaved(Array.isArray(storedSaved) ? storedSaved : []);
    } catch {
      setPlan([]);
      setSaved([]);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  }, [plan, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [saved, hydrated]);

  const notify = (message: string) => {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current, { id, message }]);
    window.setTimeout(
      () => setToasts((current) => current.filter((toast) => toast.id !== id)),
      2600,
    );
  };

  const value = useMemo<FitLogContextValue>(
    () => ({
      plan,
      saved,
      hydrated,
      toasts,
      addToPlan: (workout) => {
        if (plan.length >= 5) {
          notify("Today’s plan is full");
          return false;
        }
        if (plan.some((item) => item.id === workout.id)) {
          notify("Already in today’s plan");
          return false;
        }
        setPlan((current) => [...current, { ...workout, done: false }]);
        notify("Added to today’s plan");
        return true;
      },
      saveForLater: (workout) => {
        if (saved.some((item) => item.id === workout.id)) {
          notify("Already saved for later");
          return false;
        }
        setSaved((current) => [...current, { ...workout }]);
        notify("Saved for later");
        return true;
      },
      removeFromPlan: (id) => {
        setPlan((current) => current.filter((item) => item.id !== id));
        notify("Removed from today’s plan");
      },
      removeFromSaved: (id) => {
        setSaved((current) => current.filter((item) => item.id !== id));
        notify("Removed from saved");
      },
      markDone: (id) => {
        setPlan((current) =>
          current.map((item) =>
            item.id === id ? { ...item, done: true } : item,
          ),
        );
        notify("Workout marked as done");
      },
      isInPlan: (id) => plan.some((item) => item.id === id),
      isSaved: (id) => saved.some((item) => item.id === id),
    }),
    [plan, saved, hydrated, toasts],
  );

  return (
    <FitLogContext.Provider value={value}>
      {children}
      <div
        className="fixed bottom-[18px] right-[18px] z-[100] grid gap-2 pointer-events-none"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <div
            className="alert rounded border border-[#3b4630] bg-[#11140d] px-[13px] py-[11px] text-[9px] tracking-[.05em] text-[#eef0ea] shadow-[0_15px_40px_rgba(0,0,0,.38)]"
            key={toast.id}
            role="status"
          >
            <span className="mr-2 inline-block h-[5px] w-[5px] bg-[#ccff00] align-middle" />
            {toast.message}
          </div>
        ))}
      </div>
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  const context = useContext(FitLogContext);
  if (!context) throw new Error("useFitLog must be used inside Providers");
  return context;
}
