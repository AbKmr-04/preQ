import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setError('');
      const result = await login(email, password);
      
      // Navigation is now handled immediately after login success
      // No need to wait for useEffect
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Invalid email or password');
    }
  };

  // Handle navigation based on user role after login
  React.useEffect(() => {
    if (currentUser && !isLoading) {
      console.log('Login successful, user role:', currentUser.role);
      
      // Redirect based on role
      if (currentUser.role === 'staff' || currentUser.role === 'hospital') {
        console.log('Redirecting to staff dashboard');
        window.location.href = '/dashboard/staff';
      } else if (currentUser.role === 'patient') {
        console.log('Redirecting to patient dashboard');
        window.location.href = '/dashboard/patient';
      } else {
        console.log('Unknown role, redirecting to home');
        window.location.href = '/';
      }
    }
  }, [currentUser, isLoading]);

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-neutral-50 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 sm:p-8">
              <h1 className="text-2xl font-bold text-center mb-6">Login to PreQ</h1>
              
              {error && (
                <div className="bg-error-400/10 text-error-500 p-3 rounded mb-4">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                {/* Email Input */}
                <div className="mb-4">
                  <label htmlFor="email" className="block text-neutral-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="input-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                
                {/* Password Input */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="password" className="block text-neutral-700 font-medium">
                      Password
                    </label>
                    <a href="#" className="text-sm text-primary-500 hover:text-primary-600">
                      Forgot password?
                    </a>
                  </div>
                  <input
                    type="password"
                    id="password"
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                
                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <span className="animate-spin h-5 w-5 mr-2 border-b-2 border-white rounded-full"></span>
                      Logging in...
                    </span>
                  ) : (
                    'Login'
                  )}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-neutral-600">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-primary-500 hover:text-primary-600">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default LoginPage;