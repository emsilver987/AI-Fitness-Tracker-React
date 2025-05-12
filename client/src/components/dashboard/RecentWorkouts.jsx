
import {TrendingUp, Dumbbell, Activity, Flame} from 'lucide-react';

export const RecentWorkouts = ({ workouts }) => {
    const getWorkoutIcon = (type) => {
      switch(type) {
        case 'strength': return <Dumbbell className="text-purple-500 w-5 h-5" />;
        case 'cardio': return <Activity className="text-green-500 w-5 h-5" />;
        case 'hiit': return <Flame className="text-orange-500 w-5 h-5" />;
        default: return <Activity className="text-blue-500 w-5 h-5" />;
      }
    };
    
    const formatDate = (date) => {
      return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
    };
    
    return (
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Recent Workouts</h2>
          <TrendingUp className="text-blue-500 w-5 h-5" />
        </div>
        
        <div className="space-y-4">
          {workouts.map(workout => (
            <div key={workout.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-white shadow-sm mr-3">
                    {getWorkoutIcon(workout.type)}
                  </div>
                  <div>
                    <h3 className="font-medium">{workout.name}</h3>
                    <div className="text-sm text-gray-500 mt-1">
                      {formatDate(workout.date)} · {workout.duration} min · {workout.caloriesBurned} kcal
                    </div>
                  </div>
                </div>
                <button className="text-blue-500 text-sm hover:underline">
                  Details
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {workout.exercises.map((exercise, i) => (
                  <span key={i} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    {exercise}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-4 py-2 text-center text-blue-500 font-medium hover:bg-blue-50 rounded-lg transition-colors">
          View All Workouts
        </button>
      </div>
    );
  };