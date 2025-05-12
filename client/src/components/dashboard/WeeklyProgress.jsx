
import {Calendar} from "lucide-react";

export const WeeklyProgress = ({ data }) => {
    const maxMinutes = Math.max(...data.map(day => day.minutes));
    
    return (
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Weekly Activity</h2>
          <Calendar className="text-blue-500 w-5 h-5" />
        </div>
        
        <div className="flex items-end justify-between h-44 mb-2">
          {data.map((day, index) => (
            <div key={index} className="flex flex-col items-center w-1/7">
              <div className="relative w-full flex justify-center">
                <div 
                  className={`w-6 rounded-t-md ${day.minutes > 0 ? 'bg-blue-500' : 'bg-gray-200'}`} 
                  style={{ 
                    height: day.minutes > 0 ? `${(day.minutes / maxMinutes) * 100}%` : '10%',
                    minHeight: '4px'
                  }}
                />
              </div>
              <div className="text-xs font-medium mt-2 text-gray-600">{day.day}</div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
          <div>
            <p className="text-sm text-gray-500">Total Time</p>
            <p className="text-xl font-bold">
              {data.reduce((sum, day) => sum + day.minutes, 0)} min
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Calories</p>
            <p className="text-xl font-bold">
              {data.reduce((sum, day) => sum + day.calories, 0)} kcal
            </p>
          </div>
        </div>
      </div>
    );
  };
  