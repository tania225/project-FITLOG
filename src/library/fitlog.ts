export interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

export interface PlanWorkout extends Workout {
  completed?: boolean;
}

// Today's Plan
export const getPlan = (): PlanWorkout[] => {
  if (typeof window === "undefined") return [];

  return JSON.parse(localStorage.getItem("fitlog-plan") || "[]");
};

export const savePlan = (plan: PlanWorkout[]) => {
  localStorage.setItem("fitlog-plan", JSON.stringify(plan));
};

// Saved Workouts
export const getSaved = (): Workout[] => {
  if (typeof window === "undefined") return [];

  return JSON.parse(localStorage.getItem("fitlog-saved") || "[]");
};

export const saveSaved = (workouts: Workout[]) => {
  localStorage.setItem("fitlog-saved", JSON.stringify(workouts));
};