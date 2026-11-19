"use client";

import { useEffect, useState } from "react";
import {useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Clock,
  Flame,
  Star,
  Dumbbell,
  Plus,
  Bookmark,
  Check,
} from "lucide-react";
import toast from "react-hot-toast";

import { getWorkoutById } from "@/library/api";
import {
  Workout,
  getPlan,
  savePlan,
  getSaved,
  saveSaved,
} from "@/library/fitlog";

export default function WorkoutDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const data = await getWorkoutById(id);

        const result = data.workout || data.data || data;

        setWorkout(result);

        setAdded(
          getPlan().some((item) => item.id === result.id)
        );

        setSaved(
          getSaved().some((item) => item.id === result.id)
        );
      } catch {
        toast.error("Failed to load workout");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [id]);

  const handleAddPlan = () => {
    if (!workout) return;

    const plan = getPlan();

    if (plan.some((item) => item.id === workout.id)) {
      toast.error("Already added to your plan");
      return;
    }

    if (plan.length >= 5) {
      toast.error("Maximum 5 workouts allowed");
      return;
    }

    savePlan([...plan, { ...workout, completed: false }]);

    setAdded(true);
    toast.success("Added to today's plan!");
  };

  const handleSave = () => {
    if (!workout) return;

    const savedWorkouts = getSaved();

    if (saved) {
      saveSaved(
        savedWorkouts.filter((item) => item.id !== workout.id)
      );

      setSaved(false);
      toast.success("Removed from saved workouts");
    } else {
      saveSaved([...savedWorkouts, workout]);

      setSaved(true);
      toast.success("Workout saved!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#101114] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-lime-400" />
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="min-h-screen bg-[#101114] text-white flex flex-col justify-center items-center gap-4">
        <h2 className="text-2xl font-bold">Workout Not Found</h2>
        <button onClick={() => router.push("/")} className="btn bg-lime-400 text-black">
          Back Home
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#101114] text-white px-5 md:px-10 py-10">

      <div className="max-w-6xl mx-auto">

        {/* Back Button */}

        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-lime-400 mb-8"
        >
          <ArrowLeft size={18} />
          Back to Workouts
        </button>

        {/* Main Details */}

        <div className="grid md:grid-cols-2 gap-10">

        {/* Workout Image */}
<div className="rounded-xl overflow-hidden bg-[#191c22] h-87.5 md:h-120 relative">
  <Image
    src={workout.image}
    alt={workout.name}
    fill
    sizes="(max-width: 768px) 100vw, 50vw"
    className="object-cover"
  />
</div>

          {/* Workout Information */}

          <div>

            <div className="flex gap-2 mb-5 flex-wrap">
              {workout.muscleGroups?.map((muscle) => (
                <span
                  key={muscle}
                  className="badge bg-[#252a30] text-lime-400 border-none"
                >
                  {muscle}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold uppercase mb-4">
              {workout.name}
            </h1>

            <p className="text-gray-400 leading-7 mb-7">
              {workout.description}
            </p>

            <div className="grid grid-cols-2 gap-4">

              <div className="bg-[#191c22] p-5 rounded-lg">
                <Clock className="text-lime-400 mb-3" />
                <p className="text-gray-400 text-sm">Duration</p>
                <h3 className="text-xl font-bold">{workout.duration} min</h3>
              </div>

              <div className="bg-[#191c22] p-5 rounded-lg">
                <Flame className="text-lime-400 mb-3" />
                <p className="text-gray-400 text-sm">Calories Burned</p>
                <h3 className="text-xl font-bold">{workout.caloriesBurned} kcal</h3>
              </div>

              <div className="bg-[#191c22] p-5 rounded-lg">
                <Star className="text-lime-400 mb-3" />
                <p className="text-gray-400 text-sm">Rating</p>
                <h3 className="text-xl font-bold">{workout.rating}/5</h3>
              </div>

              <div className="bg-[#191c22] p-5 rounded-lg">
                <Dumbbell className="text-lime-400 mb-3" />
                <p className="text-gray-400 text-sm">Equipment</p>
                <h3 className="text-lg font-bold">{workout.equipment}</h3>
              </div>

            </div>

            <div className="border-t border-gray-800 mt-7 pt-6 space-y-4">

              <div className="flex justify-between">
                <span className="text-gray-400">Difficulty</span>
                <span>{workout.difficulty}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Sets</span>
                <span>{workout.sets}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Reps</span>
                <span>{workout.reps}</span>
              </div>

            </div>

            {/* Action Buttons */}

            <div className="flex flex-col sm:flex-row gap-3 mt-8">

              <button
                onClick={handleAddPlan}
                disabled={added}
                className="btn flex-1 bg-lime-400 hover:bg-lime-300 text-black border-none"
              >
                {added ? <Check size={18} /> : <Plus size={18} />}
                {added ? "Added to Plan" : "Add to Today's Plan"}
              </button>

              <button
                onClick={handleSave}
                className="btn bg-[#252a30] text-white border-none"
              >
                <Bookmark size={18} />
                {saved ? "Saved" : "Save for Later"}
              </button>

            </div>

          </div>

        </div>

        {/* Instructions */}

        <section className="mt-16">

          <h2 className="text-2xl font-bold mb-7">
            WORKOUT INSTRUCTIONS
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            {workout.instructions?.map((step, index) => (
              <div
                key={index}
                className="bg-[#191c22] rounded-lg p-6 flex gap-5"
              >
                <span className="text-lime-400 font-bold text-xl">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="text-gray-300 leading-7">
                  {step}
                </p>
              </div>
            ))}

          </div>

        </section>

      </div>
    </main>
  );
}