import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const { login } = useAppContext();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      // For simplicity, we'll use a fixed user object.
      // In a real app, you'd have user registration/authentication.
      login({
        id: `user-${Date.now()}`,
        name: username,
        avatarUrl: '/avatar-placeholder.png' // A generic avatar
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-900 text-white">
      <div className="w-full max-w-md p-8 space-y-8 bg-slate-800 rounded-lg shadow-lg">
        <div>
          <h2 className="text-3xl font-bold text-center text-lime-400">Welcome to Limecord</h2>
          <p className="mt-2 text-center text-slate-400">
            Your zesty chat space
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-slate-700 bg-slate-900 placeholder-slate-500 text-white focus:outline-none focus:ring-lime-500 focus:border-lime-500 focus:z-10 sm:text-sm"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-lime-600 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 focus:ring-offset-slate-800"
            >
              Join Chat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;