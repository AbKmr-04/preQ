import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { app } from './config/firebase'; // Import Firebase app instance
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import HospitalSelectionPage from './pages/HospitalSelectionPage';
import HospitalDashboard from './pages/dashboard/HospitalDashboard';
import PatientDashboard from './pages/dashboard/PatientDashboard';
import DoctorInterface from './pages/dashboard/DoctorInterface';
import AdminPage from './pages/AdminPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import ScrollToTop from './components/common/ScrollToTop';
import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          
          {/* Hospital selection for staff */}
          <Route 
            path="/hospital-selection" 
            element={
              <ProtectedRoute allowedRoles={['staff', 'hospital']}>
                <HospitalSelectionPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Staff Dashboard Routes - Explicit paths */}
          <Route 
            path="/dashboard/staff/*"
            element={
              <ProtectedRoute allowedRoles={['staff', 'hospital']}>
                <HospitalDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Patient Dashboard Routes - Explicit paths */}
          <Route 
            path="/dashboard/patient/*" 
            element={
              <ProtectedRoute allowedRoles={['patient']}>
                <PatientDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Legacy route redirects for compatibility */}
          <Route path="/hospital-dashboard/*" element={<Navigate to="/dashboard/staff" replace />} />
          <Route path="/patient-dashboard/*" element={<Navigate to="/dashboard/patient" replace />} />
          
          {/* Doctor Interface */}
          <Route path="/doctor/:id" element={<DoctorInterface />} />
          
          {/* Catch-all redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;