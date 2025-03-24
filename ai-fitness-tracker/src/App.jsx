import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './index.css';
import { User, Lock } from 'lucide-react';
import React from 'react';

const MainMenu = () => {
  return (
    <div className="min-h-screen bg-cyan-300 flex items-start justify-center pt-[25vh]">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg space-y-6">
        
        {/* Login Heading */}
        <h1 className="text-3xl font-bold text-center">Login</h1>

        {/* Username Field */}
        <div className="relative">
          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Username"
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />
        </div>

        {/* Password Field */}
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            className="w-full pl-12 pr-20 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />
        </div>

        {/* Button Group */}
        <div className="flex space-x-40"> {/*This should space buttons correctly */}
          <button className="bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700">
            Login
          </button>
          <button className="bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700">
            Create Account
          </button>
        </div>  
        </div>
      </div>
  );
};

const App = () => {
  return (
    <div className="app-container">
      <MainMenu />
    </div>
  );
};

export default App;
