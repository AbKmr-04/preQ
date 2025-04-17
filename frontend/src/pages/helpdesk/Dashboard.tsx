import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

interface Doctor {
  _id: string;
  firstName: string;
  lastName: string;
  roomNumber: string;
  specialization: string;
}

interface QueueRequest {
  _id: string;
  patient: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
  };
  status: string;
  requestTime: string;
}

const HelpDeskDashboard: React.FC = () => {
  const [pendingRequests, setPendingRequests] = useState<QueueRequest[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [requestsResponse, doctorsResponse] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_URL}/api/queue/pending`),
        axios.get(`${process.env.REACT_APP_API_URL}/api/doctors`)
      ]);
      setPendingRequests(requestsResponse.data);
      setDoctors(doctorsResponse.data);
    } catch (error) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = async (queueId: string, status: 'approved' | 'rejected', doctorId?: string, roomNumber?: string) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/queue/${queueId}/process`, {
        status,
        doctorId,
        roomNumber
      });
      fetchData(); // Refresh the list
    } catch (error) {
      setError('Failed to process request');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Queue Management
        </h1>
        
        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-6">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {pendingRequests.map((request) => (
              <li key={request._id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="sm:flex sm:items-center sm:justify-between w-full">
                      <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          {request.patient.firstName} {request.patient.lastName}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Requested at: {new Date(request.requestTime).toLocaleString()}
                        </p>
                      </div>
                      <div className="mt-4 sm:mt-0 sm:flex sm:space-x-4">
                        <div className="relative">
                          <select
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                            onChange={(e) => {
                              const [doctorId, roomNumber] = e.target.value.split('|');
                              handleRequest(request._id, 'approved', doctorId, roomNumber);
                            }}
                            defaultValue=""
                          >
                            <option value="" disabled>Select Doctor</option>
                            {doctors.map((doctor) => (
                              <option key={doctor._id} value={`${doctor._id}|${doctor.roomNumber}`}>
                                Dr. {doctor.firstName} {doctor.lastName} - Room {doctor.roomNumber}
                              </option>
                            ))}
                          </select>
                        </div>
                        <button
                          onClick={() => handleRequest(request._id, 'rejected')}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
            {pendingRequests.length === 0 && (
              <li>
                <div className="px-4 py-4 sm:px-6 text-center text-gray-500">
                  No pending requests
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HelpDeskDashboard; 