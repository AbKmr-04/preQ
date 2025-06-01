import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import StaffDashboard from './pages/dashboard/StaffDashboard';
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
              <ProtectedRoute allowedRoles={['staff']}>
                <HospitalSelectionPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Protected routes */}
          <Route 
            path="/dashboard/staff" 
            element={
              <ProtectedRoute allowedRoles={['staff']}>
                <StaffDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/patient" 
            element={
              <ProtectedRoute allowedRoles={['patient']}>
                <PatientDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/doctor/:id" element={<DoctorInterface />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;