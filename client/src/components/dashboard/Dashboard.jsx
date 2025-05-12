import React, { useState, useEffect } from 'react';
import {MockDataService} from './MockDataService.jsx';
import {StatCard} from './StatCard.jsx'
import {WeeklyProgress} from './WeeklyProgress.jsx'
import {RecentWorkouts} from './RecentWorkouts.jsx'
import {GoalProgress} from './GoalProgress.jsx';
import {MotivationalQuote} from './MotivationalQuote.jsx';


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