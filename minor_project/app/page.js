'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '@/lib/features/authSlice';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      dispatch(loginStart());

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      
      if (res.ok) {
        dispatch(loginSuccess(data));
        
        // Redirect based on role
        if (data.userData.role === "student") {
          localStorage.setItem('studentemail', email);
          localStorage.setItem('role', "student");
          router.push('/student');
        } else {
          router.push('/tutor');
          localStorage.setItem('role', "tutor");
        }
      } else {
        dispatch(loginFailure(data.error || 'An error occurred. Please try again.'));
      }
    } catch (error) {
      dispatch(loginFailure('Network error. Please try again.'));
    }
  };

  return (
    <div className="flex w-full gap-6 h-screen items-center justify-center bg-gray-100">
      {/* College Title */}
      <div className="flex gap-2 items-center justify-center">
        <h1 className="text-3xl font-semibold text-gray-800">
          College of Engineering Trivandrum
        </h1>
      </div>

      {/* Login Container */}
      <div className="bg-gray-900 text-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl text-center mb-6">Login to Your Account</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-500 bg-opacity-10 border border-red-500 text-red-500 rounded text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            disabled={loading}
            className="mb-4 p-3 bg-gray-100 text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            disabled={loading}
            className="mb-6 p-3 bg-gray-100 text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p>
            Don't have an account?{' '}
            <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors duration-200">
              Sign up
            </a>
          </p>
          <a href="#" className="block text-sm text-blue-500 hover:text-blue-400 transition-colors duration-200">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
}