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
          <Link to="" className="flex items-center px-4 py-3 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg">
            <Clock className="h-5 w-5 mr-3" />
            My Queue
          </Link>
          <Link to="doctors" className="flex items-center px-4 py-3 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg">
            <Search className="h-5 w-5 mr-3" />
            Find Doctors
          </Link>
          <Link to="scanner" className="flex items-center px-4 py-3 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg">
            <QrCode className="h-5 w-5 mr-3" />
            Scan QR Code
          </Link>
          <Link to="settings" className="flex items-center px-4 py-3 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg">
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
            <Route path="/" element={<PatientOverview />} />
            <Route path="/doctors/*" element={<FindDoctors />} />
            <Route path="/scanner" element={<PatientQRScanner />} />
            <Route path="/questionnaire/:id" element={<PatientQuestionnaire />} />
            <Route path="/settings" element={<PatientSettings />} />
          </Routes>
        </main>
      </div>
      
      {/* Mobile Quick Actions */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t py-3 px-4 flex justify-around z-20">
        <Link to="" className="flex flex-col items-center text-neutral-600">
          <Clock className="h-6 w-6" />
          <span className="text-xs mt-1">My Queue</span>
        </Link>
        <Link to="doctors" className="flex flex-col items-center text-neutral-600">
          <Search className="h-6 w-6" />
          <span className="text-xs mt-1">Find Doctors</span>
        </Link>
        <Link to="scanner" className="flex flex-col items-center text-neutral-600">
          <QrCode className="h-6 w-6" />
          <span className="text-xs mt-1">Scan QR</span>
        </Link>
        <Link to="settings" className="flex flex-col items-center text-neutral-600">
          <Settings className="h-6 w-6" />
          <span className="text-xs mt-1">Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default PatientDashboard;