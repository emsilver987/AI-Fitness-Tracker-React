import {Target} from 'lucide-react';

export const GoalProgress = ({ goals }) => {
  const calculateDaysLeft = (deadline) => {
    const today = new Date();
    const diff = deadline - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };
  
  const calculateProgress = (current, target) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Goals</h2>
        <Target className="text-blue-500 w-5 h-5" />
      </div>
      
      <div className="space-y-4">
        {goals.map(goal => {
          const progress = calculateProgress(goal.currentValue, goal.targetValue);
          const daysLeft = calculateDaysLeft(goal.deadline);
          const isReversed = goal.currentValue > goal.targetValue;
          const adjustedProgress = isReversed ? 
            calculateProgress(goal.targetValue, goal.currentValue) : 
            progress;
          
          return (
            <div key={goal.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <h3 className="font-medium">{goal.name}</h3>
                <span className="text-sm text-gray-500">{daysLeft} days left</span>
              </div>
              
              <div className="flex items-end space-x-2 mb-2">
                <span className="text-2xl font-bold">{goal.currentValue}</span>
                <div className="flex items-center">
                  <span className="text-gray-400 mx-1">/</span>
                  <span className="text-gray-600">{goal.targetValue} {goal.unit}</span>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                <div 
                  className={`h-2.5 rounded-full ${isReversed ? 'bg-green-500' : 'bg-blue-500'}`}
                  style={{ width: `${isReversed ? 100 - adjustedProgress : progress}%` }}
                ></div>
              </div>
              
              <div className="text-right text-sm text-gray-500">
                {isReversed ? 'Lower is better' : `${progress}% complete`}
              </div>
            </div>
          );
        })}
      </div>
      
      <button className="w-full mt-4 py-2 text-center text-blue-500 font-medium hover:bg-blue-50 rounded-lg transition-colors">
        Add New Goal
      </button>
    </div>
  );
};