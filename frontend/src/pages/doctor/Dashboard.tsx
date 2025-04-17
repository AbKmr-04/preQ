import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

interface Patient {
  _id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

interface QueueEntry {
  _id: string;
  patient: Patient;
  status: string;
  requestTime: string;
  triageSummary?: Map<string, string>;
  symptoms: Array<{
    question: string;
    answer: string;
    timestamp: string;
  }>;
}

const DoctorDashboard: React.FC = () => {
  const [queue, setQueue] = useState<QueueEntry[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<QueueEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchQueue();
    const interval = setInterval(fetchQueue, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchQueue = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/queue/doctor-queue`);
      setQueue(response.data);
    } catch (error) {
      setError('Failed to fetch queue');
    } finally {
      setLoading(false);
    }
  };

  const updatePatientStatus = async (queueId: string, status: string) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/queue/${queueId}/status`, { status });
      fetchQueue();
    } catch (error) {
      setError('Failed to update patient status');
    }
  };

  const viewTriageSummary = async (queueId: string) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/triage/summary/${queueId}`);
      const patient = queue.find(p => p._id === queueId);
      if (patient) {
        setSelectedPatient({
          ...patient,
          triageSummary: response.data.summary,
          symptoms: response.data.symptoms
        });
      }
    } catch (error) {
      setError('Failed to fetch triage summary');
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            My Patients
          </h1>
          <div className="text-sm text-gray-500">
            Room {user?.roomNumber}
          </div>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-6">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        <div className="flex space-x-6">
          {/* Queue List */}
          <div className="flex-1">
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {queue.map((entry) => (
                  <li key={entry._id}>
                    <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900">
                            {entry.patient.firstName} {entry.patient.lastName}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Waiting since: {new Date(entry.requestTime).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => viewTriageSummary(entry._id)}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                          >
                            View Summary
                          </button>
                          {entry.status === 'waiting' && (
                            <button
                              onClick={() => updatePatientStatus(entry._id, 'with_doctor')}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                              Start Consultation
                            </button>
                          )}
                          {entry.status === 'with_doctor' && (
                            <button
                              onClick={() => updatePatientStatus(entry._id, 'completed')}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              Complete
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
                {queue.length === 0 && (
                  <li>
                    <div className="px-4 py-4 sm:px-6 text-center text-gray-500">
                      No patients in queue
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Patient Summary */}
          {selectedPatient && (
            <div className="w-1/2">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Patient Summary
                  </h3>
                  <div className="border-t border-gray-200 pt-4">
                    <dl className="divide-y divide-gray-200">
                      {selectedPatient.triageSummary && 
                        Array.from(selectedPatient.triageSummary.entries()).map(([key, value]) => (
                          <div key={key} className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500">
                              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                              {value}
                            </dd>
                          </div>
                        ))
                      }
                    </dl>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-md font-medium text-gray-900 mb-2">
                      Symptom History
                    </h4>
                    <div className="space-y-2">
                      {selectedPatient.symptoms.map((symptom, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-md">
                          <p className="text-sm font-medium text-gray-900">{symptom.question}</p>
                          <p className="text-sm text-gray-500 mt-1">{symptom.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard; 