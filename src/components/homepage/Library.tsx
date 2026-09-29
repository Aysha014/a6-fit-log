"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Image from "next/image";
import Link from "next/link";

import {
  FiClock,
  FiStar,
  FiChevronDown,
} from "react-icons/fi";

import { FaFire } from "react-icons/fa";

import { Workout } from "@/types/workout";

type SortOption =
  | "duration"
  | "calories"
  | "rating";

export default function Library() {
  const [workouts, setWorkouts] = useState<
    Workout[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [sortBy, setSortBy] =
    useState<SortOption>("duration");

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "https://api.abcz.workers.dev/api/fitlog"
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch workouts"
          );
        }

        const data: Workout[] =
          await response.json();

        setWorkouts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const sortedWorkouts = useMemo(() => {
    const copied = [...workouts];

    if (sortBy === "duration") {
      return copied.sort(
        (a, b) => a.duration - b.duration
      );
    }

    if (sortBy === "calories") {
      return copied.sort(
        (a, b) =>
          a.caloriesBurned -
          b.caloriesBurned
      );
    }

    return copied.sort(
      (a, b) => b.rating - a.rating
    );
  }, [workouts, sortBy]);

  return (
    <section
      id="library"
      className="bg-[#101216] text-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        {/* Heading + Sort */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight md:text-3xl">
              THE LIBRARY
            </h2>

            <p className="mt-2 text-xs text-[#8b8d91]">
              Twelve lifts covering every major
              muscle group.
            </p>
          </div>

          {/* Sort */}
          <div className="relative">
            <label
              htmlFor="sort"
              className="mr-2 text-xs text-gray-400"
            >
              Sort By
            </label>

            <select
              id="sort"
              value={sortBy}
              onChange={(event) =>
                setSortBy(
                  event.target
                    .value as SortOption
                )
              }
              className="appearance-none rounded-md border border-white/10 bg-[#181a1f] py-2 pl-4 pr-9 text-xs text-white outline-none"
            >
              <option value="duration">
                Duration
              </option>

              <option value="calories">
                Calories
              </option>

              <option value="rating">
                Rating
              </option>
            </select>

            <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 mt-2px -translate-y-1/2 text-xs text-gray-400" />
          </div>

        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-80 flex-col items-center justify-center gap-4">

            <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-[#ccff00]" />

            <p className="text-sm text-gray-400">
              Loading workouts…
            </p>

          </div>
        )}

        {/* Grid */}
        {!loading && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {sortedWorkouts.map(
              (workout) => (
                <Link
                  key={workout.id}
                  href={`/workout/${workout.id}`}
                  className="group overflow-hidden rounded-lg border border-white/5 bg-[#181a1f] transition hover:-translate-y-1 hover:border-[#ccff00]/40"
                >

                  {/* Image */}
                  <div className="h-56 w-full overflow-hidden">
                    <Image
                      src={workout.image}
                      alt={workout.name}
                      width={600}
                      height={400}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Body */}
                  <div className="px-4 pb-4 pt-4">

                    {/* Tags */}
                    <div className="mb-3 flex flex-wrap gap-2">
                      {workout.muscleGroups.map(
                        (group) => (
                          <span
                            key={group}
                            className="rounded-full bg-[#ccff00] px-2.5 py-1 text-[9px] font-black uppercase text-black"
                          >
                            {group}
                          </span>
                        )
                      )}
                    </div>

                    <h3 className="text-sm font-black uppercase tracking-wide">
                      {workout.name}
                    </h3>

                    <p className="mt-1 text-[11px] text-gray-400">
                      {workout.equipment}
                    </p>

                    <div className="my-4 h-px bg-white/10" />

                    <div className="flex flex-wrap items-center gap-5 text-[10px] text-gray-400">

                      <div className="flex items-center gap-1.5">
                        <FiClock />
                        {workout.duration} min
                      </div>

                      <div className="flex items-center gap-1.5">
                        <FaFire />
                        {workout.caloriesBurned} kcal
                      </div>

                      <div className="flex items-center gap-1.5">
                        <FiStar />
                        {workout.rating}
                      </div>

                    </div>
                  </div>
                </Link>
              )
            )}

          </div>
        )}

      </div>
    </section>
  );
}