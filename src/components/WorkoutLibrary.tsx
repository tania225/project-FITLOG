"use client";

import { useEffect, useState } from "react";
import { getWorkouts } from "@/library/api";
import Link from "next/link";

const WorkoutLibrary = () => {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const data = await getWorkouts();

        const workoutList = Array.isArray(data)
          ? data
          : data.workouts || data.data || [];

        setWorkouts(workoutList);
      } catch (error) {
        console.error("Failed to load workouts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-white py-20">
        Loading workouts...
      </p>
    );
  }

  return (
    <section id="library" className="bg-[#101114] text-white px-5 md:px-12 py-16">

      <div className="max-w-7xl mx-auto">

        {/* Section Heading */}
        <div className="mb-10">
          <p className="text-lime-400 text-sm tracking-widest mb-3">
            FIND YOUR NEXT CHALLENGE
          </p>

          <h2 className="text-3xl md:text-4xl font-bold">
            Workout Library
          </h2>

          <p className="text-gray-400 mt-3">
            Explore workouts and build your training routine.
          </p>
        </div>

        {/* Workout Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {workouts.map((workout) => (

            <Link
              href={`/workouts/${workout.id}`}
              key={workout.id}
              className="bg-[#191c22] border border-gray-800 rounded-xl overflow-hidden hover:border-lime-400 transition duration-300"
            >

              {/* Image */}
              <div className="h-52 overflow-hidden">
                <img
                  src={workout.image}
                  alt={workout.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card Content */}
              <div className="p-5">

                {/* Muscle Groups */}
                <div className="flex gap-2 flex-wrap mb-4">
                  {workout.muscleGroups?.map((muscle: string) => (
                    <span
                      key={muscle}
                      className="bg-lime-400 text-black text-xs font-semibold px-3 py-1 rounded-full"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold mb-3">
                  {workout.name}
                </h3>

                {/* Equipment */}
                <p className="text-gray-400 text-sm mb-4">
                  Equipment: {Array.isArray(workout.equipment)
                    ? workout.equipment.join(", ")
                    : workout.equipment}
                </p>

                {/* Workout Information */}
                <div className="flex justify-between text-sm text-gray-300 border-t border-gray-700 pt-4">

                  <span>{workout.duration} min</span>

                  <span>{workout.caloriesBurned} kcal</span>

                  <span>★ {workout.rating}</span>

                </div>

                {/* Difficulty */}
                <p className="text-lime-400 text-sm mt-4">
                  {workout.difficulty}
                </p>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </section>
  );
};

export default WorkoutLibrary;