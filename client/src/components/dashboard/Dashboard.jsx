import React, { useState, useEffect } from 'react';
import { Activity, Award, Calendar, Clock, Flame, Target, Dumbbell, TrendingUp } from 'lucide-react';
import {
  MockDataService
} from './MockDataService.jsx';



// Enhanced StatCard component
const StatCard = ({ title, value, unit, icon, color, bgColor }) => {
  const renderIcon = () => {
    switch (icon) {
      case 'flame': return <Flame className={`${color} w-6 h-6`} />;
      case 'trophy': return <Award className={`${color} w-6 h-6`} />;
      case 'fire': return <Activity className={`${color} w-6 h-6`} />;
      case 'clock': return <Clock className={`${color} w-6 h-6`} />;
      default: return <Activity className={`${color} w-6 h-6`} />;
    }
  };

  return (
    <div className={`${bgColor} rounded-xl p-4 shadow-md transition-all duration-300 hover:shadow-lg border border-gray-100`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-gray-600 font-medium">{title}</h3>
        {renderIcon()}
      </div>
      <div className="flex items-baseline">
        <span className="text-2xl font-bold">{value}</span>
        <span className="ml-1 text-sm text-gray-500">{unit}</span>
      </div>
    </div>
  );
};

// Enhanced Weekly Progress Component
const WeeklyProgress = ({ data }) => {
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

// Enhanced Recent Workouts Component
const RecentWorkouts = ({ workouts }) => {
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

// Enhanced Goal Progress Component
const GoalProgress = ({ goals }) => {
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

// Enhanced Motivational Quote Component
const MotivationalQuote = ({ quote }) => {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-md p-6">
      <div className="mb-4">
        <svg className="w-8 h-8 text-blue-200 opacity-70" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
      <p className="text-lg font-medium mb-4">{quote.quote}</p>
      <p className="text-blue-200 text-right">— {quote.author}</p>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('Fitness Enthusiast');
  const [stats, setStats] = useState({
    streak: 0,
    totalWorkouts: 0,
    caloriesBurned: 0,
    minutesExercised: 0
  });
  const [recentWorkouts, setRecentWorkouts] = useState([]);
  const [weeklyActivity, setWeeklyActivity] = useState([]);
  const [goals, setGoals] = useState([]);
  const [quote, setQuote] = useState({ quote: '', author: '' });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        // Simulate user data
        setUsername('Alex Johnson');
        
        // Fetch all data in parallel
        const [stats, workouts, activity, goals, quote] = await Promise.all([
          MockDataService.getUserStats(),
          MockDataService.getRecentWorkouts(),
          MockDataService.getWeeklyActivity(),
          MockDataService.getGoals(),
          MockDataService.getMotivationalQuote(),
        ]);
        
        setStats(stats);
        setRecentWorkouts(workouts);
        setWeeklyActivity(activity);
        setGoals(goals);
        setQuote(quote);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500 mb-4"></div>
          <p className="text-gray-500">Loading your fitness data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header with user welcome */}
      <header className="bg-white shadow-sm mb-6">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Welcome back, {username}!</h1>
              <p className="text-gray-500">Here's your fitness journey at a glance</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm transition-colors">
                New Workout
              </button>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="font-bold text-blue-600">{username.charAt(0)}</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4">
        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard 
            title="Current Streak" 
            value={stats.streak} 
            unit="days"
            icon="fire" 
            color="text-orange-500"
            bgColor="bg-white" 
          />
          <StatCard 
            title="Total Workouts" 
            value={stats.totalWorkouts} 
            unit="workouts"
            icon="trophy" 
            color="text-purple-500"
            bgColor="bg-white" 
          />
          <StatCard 
            title="Calories Burned" 
            value={stats.caloriesBurned.toLocaleString()} 
            unit="kcal"
            icon="flame" 
            color="text-red-500"
            bgColor="bg-white" 
          />
          <StatCard 
            title="Time Exercised" 
            value={Math.floor(stats.minutesExercised / 60)} 
            unit="hours"
            icon="clock" 
            color="text-blue-500"
            bgColor="bg-white" 
          />
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <WeeklyProgress data={weeklyActivity} />
            <RecentWorkouts workouts={recentWorkouts} />
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <GoalProgress goals={goals} />
            <MotivationalQuote quote={quote} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;