import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  getHospital, 
  getHospitalDoctors, 
  getTodaysQueue,
  getQueueEntries,
  updateQueueEntryStatus,
  updateDoctorAvailability,
  addDoctor,
  Hospital,
  Doctor,
  Queue,
  QueueEntry
} from '../../services/database';
import AddDoctorForm from '../../components/staff/AddDoctorForm';

const StaffDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [currentQueue, setCurrentQueue] = useState<Queue | null>(null);
  const [queueEntries, setQueueEntries] = useState<QueueEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddDoctorForm, setShowAddDoctorForm] = useState(false);

  // Check if user has hospital assigned
  useEffect(() => {
    if (currentUser && currentUser.role === 'staff' && !currentUser.hospitalId) {
      navigate('/hospital-selection');
      return;
    }
  }, [currentUser, navigate]);

  // Fetch hospital data
  useEffect(() => {
    const fetchHospitalData = async () => {
      if (!currentUser?.hospitalId) return;
      
      try {
        const hospitalData = await getHospital(currentUser.hospitalId);
        if (!hospitalData) {
          setError('Hospital not found');
          return;
        }

        setHospital(hospitalData);

        // Fetch doctors
        const doctorsData = await getHospitalDoctors(hospitalData.id);
        setDoctors(doctorsData);
      } catch (err) {
        setError('Error fetching hospital data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHospitalData();
  }, [currentUser]);

  // Fetch queue when doctor is selected
  useEffect(() => {
    const fetchQueue = async () => {
      if (!selectedDoctor || !hospital) return;

      try {
        const queue = await getTodaysQueue(hospital.id, selectedDoctor.id);
        setCurrentQueue(queue);

        if (queue) {
          const entries = await getQueueEntries(hospital.id, selectedDoctor.id, queue.id);
          setQueueEntries(entries.sort((a, b) => a.number - b.number));
        } else {
          setQueueEntries([]);
        }
      } catch (err) {
        console.error('Error fetching queue:', err);
      }
    };

    fetchQueue();
  }, [selectedDoctor, hospital]);

  // Handle doctor availability toggle
  const handleDoctorAvailability = async (doctorId: string, isAvailable: boolean) => {
    if (!hospital) return;

    try {
      await updateDoctorAvailability(hospital.id, doctorId, isAvailable);
      setDoctors(doctors.map(doc => 
        doc.id === doctorId ? { ...doc, isAvailable } : doc
      ));
    } catch (err) {
      setError('Error updating doctor availability');
      console.error(err);
    }
  };

  // Handle queue entry status update
  const handleQueueStatusUpdate = async (entryId: string, status: QueueEntry['status']) => {
    if (!hospital || !selectedDoctor || !currentQueue) return;

    try {
      await updateQueueEntryStatus(hospital.id, selectedDoctor.id, currentQueue.id, entryId, status);
      setQueueEntries(entries => 
        entries.map(entry => 
          entry.id === entryId ? { ...entry, status } : entry
        )
      );
    } catch (err) {
      setError('Error updating queue status');
      console.error(err);
    }
  };

  const handleDoctorAdded = (newDoctor: Doctor) => {
    setDoctors(prev => [...prev, newDoctor]);
    setShowAddDoctorForm(false);
    // Update hospital doctor count
    if (hospital) {
      setHospital(prev => prev ? { ...prev, doctorCount: prev.doctorCount + 1 } : null);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
  }

  if (!hospital) {
    return <div className="flex items-center justify-center min-h-screen">No hospital data available</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{hospital.name} Dashboard</h1>
        <div className="text-sm text-gray-600">
          Hospital ID: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{hospital.id}</span>
        </div>
      </div>
      
      {/* Hospital Info */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Hospital Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-gray-600">Address:</p>
            <p className="font-medium">{hospital.address}</p>
          </div>
          <div>
            <p className="text-gray-600">Staff Count:</p>
            <p className="font-medium">{hospital.staffCount}</p>
          </div>
          <div>
            <p className="text-gray-600">Doctors Count:</p>
            <p className="font-medium">{hospital.doctorCount}</p>
          </div>
        </div>
      </div>

      {/* Doctors List */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Doctors</h2>
          <button
            onClick={() => setShowAddDoctorForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Doctor
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.map(doctor => (
            <div key={doctor.id} className="border rounded-lg p-4">
              <h3 className="font-semibold">{doctor.name}</h3>
              <p className="text-gray-600">{doctor.specialization}</p>
              <p className="text-gray-600 text-sm">{doctor.email}</p>
              <p className="text-gray-600 text-sm">{doctor.phone}</p>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={doctor.isAvailable}
                    onChange={(e) => handleDoctorAvailability(doctor.id, e.target.checked)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2">Available</span>
                </label>
              </div>
              <button
                onClick={() => setSelectedDoctor(doctor)}
                className="mt-2 text-blue-600 hover:text-blue-800"
              >
                View Today's Queue
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Queue Management */}
      {selectedDoctor && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Today's Queue for Dr. {selectedDoctor.name}
            </h2>
            <button
              onClick={() => setSelectedDoctor(null)}
              className="text-gray-600 hover:text-gray-800"
            >
              Close
            </button>
          </div>
          
          {currentQueue ? (
            <div className="mb-4 p-4 bg-blue-50 rounded">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Current Number:</span>
                  <span className="ml-2 font-semibold">{currentQueue.currentNumber}</span>
                </div>
                <div>
                  <span className="text-gray-600">Total Patients:</span>
                  <span className="ml-2 font-semibold">{currentQueue.totalPatients}</span>
                </div>
                <div>
                  <span className="text-gray-600">Status:</span>
                  <span className="ml-2 font-semibold capitalize">{currentQueue.status}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-4 p-4 bg-gray-50 rounded">
              <p className="text-gray-600">No queue created for today yet. Queue will be created when first patient joins.</p>
            </div>
          )}

          <div className="space-y-4">
            {queueEntries.length > 0 ? (
              queueEntries.map(entry => (
                <div key={entry.id} className="border rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold">#{entry.number} - {entry.patientName}</p>
                    <p className="text-gray-600">Status: <span className="capitalize">{entry.status}</span></p>
                    <p className="text-gray-600 text-sm">
                      Joined: {entry.joinedAt.toDate().toLocaleTimeString()}
                    </p>
                    {entry.completedAt && (
                      <p className="text-gray-600 text-sm">
                        Completed: {entry.completedAt.toDate().toLocaleTimeString()}
                      </p>
                    )}
                  </div>
                  <div className="space-x-2">
                    {entry.status === 'waiting' && (
                      <button
                        onClick={() => handleQueueStatusUpdate(entry.id, 'in-progress')}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Start
                      </button>
                    )}
                    {entry.status === 'in-progress' && (
                      <button
                        onClick={() => handleQueueStatusUpdate(entry.id, 'completed')}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      >
                        Complete
                      </button>
                    )}
                    {(entry.status === 'waiting' || entry.status === 'in-progress') && (
                      <button
                        onClick={() => handleQueueStatusUpdate(entry.id, 'no-show')}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        No Show
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">No patients in queue today</p>
            )}
          </div>
        </div>
      )}

      {/* Add Doctor Form Modal */}
      {showAddDoctorForm && hospital && (
        <AddDoctorForm
          hospitalId={hospital.id}
          staffId={currentUser!.id}
          onDoctorAdded={handleDoctorAdded}
          onCancel={() => setShowAddDoctorForm(false)}
        />
      )}
    </div>
  );
};

export default StaffDashboard; 