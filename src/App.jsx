import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './index.css';
import React from 'react';
import { Dumbbell } from 'lucide-react';

const WorkoutIcon = () => <Dumbbell size={24} />;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Example />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

function Card({ children }) {
  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl">
      {children}
    </div>
  );
}

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!email || !password) {
    alert('Please fill in both fields');
    return;
  }
  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    localStorage.setItem('token', data.token);
    alert('Login successful!');
    // Redirect to dashboard or homepage
    window.location.href = '/dashboard';
  } catch (error) {
    alert(error.message);
  }
};


const Example = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please fill in both fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Store the token and redirect to dashboard
      localStorage.setItem('token', data.token);
      alert('Login successful!');
      window.location.href = '/dashboard';
    } catch (error) {
      alert(error.message);
    }
  };

  return (
        <>
          {}
          <div className="content-center flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="content-center sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex justify-center">
                <WorkoutIcon />
            </div>
              <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  </div>
                </div>
    
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                      Password
                    </label>
                    <div className="text-sm">
                      <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  </div>
                </div>
    
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              </form>
    
              <p className="mt-10 text-center text-sm/6 text-gray-500">
                Don't have an account?{' '}
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Create an account
                </a>
              </p>
            </div>
          </div>
        </>
      )
    }    


    const Dashboard = () => {
      const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
      };
    
      return (
        <div>
          <h1>Welcome to your Dashboard!</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      );
    };
    

export default App;