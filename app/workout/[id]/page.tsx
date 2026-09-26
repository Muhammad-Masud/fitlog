import Link from "next/link";
import { notFound } from "next/navigation";
import { getWorkout } from "@/lib/api";
import { DetailActions } from "@/components/detail-actions";
import { ArrowRight } from "@/components/icons";
export default async function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  try {
    const workout = await getWorkout(id);
    if (!workout.id) notFound();
    return (
      <section className="px-0 py-[58px] pb-[86px] max-[640px]:py-12 max-[640px]:pb-16">
        <div className="mx-auto w-[min(1220px,calc(100%-48px))] max-[640px]:w-[calc(100%-24px)]">
          <div className="grid grid-cols-[minmax(0,.92fr)_minmax(0,1.08fr)] items-start gap-[52px] max-[980px]:grid-cols-1">
            <div className="sticky top-[84px] grid min-h-[590px] place-items-center overflow-hidden rounded border border-[#252933] bg-[#15171d] max-[980px]:static max-[980px]:min-h-[460px] max-[640px]:min-h-[330px]">
              <img
                className="h-full min-h-[590px] w-full object-cover max-[980px]:min-h-[460px] max-[640px]:min-h-[330px]"
                src={workout.image || "/banner.png"}
                alt={workout.name}
              />
            </div>
            <div>
              <p className="mb-[15px] text-[9px] font-black uppercase tracking-[.18em] text-[#96989d]">
                <span className="mr-2 inline-block h-0.5 w-5 bg-[#ccff00] align-middle" />{" "}
                WORKOUT DETAIL
              </p>
              <h1 className="my-3.5 font-[Impact] text-[clamp(46px,5.2vw,74px)] font-black uppercase leading-[.9] tracking-[-.015em] max-[640px]:text-[48px]">
                {workout.name}
              </h1>
              <p className="max-w-[600px] text-[12px] leading-[1.7] text-[#8a8b8e]">
                {workout.description}
              </p>
              <div className="my-[19px] flex flex-wrap gap-[5px]">
                {workout.categories.map((tag) => (
                  <span
                    className="rounded-sm border border-[#343840] px-1.5 py-1 text-[7px] font-black uppercase tracking-[.12em] text-[#a5a7ab]"
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-[25px] border-t border-[#252933] bg-white/[.008]">
                {[
                  ["EQUIPMENT", workout.equipment],
                  ["DIFFICULTY", workout.difficulty],
                  ["SETS", workout.sets],
                  ["REPS", workout.reps],
                  ["DURATION", `${workout.duration} min`],
                  ["CALORIES", `${workout.calories} kcal`],
                  ["RATING", workout.rating.toFixed(1)],
                ].map(([label, value]) => (
                  <div
                    className="grid grid-cols-2 border-b border-[#252933] py-[11px] text-[9px]"
                    key={String(label)}
                  >
                    <span className="tracking-[.13em] text-[#666a71]">
                      {label}
                    </span>
                    <span className="text-right font-bold text-[#e0e1e3]">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-7">
                <h2 className="mb-[13px] text-[9px] font-black uppercase tracking-[.17em]">
                  INSTRUCTIONS
                </h2>
                <ol className="m-0 list-none p-0">
                  {workout.instructions.slice(0, 4).map((step, index) => (
                    <li
                      className="grid grid-cols-[28px_1fr] gap-[11px] border-b border-[#252933] py-[11px] text-[10px] leading-[1.55] text-[#96989d]"
                      key={`${index}-${step}`}
                    >
                      <b className="text-[#ccff00]">
                        {String(index + 1).padStart(2, "0")}
                      </b>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <DetailActions workout={workout} />
              <Link
                className="mt-[18px] inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[.1em] text-[#777a80] hover:text-[#f1f2f4]"
                href="/"
              >
                ← Back to library <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  } catch {
    notFound();
  }
}
