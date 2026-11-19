"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Clock,
  Flame,
  Trash2,
  Check,
  Bookmark,
  Dumbbell,
  ArrowRight,
  Plus,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  getPlan,
  savePlan,
  getSaved,
  saveSaved,
  PlanWorkout,
} from "@/library/fitlog";

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");

  const [plan, setPlan] = useState<PlanWorkout[]>([]);
  const [saved, setSaved] = useState<PlanWorkout[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setPlan(getPlan());
    setSaved(getSaved());
    setLoaded(true);
  }, []);

  // Remove workout from today's plan
  const removeWorkout = (id: string | number) => {
    const updated = plan.filter(
      (item) => String(item.id) !== String(id)
    );

    setPlan(updated);
    savePlan(updated);

    toast.success("Workout removed");
  };

  // Mark workout as completed
  const toggleComplete = (id: string | number) => {
    const updated = plan.map((item) =>
      String(item.id) === String(id)
        ? { ...item, completed: !item.completed }
        : item
    );

    setPlan(updated);
    savePlan(updated);

    toast.success("Workout status updated");
  };

  // Remove saved workout
  const removeSaved = (id: string | number) => {
    const updated = saved.filter(
      (item) => String(item.id) !== String(id)
    );

    setSaved(updated);
    saveSaved(updated);

    toast.success("Removed from saved");
  };

  // Add saved workout to today's plan
  const addToPlan = (workout: PlanWorkout) => {
    if (plan.some((item) => String(item.id) === String(workout.id))) {
      toast.error("Already in today's plan");
      return;
    }

    if (plan.length >= 5) {
      toast.error("Maximum 5 workouts allowed");
      return;
    }

    const updated = [
      ...plan,
      { ...workout, completed: false },
    ];

    setPlan(updated);
    savePlan(updated);

    toast.success("Added to today's plan");
  };

  // Statistics
  const totalDuration = plan.reduce(
    (total, item) => total + Number(item.duration || 0),
    0
  );

  const totalCalories = plan.reduce(
    (total, item) => total + Number(item.caloriesBurned || 0),
    0
  );

  const completedCount = plan.filter(
    (item) => item.completed
  ).length;

  const workouts = activeTab === "today" ? plan : saved;

  if (!loaded) {
    return (
      <main className="min-h-screen bg-[#101114] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-lime-400" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#101114] text-white px-5 md:px-10 py-10">

      <div className="max-w-6xl mx-auto">

        {/* Header */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold">MY PLAN</h1>

          <p className="text-gray-500 mt-2 text-sm">
            Manage your workouts and track your daily progress.
          </p>
        </div>

        {/* Statistics */}

        <div className="grid grid-cols-3 gap-3 bg-[#191c22] rounded-xl p-5 mb-8">

          <div>
            <Dumbbell size={18} className="text-lime-400 mb-2" />

            <p className="text-gray-400 text-xs">
              Workouts
            </p>

            <h2 className="text-2xl font-bold">
              {plan.length}
            </h2>
          </div>

          <div>
            <Clock size={18} className="text-lime-400 mb-2" />

            <p className="text-gray-400 text-xs">
              Duration
            </p>

            <h2 className="text-2xl font-bold">
              {totalDuration}
              <span className="text-xs text-gray-400 ml-1">MIN</span>
            </h2>
          </div>

          <div>
            <Flame size={18} className="text-lime-400 mb-2" />

            <p className="text-gray-400 text-xs">
              Calories
            </p>

            <h2 className="text-2xl font-bold">
              {totalCalories}
              <span className="text-xs text-gray-400 ml-1">KCAL</span>
            </h2>
          </div>

        </div>

        {/* Tabs */}

        <div className="flex gap-6 border-b border-gray-800 mb-7">

          <button
            onClick={() => setActiveTab("today")}
            className={`pb-3 text-sm font-semibold ${
              activeTab === "today"
                ? "text-lime-400 border-b-2 border-lime-400"
                : "text-gray-400"
            }`}
          >
            TODAY'S PLAN ({plan.length})
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`pb-3 text-sm font-semibold ${
              activeTab === "saved"
                ? "text-lime-400 border-b-2 border-lime-400"
                : "text-gray-400"
            }`}
          >
            SAVED ({saved.length})
          </button>

        </div>

        {/* Empty State */}

        {workouts.length === 0 ? (

          <div className="min-h-[280px] bg-[#191c22] rounded-xl flex flex-col justify-center items-center text-center p-8">

            <div className="w-16 h-16 rounded-full bg-[#252a30] flex items-center justify-center mb-5">
              {activeTab === "today" ? (
                <Dumbbell size={28} className="text-lime-400" />
              ) : (
                <Bookmark size={28} className="text-lime-400" />
              )}
            </div>

            <h2 className="text-lg font-bold mb-2">
              {activeTab === "today"
                ? "NOTHING HERE YET"
                : "NO SAVED WORKOUTS"}
            </h2>

            <p className="text-gray-500 text-sm mb-6 max-w-sm">
              {activeTab === "today"
                ? "Your workout plan is empty. Explore workouts and add your favorites."
                : "You haven't saved any workouts yet. Save workouts to access them later."}
            </p>

            <Link
              href="/"
              className="btn btn-sm bg-lime-400 hover:bg-lime-300 text-black border-none"
            >
              Browse Workouts
              <ArrowRight size={16} />
            </Link>

          </div>

        ) : (

          /* Workout Cards */

          <div className="space-y-4">

            {workouts.map((workout) => (

              <div
                key={workout.id}
                className="bg-[#191c22] border border-gray-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4"
              >

                {/* Image */}

                <div className="w-full sm:w-24 h-24 rounded-lg overflow-hidden bg-[#252a30] shrink-0">

                  <img
                    src={workout.image}
                    alt={workout.name}
                    className="w-full h-full object-cover"
                  />

                </div>

                {/* Information */}

                <div className="flex-1">

                  <h3 className="font-bold uppercase text-sm">
                    {workout.name}
                  </h3>

                  <p className="text-gray-500 text-xs mt-2">
                    {workout.difficulty} · {workout.equipment}
                  </p>

                  <div className="flex gap-4 mt-3 text-xs text-gray-400">

                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {workout.duration} min
                    </span>

                    <span className="flex items-center gap-1">
                      <Flame size={14} />
                      {workout.caloriesBurned} kcal
                    </span>

                  </div>

                </div>

                {/* Actions */}

                <div className="flex flex-wrap items-center gap-2">

                  <Link
                    href={`/workouts/${workout.id}`}
                    className="btn btn-sm bg-[#252a30] text-white border-none"
                  >
                    Details
                  </Link>

                  {activeTab === "today" ? (

                    <>
                      <button
                        onClick={() => toggleComplete(workout.id)}
                        className={`btn btn-sm border-none ${
                          workout.completed
                            ? "bg-lime-400 text-black"
                            : "bg-[#252a30] text-white"
                        }`}
                      >
                        <Check size={15} />
                        {workout.completed ? "Done" : "Mark Done"}
                      </button>

                      <button
                        onClick={() => removeWorkout(workout.id)}
                        className="btn btn-sm bg-[#252a30] text-red-400 border-none"
                      >
                        <Trash2 size={15} />
                      </button>
                    </>

                  ) : (

                    <>
                      <button
                        onClick={() => addToPlan(workout)}
                        className="btn btn-sm bg-lime-400 text-black border-none"
                      >
                        <Plus size={15} />
                        Add to Plan
                      </button>

                      <button
                        onClick={() => removeSaved(workout.id)}
                        className="btn btn-sm bg-[#252a30] text-red-400 border-none"
                      >
                        <Trash2 size={15} />
                      </button>
                    </>

                  )}

                </div>

              </div>

            ))}

          </div>

        )}

        {/* Progress */}

        {activeTab === "today" && plan.length > 0 && (

          <div className="mt-8 bg-[#191c22] rounded-xl p-5">

            <div className="flex justify-between items-center mb-4">

              <h3 className="text-sm font-bold">
                WORKOUT PROGRESS
              </h3>

              <span className="text-lime-400 text-xs">
                {completedCount}/{plan.length} COMPLETED
              </span>

            </div>

            <div className="w-full h-2 bg-[#30343a] rounded-full overflow-hidden">

              <div
                className="h-full bg-lime-400 transition-all duration-300"
                style={{
                  width: `${(completedCount / plan.length) * 100}%`,
                }}
              />

            </div>

          </div>

        )}

      </div>

    </main>
  );
}