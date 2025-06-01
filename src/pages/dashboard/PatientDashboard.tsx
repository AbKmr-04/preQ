import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { User, Clock, QrCode, Settings, LogOut, Camera, X, Upload, ArrowRight, CheckCheck, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Logo from '../../components/common/Logo';
import PatientQuestionnaire from './patient/PatientQuestionnaire';
import PatientQRScanner from './patient/PatientQRScanner';
import PatientSettings from './patient/PatientSettings';
import PatientOverview from './patient/PatientOverview';
import FindDoctors from './patient/FindDoctors';
import {
  getHospitals,
  getHospitalDoctors,
  addToQueue,
  getPatientQueues,
  Hospital,
  Doctor
} from '../../services/database';

const PatientDashboard: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [myQueues, setMyQueues] = useState<Array<{
    hospitalId: string;
    hospitalName: string;
    doctorId: string;
    doctorName: string;
    queueId: string;
    entry: any;
  }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hospitalsData = await getHospitals();
        setHospitals(hospitalsData);
        
        if (hospitalsData.length > 0) {
          setSelectedHospital(hospitalsData[0]);
        }
      } catch (err) {
        setError('Error fetching hospitals');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      if (!selectedHospital) return;

      try {
        const doctorsData = await getHospitalDoctors(selectedHospital.id);
        setDoctors(doctorsData.filter(doctor => doctor.isAvailable));
      } catch (err) {
        setError('Error fetching doctors');
        console.error(err);
      }
    };

    fetchDoctors();
  }, [selectedHospital]);

  useEffect(() => {
    const fetchMyQueues = async () => {
      if (!currentUser) return;

      try {
        const queues = await getPatientQueues(currentUser.id);
        setMyQueues(queues);
      } catch (err) {
        console.error('Error fetching queue entries:', err);
      }
    };

    fetchMyQueues();
  }, [currentUser]);

  const handleJoinQueue = async (doctor: Doctor) => {
    if (!currentUser || !selectedHospital) return;

    try {
      setError(null);
      setSuccessMessage(null);

      await addToQueue(selectedHospital.id, doctor.id, currentUser.id, currentUser.name);
      
      // Refresh queue entries
      const queues = await getPatientQueues(currentUser.id);
      setMyQueues(queues);

      setSuccessMessage(`Successfully joined Dr. ${doctor.name}'s queue!`);
    } catch (err) {
      setError('Error joining queue. Please try again.');
      console.error(err);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <aside 
        className={`bg-white shadow-lg z-20 fixed lg:static inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 lg:flex flex-col w-64 overflow-y-auto`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-5 border-b">
          <Link to="/" className="flex items-center">
            <Logo />
            <span className="ml-2 text-xl font-inter font-semibold">PreQ</span>
          </Link>
          <button 
            onClick={toggleSidebar}
            className="p-1 rounded-md lg:hidden focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          <Link to="/dashboard/patient" className="flex items-center px-4 py-3 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg">
            <Clock className="h-5 w-5 mr-3" />
            My Queue
          </Link>
          <Link to="/dashboard/patient/doctors" className="flex items-center px-4 py-3 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg">
            <Search className="h-5 w-5 mr-3" />
            Find Doctors
          </Link>
          <Link to="/dashboard/patient/scanner" className="flex items-center px-4 py-3 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg">
            <QrCode className="h-5 w-5 mr-3" />
            Scan QR Code
          </Link>
          <Link to="/dashboard/patient/settings" className="flex items-center px-4 py-3 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg">
            <Settings className="h-5 w-5 mr-3" />
            Settings
          </Link>
        </nav>
        
        {/* User Info & Logout */}
        <div className="px-4 py-5 border-t">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
              {currentUser?.name?.charAt(0) || 'P'}
            </div>
            <div className="ml-3">
              <p className="font-medium text-neutral-800">{currentUser?.name}</p>
              <p className="text-sm text-neutral-500">{currentUser?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm z-10 py-4 px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button 
                onClick={toggleSidebar}
                className="p-2 rounded-md lg:hidden focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="ml-2 lg:ml-0 text-xl font-semibold text-neutral-800">Patient Dashboard</h1>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={
              <div>
                {/* My Queues Section */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">My Queue Status</h2>
                  {myQueues.length > 0 ? (
                    <div className="grid gap-4">
                      {myQueues.map((queue, index) => (
                        <div key={index} className="bg-white rounded-lg shadow p-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg">Dr. {queue.doctorName}</h3>
                              <p className="text-gray-600">{queue.hospitalName}</p>
                              <div className="mt-2">
                                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                  Queue #{queue.entry.number}
                                </span>
                                <span className={`ml-2 inline-block px-3 py-1 rounded-full text-sm capitalize ${
                                  queue.entry.status === 'waiting' ? 'bg-yellow-100 text-yellow-800' :
                                  queue.entry.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                  queue.entry.status === 'completed' ? 'bg-green-100 text-green-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {queue.entry.status}
                                </span>
                              </div>
                            </div>
                            <div className="text-right text-sm text-gray-500">
                              <p>Joined: {queue.entry.joinedAt.toDate().toLocaleString()}</p>
                              {queue.entry.completedAt && (
                                <p>Completed: {queue.entry.completedAt.toDate().toLocaleString()}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-8 text-center">
                      <p className="text-gray-500 mb-4">You're not in any queues today</p>
                      <Link to="/dashboard/patient/doctors">
                        <Button variant="primary">Find Doctors</Button>
                      </Link>
                    </div>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Find Available Doctors</h2>
                  {successMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                      {successMessage}
                    </div>
                  )}
                  {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                      {error}
                    </div>
                  )}
                  
                  {/* Hospital Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Hospital
                    </label>
                    <select
                      value={selectedHospital?.id || ''}
                      onChange={(e) => {
                        const hospital = hospitals.find(h => h.id === e.target.value);
                        setSelectedHospital(hospital || null);
                      }}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select a hospital</option>
                      {hospitals.map(hospital => (
                        <option key={hospital.id} value={hospital.id}>
                          {hospital.name} - {hospital.address}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Doctors List */}
                  {selectedHospital && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {doctors.map(doctor => (
                        <div key={doctor.id} className="bg-white rounded-lg shadow p-4">
                          <h3 className="font-semibold">{doctor.name}</h3>
                          <p className="text-gray-600">{doctor.specialization}</p>
                          <p className="text-gray-600 text-sm">{doctor.email}</p>
                          <div className="mt-4">
                            <button
                              onClick={() => handleJoinQueue(doctor)}
                              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                            >
                              Join Queue
                            </button>
                          </div>
                        </div>
                      ))}
                      {doctors.length === 0 && (
                        <div className="col-span-full text-center py-8 text-gray-500">
                          No available doctors at this hospital today
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            } />
            <Route path="/doctors/*" element={<FindDoctors />} />
            <Route path="/scanner" element={<PatientQRScanner />} />
            <Route path="/questionnaire/:id" element={<PatientQuestionnaire />} />
            <Route path="/settings" element={<PatientSettings />} />
          </Routes>
        </main>
      </div>
      
      {/* Mobile Quick Actions */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t py-3 px-4 flex justify-around z-20">
        <Link to="/dashboard/patient" className="flex flex-col items-center text-neutral-600">
          <Clock className="h-6 w-6" />
          <span className="text-xs mt-1">My Queue</span>
        </Link>
        <Link to="/dashboard/patient/doctors" className="flex flex-col items-center text-neutral-600">
          <Search className="h-6 w-6" />
          <span className="text-xs mt-1">Find Doctors</span>
        </Link>
        <Link to="/dashboard/patient/scanner" className="flex flex-col items-center text-neutral-600">
          <QrCode className="h-6 w-6" />
          <span className="text-xs mt-1">Scan QR</span>
        </Link>
        <Link to="/dashboard/patient/settings" className="flex flex-col items-center text-neutral-600">
          <Settings className="h-6 w-6" />
          <span className="text-xs mt-1">Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default PatientDashboard;