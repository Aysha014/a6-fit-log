import Image from "next/image";
import { notFound } from "next/navigation";

import DetailsButtons from "@/components/details/DetailsButtons";

import { Workout } from "@/types/workout";

async function getWorkout(
  id: string
): Promise<Workout | null> {
  const response = await fetch(
    `https://api.abcz.workers.dev/api/fitlog/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export default async function WorkoutDetailsPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const workout = await getWorkout(id);

  if (!workout) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#101216] text-white">

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">

        {/* Image */}
        <div className="overflow-hidden rounded-lg bg-[#181a1f]">
          <Image
            src={workout.image}
            alt={workout.name}
            width={800}
            height={900}
            className="h-full min-h-450px w-full object-cover"
          />
        </div>

        {/* Content */}
        <div>

          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            {workout.muscleGroups.map(
              (group) => (
                <span
                  key={group}
                  className="rounded-full bg-[#ccff00] px-3 py-1 text-[10px] font-bold uppercase text-black"
                >
                  {group}
                </span>
              )
            )}
          </div>

          <h1 className="text-3xl font-black uppercase sm:text-4xl">
            {workout.name}
          </h1>

          <p className="mt-4 leading-7 text-gray-400">
            {workout.description}
          </p>

          {/* Specs */}
          <div className="mt-8 overflow-hidden rounded-lg border border-white/10">

            <SpecRow
              label="EQUIPMENT"
              value={workout.equipment}
            />

            <SpecRow
              label="DIFFICULTY"
              value={workout.difficulty}
            />

            <SpecRow
              label="SETS"
              value={String(workout.sets)}
            />

            <SpecRow
              label="REPS"
              value={workout.reps}
            />

            <SpecRow
              label="DURATION"
              value={`${workout.duration} min`}
            />

            <SpecRow
              label="CALORIES"
              value={`${workout.caloriesBurned} kcal`}
            />

            <SpecRow
              label="RATING"
              value={String(workout.rating)}
            />

          </div>

          {/* Instructions */}
          <div className="mt-8">
            <h2 className="text-xl font-black uppercase">
              Instructions
            </h2>

            <ol className="mt-5 space-y-4">
              {workout.instructions.map(
                (instruction, index) => (
                  <li
                    key={instruction}
                    className="flex gap-4 text-sm leading-6 text-gray-300"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-xs font-bold text-black">
                      {index + 1}
                    </span>

                    <span>
                      {instruction}
                    </span>
                  </li>
                )
              )}
            </ol>
          </div>

          <DetailsButtons
            workout={workout}
          />

        </div>
      </div>
    </main>
  );
}

function SpecRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-2 border-b border-white/10 px-4 py-3 last:border-b-0">

      <span className="text-xs font-bold text-gray-500">
        {label}
      </span>

      <span className="text-sm text-white">
        {value}
      </span>

    </div>
  );
}