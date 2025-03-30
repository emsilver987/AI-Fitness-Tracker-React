import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/';
    } else {
      setAuthenticated(true);
    }
  }, []);

const handleLogout = () => {
  localStorage.removeItem('token');
  window.location.href = '/';
};

return authenticated ? (
  <div>
    <h1>Welcome to Your Dashboard!</h1>
    <button onClick={handleLogout}>Logout</button>
  </div>
) : null;
};

export default Dashboard;
