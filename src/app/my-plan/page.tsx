"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

import {
  FiClock,
  FiStar,
  FiCheck,
  FiX,
} from "react-icons/fi";

import { FaFire } from "react-icons/fa";

import { usePlan } from "@/context/PlanContext";

type Tab = "plan" | "saved";

export default function MyPlanPage() {
  const {
    todayPlan,
    saved,
    removeFromPlan,
    removeFromSaved,
  } = usePlan();

  const [activeTab, setActiveTab] =
    useState<Tab>("plan");

  // Today's Plan metrics
  const metrics = useMemo(() => {
    const exercises = todayPlan.length;

    const minutes = todayPlan.reduce(
      (total, workout) =>
        total + workout.duration,
      0
    );

    const calories = todayPlan.reduce(
      (total, workout) =>
        total + workout.caloriesBurned,
      0
    );

    return {
      exercises,
      minutes,
      calories,
    };
  }, [todayPlan]);

  // Show list depending on active tab
  const currentList =
    activeTab === "plan"
      ? todayPlan
      : saved;

  // Mark workout as done
  const handleDone = (id: number) => {
    removeFromPlan(id);

    toast.success("Workout marked as done");
  };

  // Remove workout
  const handleRemove = (id: number) => {
    if (activeTab === "plan") {
      removeFromPlan(id);

      toast.success(
        "Workout removed from today's plan"
      );
    } else {
      removeFromSaved(id);

      toast.success(
        "Workout removed from saved"
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#101216] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}

        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">
            MY PLAN
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Cap of five lifts for today. Finish them,
            then load more.
          </p>
        </div>

        {/* ================= METRICS ================= */}

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

          {/* Exercises */}
          <div className="rounded-lg border border-white/10 bg-[#181a1f] p-5">
            <p className="text-xs uppercase tracking-wider text-gray-500">
              Exercises
            </p>

            <h2 className="mt-2 text-3xl font-black text-white">
              {metrics.exercises}
            </h2>
          </div>

          {/* Minutes */}
          <div className="rounded-lg border border-white/10 bg-[#181a1f] p-5">
            <p className="text-xs uppercase tracking-wider text-gray-500">
              Minutes
            </p>

            <h2 className="mt-2 text-3xl font-black text-white">
              {metrics.minutes}
            </h2>
          </div>

          {/* Calories */}
          <div className="rounded-lg border border-white/10 bg-[#181a1f] p-5">
            <p className="text-xs uppercase tracking-wider text-gray-500">
              Calories
            </p>

            <h2 className="mt-2 text-3xl font-black text-white">
              {metrics.calories}
            </h2>
          </div>

        </div>

        {/* ================= TABS ================= */}

        <div className="mt-10 flex border-b border-white/10">

          {/* Today's Plan */}
          <button
            onClick={() => setActiveTab("plan")}
            className={`relative px-5 py-3 text-sm font-semibold transition ${
              activeTab === "plan"
                ? "text-white"
                : "text-gray-500 hover:text-white"
            }`}
          >
            Today&apos;s Plan

            {activeTab === "plan" && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#ccff00]" />
            )}
          </button>

          {/* Saved */}
          <button
            onClick={() => setActiveTab("saved")}
            className={`relative px-5 py-3 text-sm font-semibold transition ${
              activeTab === "saved"
                ? "text-white"
                : "text-gray-500 hover:text-white"
            }`}
          >
            Saved

            {activeTab === "saved" && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#ccff00]" />
            )}
          </button>

        </div>

        {/* ================= EMPTY STATE ================= */}

        {currentList.length === 0 && (
          <div className="flex min-h-96 flex-col items-center justify-center text-center">

            <h2 className="text-2xl font-black uppercase">
              NOTHING HERE YET
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-gray-400">
              Browse the library and add a lift to get
              today moving.
            </p>

            <Link
              href="/"
              className="mt-6 rounded-md bg-[#ccff00] px-5 py-3 text-sm font-bold text-black transition hover:opacity-90"
            >
              Go to workouts
            </Link>

          </div>
        )}

        {/* ================= WORKOUT LIST ================= */}

        {currentList.length > 0 && (
          <div className="mt-8 space-y-4">

            {currentList.map((workout) => (
              <div
                key={workout.id}
                className="flex flex-col gap-5 rounded-lg border border-white/10 bg-[#181a1f] p-4 md:flex-row md:items-center"
              >

                {/* Image */}
                <div className="h-48 w-full shrink-0 overflow-hidden rounded-md md:h-32 md:w-44">
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    width={400}
                    height={300}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Workout Information */}
                <div className="flex-1">

                  {/* Tags */}
                  <div className="mb-2 flex flex-wrap gap-2">
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

                  {/* Name */}
                  <h2 className="text-lg font-black uppercase">
                    {workout.name}
                  </h2>

                  {/* Equipment */}
                  <p className="mt-1 text-xs text-gray-400">
                    {workout.equipment}
                  </p>

                  {/* Stats */}
                  <div className="mt-4 flex flex-wrap items-center gap-5 text-xs text-gray-400">

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
                        {workout.caloriesBurned} kcal
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

                {/* ================= ACTIONS ================= */}

                <div className="flex flex-wrap items-center gap-2 md:justify-end">

                  {/* View Details */}
                  <Link
                    href={`/workout/${workout.id}`}
                    className="rounded-md border border-white/20 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/5"
                  >
                    View Details
                  </Link>

                  {/* Mark as Done - only Today's Plan */}
                  {activeTab === "plan" && (
                    <button
                      onClick={() =>
                        handleDone(workout.id)
                      }
                      className="flex items-center gap-2 rounded-md bg-[#ccff00] px-4 py-2 text-xs font-bold text-black transition hover:opacity-90"
                    >
                      <FiCheck />

                      Mark as Done
                    </button>
                  )}

                  {/* Remove */}
                  <button
                    onClick={() =>
                      handleRemove(workout.id)
                    }
                    aria-label="Remove workout"
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-red-500/40 text-red-400 transition hover:bg-red-500/10"
                  >
                    <FiX />
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}