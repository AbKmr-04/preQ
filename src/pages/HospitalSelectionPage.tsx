import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  createHospital, 
  joinHospital, 
  getHospital, 
  updateUserHospital 
} from '../services/database';

const HospitalSelectionPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<'join' | 'create' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Join hospital form
  const [hospitalId, setHospitalId] = useState('');

  // Create hospital form
  const [createForm, setCreateForm] = useState({
    name: '',
    address: ''
  });

  const handleJoinHospital = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !hospitalId.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      // Check if hospital exists
      const hospital = await getHospital(hospitalId.trim());
      if (!hospital) {
        setError('Hospital not found. Please check the Hospital ID.');
        return;
      }

      // Join the hospital
      await joinHospital(hospitalId.trim());
      await updateUserHospital(currentUser.id, hospitalId.trim());

      navigate('/dashboard/staff');
    } catch (err) {
      setError('Error joining hospital. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateHospital = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !createForm.name.trim() || !createForm.address.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const hospitalId = await createHospital({
        name: createForm.name.trim(),
        address: createForm.address.trim(),
        createdBy: currentUser.id
      });

      await updateUserHospital(currentUser.id, hospitalId);

      navigate('/dashboard/staff');
    } catch (err) {
      setError('Error creating hospital. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentUser || currentUser.role !== 'staff') {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Hospital Setup
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Join an existing hospital or create a new one
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {!selectedOption && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Choose an option:</h3>
              
              <button
                onClick={() => setSelectedOption('join')}
                className="w-full flex flex-col items-center p-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors"
              >
                <div className="text-blue-600 mb-2">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="text-lg font-medium text-gray-900">Join Existing Hospital</span>
                <span className="text-sm text-gray-500">Enter a Hospital ID to join</span>
              </button>

              <button
                onClick={() => setSelectedOption('create')}
                className="w-full flex flex-col items-center p-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors"
              >
                <div className="text-green-600 mb-2">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <span className="text-lg font-medium text-gray-900">Create New Hospital</span>
                <span className="text-sm text-gray-500">Set up a new hospital</span>
              </button>
            </div>
          )}

          {selectedOption === 'join' && (
            <div>
              <button
                onClick={() => setSelectedOption(null)}
                className="mb-4 text-blue-600 hover:text-blue-800 text-sm"
              >
                ← Back to options
              </button>
              
              <form onSubmit={handleJoinHospital} className="space-y-6">
                <div>
                  <label htmlFor="hospitalId" className="block text-sm font-medium text-gray-700">
                    Hospital ID
                  </label>
                  <input
                    type="text"
                    id="hospitalId"
                    required
                    value={hospitalId}
                    onChange={(e) => setHospitalId(e.target.value)}
                    placeholder="Enter Hospital ID"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Ask your hospital administrator for the Hospital ID
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !hospitalId.trim()}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isLoading ? 'Joining...' : 'Join Hospital'}
                </button>
              </form>
            </div>
          )}

          {selectedOption === 'create' && (
            <div>
              <button
                onClick={() => setSelectedOption(null)}
                className="mb-4 text-blue-600 hover:text-blue-800 text-sm"
              >
                ← Back to options
              </button>
              
              <form onSubmit={handleCreateHospital} className="space-y-6">
                <div>
                  <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700">
                    Hospital Name
                  </label>
                  <input
                    type="text"
                    id="hospitalName"
                    required
                    value={createForm.name}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter hospital name"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="hospitalAddress" className="block text-sm font-medium text-gray-700">
                    Hospital Address
                  </label>
                  <input
                    type="text"
                    id="hospitalAddress"
                    required
                    value={createForm.address}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter hospital address"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !createForm.name.trim() || !createForm.address.trim()}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                >
                  {isLoading ? 'Creating...' : 'Create Hospital'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalSelectionPage; 