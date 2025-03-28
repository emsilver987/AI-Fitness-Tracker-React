import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './index.css';
import { User, Lock } from 'lucide-react';
import React from 'react';

function Card({ children }) {
  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl">
      {children}
    </div>
  );
}

const App = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100"> 
        <Card> 
            <h2>Nothing for now</h2>
        </Card>
      </div>
  );
};

export default App;
