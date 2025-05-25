import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Search, Plus, Download, QrCode, Edit, Trash2, User, Loader2 } from 'lucide-react';
import Button from '../../../components/common/Button';
import { useAuth } from '../../../context/AuthContext';
import { addDoctor, getAllDoctors, Doctor } from '../../../services/database';

const DoctorsManagement: React.FC = () => {
  const { currentUser } = useAuth();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Load doctors on component mount
  useEffect(() => {
    loadDoctors();
  }, [currentUser]);

  const loadDoctors = async () => {
    if (!currentUser) return;
    
    try {
      setLoading(true);
      setError(null);
      const doctorsData = await getAllDoctors(currentUser.id); // Using user ID as hospital ID for now
      setDoctors(doctorsData);
    } catch (err) {
      console.error('Error loading doctors:', err);
      setError('Failed to load doctors. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (doctor.specialty || doctor.specialization)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const DoctorsList = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
          <span className="ml-2 text-neutral-600">Loading doctors...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-center py-12">
            <div className="text-error-500 mb-4">⚠️</div>
            <h3 className="text-lg font-medium text-neutral-700 mb-2">Error Loading Doctors</h3>
            <p className="text-neutral-500 mb-4">{error}</p>
            <Button onClick={loadDoctors} variant="primary">
              Try Again
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-semibold mb-4 md:mb-0">Doctors Management</h1>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search doctors..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
            </div>
            <Link to="/hospital-dashboard/doctors/new">
              <Button variant="primary">
                <Plus className="h-4 w-4 mr-2" />
                Add Doctor
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 text-sm text-neutral-500">
                <tr>
                  <th className="px-6 py-3 text-left font-medium">Doctor</th>
                  <th className="px-6 py-3 text-left font-medium">Specialty</th>
                  <th className="px-6 py-3 text-left font-medium">Contact</th>
                  <th className="px-6 py-3 text-left font-medium">Status</th>
                  <th className="px-6 py-3 text-left font-medium">QR Code</th>
                  <th className="px-6 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredDoctors.map((doctor) => (
                  <tr key={doctor.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
                          {doctor.name.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <div className="font-medium text-neutral-800">{doctor.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-neutral-600">{doctor.specialty || doctor.specialization}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-neutral-600">{doctor.email || 'N/A'}</div>
                      <div className="text-sm text-neutral-500">{doctor.phone || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span 
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          (doctor.status === 'active' || doctor.available) 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-neutral-100 text-neutral-800'
                        }`}
                      >
                        {(doctor.status === 'active' || doctor.available) ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Button variant="ghost" size="sm">
                        <QrCode className="h-4 w-4 mr-1" />
                        View QR
                      </Button>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 text-error-400" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredDoctors.length === 0 && !loading && (
            <div className="py-12 flex flex-col items-center justify-center">
              <User className="h-12 w-12 text-neutral-300 mb-4" />
              <h3 className="text-lg font-medium text-neutral-700 mb-1">No doctors found</h3>
              <p className="text-neutral-500 mb-4">
                {searchTerm ? 'Try a different search term' : 'Add your first doctor to get started'}
              </p>
              <Link to="/hospital-dashboard/doctors/new">
                <Button variant="primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Doctor
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  const NewDoctor = () => {
    const navigate = useNavigate();
    const [doctorName, setDoctorName] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!currentUser) {
        setSubmitError('User not authenticated');
        return;
      }
      
      setIsSubmitting(true);
      setSubmitError(null);
      
      try {
        // Create new doctor data with all required fields
        const newDoctorData: Omit<Doctor, 'id' | 'createdAt'> = {
          name: doctorName,
          specialization: specialty, // Required field
          specialty: specialty, // For UI compatibility
          email,
          phone,
          hospitalId: currentUser.id, // Required field
          available: true, // Required field
          status: 'active'
        };
        
        const doctorId = await addDoctor(newDoctorData);
        console.log('Doctor added with ID:', doctorId);
        
        // Reload the doctors list
        await loadDoctors();
        
        // Navigate back to doctors list
        navigate('/hospital-dashboard/doctors');
      } catch (error) {
        console.error('Error adding doctor:', error);
        setSubmitError('Failed to add doctor. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    };
    
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Add New Doctor</h1>
        </div>
        
        {submitError && (
          <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded mb-6">
            {submitError}
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="doctorName" className="block text-sm font-medium text-neutral-700 mb-2">
                  Doctor Name
                </label>
                <input
                  type="text"
                  id="doctorName"
                  className="input-field"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  required
                  placeholder="Dr. John Doe"
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label htmlFor="specialty" className="block text-sm font-medium text-neutral-700 mb-2">
                  Specialty
                </label>
                <input
                  type="text"
                  id="specialty"
                  className="input-field"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  required
                  placeholder="Cardiology"
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="john.doe@example.com"
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="input-field"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="(555) 123-4567"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 mt-8">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate('/hospital-dashboard/doctors')}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Doctor'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  return (
    <Routes>
      <Route path="/" element={<DoctorsList />} />
      <Route path="/new" element={<NewDoctor />} />
    </Routes>
  );
};

export default DoctorsManagement;