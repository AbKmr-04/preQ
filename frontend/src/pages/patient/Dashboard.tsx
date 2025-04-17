import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

interface QueueEntry {
  _id: string;
  status: string;
  position: number;
  assignedDoctor?: {
    firstName: string;
    lastName: string;
    roomNumber: string;
  };
}

const PatientDashboard: React.FC = () => {
  const [queueEntry, setQueueEntry] = useState<QueueEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchQueueStatus();
  }, []);

  const fetchQueueStatus = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/queue/status`);
      setQueueEntry(response.data.queueEntry);
    } catch (error) {
      setError('Failed to fetch queue status');
    } finally {
      setLoading(false);
    }
  };

  const requestAppointment = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/queue/request`);
      setQueueEntry(response.data);
    } catch (error) {
      setError('Failed to request appointment');
    } finally {
      setLoading(false);
    }
  };

  const startTriage = () => {
    if (queueEntry) {
      navigate(`/patient/triage/${queueEntry._id}`);
    }
  };

  const renderQueueStatus = () => {
    if (!queueEntry) {
      return (
        <div className="text-center">
          <p className="text-gray-600 mb-4">You are not currently in the queue</p>
          <button
            onClick={requestAppointment}
            disabled={loading}
            className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Request Appointment
          </button>
        </div>
      );
    }

    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Queue Status</h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {queueEntry.status.charAt(0).toUpperCase() + queueEntry.status.slice(1).replace('_', ' ')}
              </dd>
            </div>
            {queueEntry.position && (
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Position in Queue</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {queueEntry.position}
                </dd>
              </div>
            )}
            {queueEntry.assignedDoctor && (
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Assigned Doctor</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  Dr. {queueEntry.assignedDoctor.firstName} {queueEntry.assignedDoctor.lastName}
                  <br />
                  Room {queueEntry.assignedDoctor.roomNumber}
                </dd>
              </div>
            )}
          </dl>
        </div>
        {queueEntry.status === 'approved' && (
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              onClick={startTriage}
              className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Start Triage
            </button>
          </div>
        )}
      </div>
    );
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
          Welcome, {user?.firstName}
        </h1>
        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-6">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}
        {renderQueueStatus()}
      </div>
    </div>
  );
};

export default PatientDashboard; 