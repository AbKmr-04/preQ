import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';

type UserRole = 'hospital' | 'patient' | null;

const SignUpPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>(null);
  const [error, setError] = useState('');
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!role) {
      setError('Please select a role');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      await signup(name, email, password, role);
      
      // Redirect based on role
      if (role === 'hospital') {
        navigate('/hospital-dashboard');
      } else {
        navigate('/patient-dashboard');
      }
    } catch (err) {
      setError('Failed to create an account');
    }
  };

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-neutral-50 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 sm:p-8">
              <h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>
              
              {error && (
                <div className="bg-error-400/10 text-error-500 p-3 rounded mb-4">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                {/* Role Selection */}
                <div className="mb-6">
                  <label className="block text-neutral-700 font-medium mb-3">
                    I am a:
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      className={`flex flex-col items-center justify-center p-4 border rounded-lg transition-all ${
                        role === 'hospital'
                          ? 'border-primary-400 bg-primary-50 text-primary-700'
                          : 'border-neutral-200 hover:border-primary-200 hover:bg-primary-50/50'
                      }`}
                      onClick={() => setRole('hospital')}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-8 w-8 mb-2 ${
                          role === 'hospital' ? 'text-primary-500' : 'text-neutral-400'
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      Hospital Staff
                    </button>
                    
                    <button
                      type="button"
                      className={`flex flex-col items-center justify-center p-4 border rounded-lg transition-all ${
                        role === 'patient'
                          ? 'border-primary-400 bg-primary-50 text-primary-700'
                          : 'border-neutral-200 hover:border-primary-200 hover:bg-primary-50/50'
                      }`}
                      onClick={() => setRole('patient')}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-8 w-8 mb-2 ${
                          role === 'patient' ? 'text-primary-500' : 'text-neutral-400'
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Patient
                    </button>
                  </div>
                </div>
                
                {/* Name Input */}
                <div className="mb-4">
                  <label htmlFor="name" className="block text-neutral-700 font-medium mb-2">
                    {role === 'hospital' ? 'Hospital Name' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="input-field"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              
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
                  />
                </div>
                
                {/* Password Input */}
                <div className="mb-4">
                  <label htmlFor="password" className="block text-neutral-700 font-medium mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                
                {/* Confirm Password Input */}
                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-neutral-700 font-medium mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="input-field"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                
                {/* Terms Checkbox */}
                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary-500 focus:ring-primary-400 border-neutral-300 rounded"
                      required
                    />
                    <span className="ml-2 text-sm text-neutral-600">
                      I agree to the{' '}
                      <a href="#" className="text-primary-500 hover:text-primary-600">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-primary-500 hover:text-primary-600">
                        Privacy Policy
                      </a>
                    </span>
                  </label>
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
                      Creating account...
                    </span>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-neutral-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary-500 hover:text-primary-600">
                    Login
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

export default SignUpPage;