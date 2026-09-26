import type { Workout } from "@/lib/types";

export const API_URL = "https://api.abcz.workers.dev/api/fitlog";

const FALLBACK_IMAGE = "/banner.png";

function asString(value: unknown, fallback = ""): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return fallback;
}

function asNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const parsed = Number.parseFloat(asString(value));
  return Number.isFinite(parsed) ? parsed : fallback;
}

function asStringArray(value: unknown): string[] {
  if (Array.isArray(value))
    return value.map((item) => asString(item)).filter(Boolean);
  if (typeof value === "string")
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  return [];
}

function firstValue(source: Record<string, unknown>, keys: string[]): unknown {
  for (const key of keys) {
    if (source[key] !== undefined && source[key] !== null) return source[key];
  }
  return undefined;
}

function normalizeWorkout(raw: unknown, index: number): Workout {
  const item = (raw && typeof raw === "object" ? raw : {}) as Record<
    string,
    unknown
  >;
  const rawCategories = firstValue(item, [
    "categories",
    "category",
    "tags",
    "muscleGroups",
    "muscle_groups",
  ]);
  const categories = asStringArray(rawCategories);
  const rawInstructions = firstValue(item, ["instructions", "steps", "howTo"]);
  const instructions = asStringArray(rawInstructions);

  return {
    id: asString(
      firstValue(item, ["id", "_id", "workoutId"]),
      String(index + 1),
    ),
    name: asString(
      firstValue(item, ["name", "title", "workoutName"]),
      `Workout ${index + 1}`,
    ),
    description: asString(
      firstValue(item, ["description", "summary", "details"]),
      "A focused strength movement designed to help you train with intent and log every set.",
    ),
    categories: categories.length ? categories : ["Strength"],
    equipment: asString(
      firstValue(item, ["equipment", "equipmentName"]),
      "Gym equipment",
    ),
    difficulty: asString(
      firstValue(item, ["difficulty", "level"]),
      "Intermediate",
    ),
    sets: asString(firstValue(item, ["sets", "setCount"]), "4"),
    reps: asString(firstValue(item, ["reps", "repRange"]), "8-10"),
    duration: asNumber(
      firstValue(item, ["duration", "durationMinutes", "minutes"]),
      25,
    ),
    calories: asNumber(
      firstValue(item, ["calories", "caloriesBurned", "kcal"]),
      180,
    ),
    rating: asNumber(firstValue(item, ["rating", "score"]), 4.8),
    image: asString(
      firstValue(item, ["image", "imageUrl", "thumbnail", "photo", "cover"]),
      FALLBACK_IMAGE,
    ),
    instructions: instructions.length
      ? instructions
      : [
          "Set up with controlled posture and a stable starting position.",
          "Brace your core and move through the full comfortable range of motion.",
          "Keep the tempo controlled and focus on the target muscle group.",
          "Return to the start with control, then repeat for the prescribed reps.",
        ],
  };
}

function extractItems(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== "object") return [];
  const object = payload as Record<string, unknown>;
  const candidates = [
    object.data,
    object.workouts,
    object.results,
    object.items,
  ];
  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate;
    if (candidate && typeof candidate === "object") {
      const nested = candidate as Record<string, unknown>;
      for (const key of ["data", "workouts", "results", "items"]) {
        if (Array.isArray(nested[key])) return nested[key] as unknown[];
      }
    }
  }
  return [payload];
}

export async function getWorkouts(): Promise<Workout[]> {
  const response = await fetch("/api/fitlog", { cache: "no-store" });
  if (!response.ok) throw new Error(`FitLog API returned ${response.status}`);
  const payload: unknown = await response.json();
  return extractItems(payload).map(normalizeWorkout);
}

export async function getWorkout(id: string): Promise<Workout> {
  const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`FitLog API returned ${response.status}`);
  const payload: unknown = await response.json();
  const items = extractItems(payload);
  return normalizeWorkout(items[0] ?? payload, 0);
}
