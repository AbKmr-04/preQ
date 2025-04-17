import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css'; // Ensure Tailwind styles are imported

// Simple placeholder for a generic Home page
const HomePage = () => (
  <div className="px-4 py-6 sm:px-0">
    <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
      <p className="text-gray-500 text-xl">Welcome - Main Application Area</p>
    </div>
  </div>
);

// Placeholder Dashboards
const PatientDashboard = () => (
  <div>
    <h2>Patient Dashboard</h2>
    <p>This is the patient view.</p>
  </div>
);

const DoctorDashboard = () => (
  <div>
    <h2>Doctor Dashboard</h2>
    <p>This is the doctor view.</p>
  </div>
);

const HelpdeskDashboard = () => (
  <div>
    <h2>Helpdesk Dashboard</h2>
    <p>This is the helpdesk view.</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Hospital Queue Management
            </h1>
            <nav>
              <Link to="/" className="ml-4 text-gray-500 hover:text-gray-700">Home</Link>
              {/* Direct links to dashboards, bypassing login */}
              <Link to="/patient" className="ml-4 text-gray-500 hover:text-gray-700">View as Patient</Link>
              <Link to="/doctor" className="ml-4 text-gray-500 hover:text-gray-700">View as Doctor</Link>
              <Link to="/helpdesk" className="ml-4 text-gray-500 hover:text-gray-700">View as Helpdesk</Link>
            </nav>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* Routes for placeholder dashboards */}
              <Route path="/patient" element={<PatientDashboard />} />
              <Route path="/doctor" element={<DoctorDashboard />} />
              <Route path="/helpdesk" element={<HelpdeskDashboard />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App; 