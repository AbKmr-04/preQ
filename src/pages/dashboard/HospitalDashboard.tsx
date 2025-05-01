import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Users, Clock, Clipboard, Settings, LogOut, Plus, QrCode, Download } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Logo from '../../components/common/Logo';
import DoctorsManagement from './hospital/DoctorsManagement';
import QueueManagement from './hospital/QueueManagement';
import HospitalSettings from './hospital/HospitalSettings';
import HospitalOverview from './hospital/HospitalOverview';

const HospitalDashboard: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
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
          <Link to="/hospital-dashboard" className="flex items-center px-4 py-3 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg">
            <Clipboard className="h-5 w-5 mr-3" />
            Overview
          </Link>
          <Link to="/hospital-dashboard/doctors" className="flex items-center px-4 py-3 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg">
            <Users className="h-5 w-5 mr-3" />
            Doctors
          </Link>
          <Link to="/hospital-dashboard/queues" className="flex items-center px-4 py-3 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg">
            <Clock className="h-5 w-5 mr-3" />
            Queues
          </Link>
          <Link to="/hospital-dashboard/settings" className="flex items-center px-4 py-3 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg">
            <Settings className="h-5 w-5 mr-3" />
            Settings
          </Link>
        </nav>
        
        {/* User Info & Logout */}
        <div className="px-4 py-5 border-t">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
              {currentUser?.name?.charAt(0) || 'H'}
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
              <h1 className="ml-2 lg:ml-0 text-xl font-semibold text-neutral-800">Hospital Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <Link to="/hospital-dashboard/doctors/new">
                <Button variant="primary" size="sm" className="hidden sm:inline-flex">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Doctor
                </Button>
              </Link>
              <Link to="/hospital-dashboard/queues/new">
                <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                  <Plus className="h-4 w-4 mr-1" />
                  Create Queue
                </Button>
              </Link>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<HospitalOverview />} />
            <Route path="/doctors/*" element={<DoctorsManagement />} />
            <Route path="/queues/*" element={<QueueManagement />} />
            <Route path="/settings" element={<HospitalSettings />} />
          </Routes>
        </main>
      </div>
      
      {/* Mobile Quick Actions */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t py-3 px-4 flex justify-around z-20">
        <Link to="/hospital-dashboard" className="flex flex-col items-center text-neutral-600">
          <Clipboard className="h-6 w-6" />
          <span className="text-xs mt-1">Overview</span>
        </Link>
        <Link to="/hospital-dashboard/doctors" className="flex flex-col items-center text-neutral-600">
          <Users className="h-6 w-6" />
          <span className="text-xs mt-1">Doctors</span>
        </Link>
        <Link to="/hospital-dashboard/queues" className="flex flex-col items-center text-neutral-600">
          <Clock className="h-6 w-6" />
          <span className="text-xs mt-1">Queues</span>
        </Link>
        <Link to="/hospital-dashboard/settings" className="flex flex-col items-center text-neutral-600">
          <Settings className="h-6 w-6" />
          <span className="text-xs mt-1">Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default HospitalDashboard;