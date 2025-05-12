
export const MockDataService = {
    getUserStats: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            streak: 5,
            totalWorkouts: 23,
            caloriesBurned: 15460,
            minutesExercised: 1240
          });
        }, 500);
      });
    },
    
    getRecentWorkouts: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: '1',
              name: 'Upper Body Strength',
              type: 'strength',
              date: new Date(2025, 4, 10),
              duration: 45,
              caloriesBurned: 320,
              exercises: ['Bench Press', 'Shoulder Press', 'Pull-ups']
            },
            {
              id: '2',
              name: '5K Run',
              type: 'cardio',
              date: new Date(2025, 4, 8),
              duration: 28,
              caloriesBurned: 280,
              exercises: ['Running']
            },
            {
              id: '3',
              name: 'Full Body HIIT',
              type: 'hiit',
              date: new Date(2025, 4, 6),
              duration: 30,
              caloriesBurned: 350,
              exercises: ['Burpees', 'Mountain Climbers', 'Jumping Jacks']
            }
          ]);
        }, 600);
      });
    },
    
    getWeeklyActivity: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { day: 'Mon', minutes: 45, calories: 320 },
            { day: 'Tue', minutes: 30, calories: 240 },
            { day: 'Wed', minutes: 0, calories: 0 },
            { day: 'Thu', minutes: 60, calories: 480 },
            { day: 'Fri', minutes: 25, calories: 200 },
            { day: 'Sat', minutes: 90, calories: 720 },
            { day: 'Sun', minutes: 0, calories: 0 }
          ]);
        }, 700);
      });
    },
    getGoals: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: '1',
              name: 'Bench Press',
              currentValue: 185,
              targetValue: 225,
              unit: 'lbs',
              deadline: new Date(2025, 7, 15)
            },
            {
              id: '2',
              name: 'Run 5K in',
              currentValue: 28.5,
              targetValue: 25,
              unit: 'min',
              deadline: new Date(2025, 5, 30)
            }
          ]);
        }, 800);
      });
    },
    
    getMotivationalQuote: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const quotes = [
            { quote: "The difference between the impossible and the possible lies in a person's determination.", author: "Tommy Lasorda" },
            { quote: "The only bad workout is the one that didn't happen.", author: "Unknown" },
            { quote: "It's not about being the best. It's about being better than you were yesterday.", author: "Unknown" },
            { quote: "Strength does not come from the physical capacity. It comes from an indomitable will.", author: "Mahatma Gandhi" }
          ];
          resolve(quotes[Math.floor(Math.random() * quotes.length)]);
        }, 300);
      });
    }
  };
