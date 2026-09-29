"use client";

import toast from "react-hot-toast";

import {
  FiPlus,
  FiBookmark,
} from "react-icons/fi";

import { Workout } from "@/types/workout";
import { usePlan } from "@/context/PlanContext";

export default function DetailsButtons({
  workout,
}: {
  workout: Workout;
}) {
  const {
    addToPlan,
    saveWorkout,
    todayPlan,
  } = usePlan();

  const planFull = todayPlan.length >= 5;

  const handlePlan = () => {
    const result = addToPlan(workout);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const handleSave = () => {
    const result = saveWorkout(workout);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">

      <button
        onClick={handlePlan}
        disabled={planFull}
        className="flex items-center justify-center gap-2 rounded-md bg-[#ccff00] px-5 py-3 text-sm font-bold text-black disabled:cursor-not-allowed disabled:opacity-40"
      >
        <FiPlus />
        Add to today&apos;s plan
      </button>

      <button
        onClick={handleSave}
        className="flex items-center justify-center gap-2 rounded-md border border-white/20 px-5 py-3 text-sm font-bold text-white hover:bg-white/5"
      >
        <FiBookmark />
        Save for later
      </button>

    </div>
  );
}