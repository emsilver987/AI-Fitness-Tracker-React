const workoutStore = {};

export const addWorkout = (date, workout) => {
  const key = date.toDateString();
  if (!workoutStore[key]) {
    workoutStore[key] = [];
  }
  workoutStore[key].push(workout);
};

export const getWorkoutsByDate = (date) => {
  return workoutStore[date.toDateString()] || [];
};