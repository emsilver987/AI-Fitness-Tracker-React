
const workoutStore = {};
const STORAGE_KEY = "workoutData";

const loadFromStorage = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    const parsed = JSON.parse(saved);
    Object.assign(workoutStore, parsed);
  }
};

const saveToStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(workoutStore));
};

export const initializeWorkoutStore = () => {
  loadFromStorage();
};

export const saveWorkout = (date, workoutObj) => {
  const key = date.toDateString();
  if (!workoutStore[key]) {
    workoutStore[key] = [];
  }
  workoutStore[key].push(workoutObj);
  saveToStorage();
};

export const getWorkouts = (date) => {
  return workoutStore[date.toDateString()] || [];
};
