"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { Workout } from "@/types/workout";

type PlanContextType = {
  todayPlan: Workout[];
  saved: Workout[];

  addToPlan: (workout: Workout) => {
    success: boolean;
    message: string;
  };

  saveWorkout: (workout: Workout) => {
    success: boolean;
    message: string;
  };

  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
};

const PlanContext = createContext<PlanContextType | undefined>(
  undefined
);

export default function PlanProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [todayPlan, setTodayPlan] = useState<Workout[]>(() => {
    if (typeof window === "undefined") return [];

    const stored = localStorage.getItem("fitlog-plan");

    return stored ? JSON.parse(stored) : [];
  });

  const [saved, setSaved] = useState<Workout[]>(() => {
    if (typeof window === "undefined") return [];

    const stored = localStorage.getItem("fitlog-saved");

    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(todayPlan)
    );
  }, [todayPlan]);

  useEffect(() => {
    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(saved)
    );
  }, [saved]);

  const addToPlan = (workout: Workout) => {
    const exists = todayPlan.some(
      (item) => item.id === workout.id
    );

    if (exists) {
      return {
        success: false,
        message: "Workout already in today's plan",
      };
    }

    if (todayPlan.length >= 5) {
      return {
        success: false,
        message: "Today's plan can contain only 5 workouts",
      };
    }

    setTodayPlan((previous) => [
      ...previous,
      workout,
    ]);

    return {
      success: true,
      message: "Added to today's plan",
    };
  };

  const saveWorkout = (workout: Workout) => {
    const exists = saved.some(
      (item) => item.id === workout.id
    );

    if (exists) {
      return {
        success: false,
        message: "Workout already saved",
      };
    }

    setSaved((previous) => [
      ...previous,
      workout,
    ]);

    return {
      success: true,
      message: "Saved for later",
    };
  };

  const removeFromPlan = (id: number) => {
    setTodayPlan((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  const removeFromSaved = (id: number) => {
    setSaved((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        saved,
        addToPlan,
        saveWorkout,
        removeFromPlan,
        removeFromSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error(
      "usePlan must be used inside PlanProvider"
    );
  }

  return context;
}