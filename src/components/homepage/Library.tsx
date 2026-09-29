"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  FiClock,
  FiSearch,
  FiStar,
  FiChevronDown,
} from "react-icons/fi";

import { FaFire } from "react-icons/fa";

import type { Workout } from "@/types/workout";

type SortOption = "duration" | "calories" | "rating";

export default function Library() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] =
    useState<SortOption>("duration");

  // Fetch workouts
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "https://api.abcz.workers.dev/api/fitlog"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
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

  // Search + Sort
  const displayedWorkouts = useMemo(() => {
    const search = searchText
      .trim()
      .toLowerCase();

    const filteredWorkouts = workouts.filter(
      (workout) => {
        const matchesName = workout.name
          .toLowerCase()
          .includes(search);

        const matchesTag =
          workout.muscleGroups.some((group) =>
            group
              .toLowerCase()
              .includes(search)
          );

        return matchesName || matchesTag;
      }
    );

    return [...filteredWorkouts].sort(
      (a, b) => {
        if (sortBy === "calories") {
          return (
            a.caloriesBurned -
            b.caloriesBurned
          );
        }

        if (sortBy === "rating") {
          return b.rating - a.rating;
        }

        // Default: Duration
        return a.duration - b.duration;
      }
    );
  }, [workouts, searchText, sortBy]);

  return (
    <section
      id="library"
      className="bg-[#101216] text-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

          {/* Left side */}
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight md:text-3xl">
              THE LIBRARY
            </h2>

            <p className="mt-2 text-xs text-[#8b8d91]">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Search + Sort */}
          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:items-center">

            {/* Search */}
            <div className="relative w-full sm:w-72">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500" />

              <input
                type="text"
                value={searchText}
                onChange={(event) =>
                  setSearchText(
                    event.target.value
                  )
                }
                placeholder="Search workouts..."
                className="w-full rounded-md border border-white/10 bg-[#181a1f] py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#ccff00]"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap text-xs text-gray-400">
                Sort By
              </span>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(
                      event.target
                        .value as SortOption
                    )
                  }
                  className="appearance-none rounded-md border border-white/10 bg-[#181a1f] py-2.5 pl-4 pr-9 text-sm text-white outline-none focus:border-[#ccff00]"
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

                <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400" />
              </div>
            </div>

          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-80 flex-col items-center justify-center gap-4">

            <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-[#ccff00]" />

            <p className="text-sm text-gray-400">
              Loading workouts...
            </p>

          </div>
        )}

        {/* No results */}
        {!loading &&
          displayedWorkouts.length === 0 && (
            <div className="flex min-h-64 flex-col items-center justify-center text-center">

              <h3 className="text-xl font-black uppercase">
                No workouts found
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Try another workout name or muscle group.
              </p>

            </div>
          )}

        {/* Workout Grid */}
        {!loading &&
          displayedWorkouts.length > 0 && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

              {displayedWorkouts.map(
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

                    {/* Card Content */}
                    <div className="px-4 pb-4 pt-4">

                      {/* Muscle group tags */}
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

                      {/* Workout name */}
                      <h3 className="text-sm font-black uppercase tracking-wide text-white">
                        {workout.name}
                      </h3>

                      {/* Equipment */}
                      <p className="mt-1 text-[11px] text-gray-400">
                        {workout.equipment}
                      </p>

                      {/* Divider */}
                      <div className="my-4 h-px bg-white/10" />

                      {/* Stats */}
                      <div className="flex flex-wrap items-center gap-5 text-[10px] text-gray-400">

                        {/* Duration */}
                        <div className="flex items-center gap-1.5">
                          <FiClock />
                          <span>
                            {workout.duration} min
                          </span>
                        </div>

                        {/* Calories */}
                        <div className="flex items-center gap-1.5">
                          <FaFire />
                          <span>
                            {
                              workout.caloriesBurned
                            }{" "}
                            kcal
                          </span>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1.5">
                          <FiStar />
                          <span>
                            {workout.rating}
                          </span>
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