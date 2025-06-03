import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Search, User, Calendar, Clock, MapPin, Star, Loader2 } from 'lucide-react';
import Button from '../../../components/common/Button';
import { getAllDoctors, Doctor } from '../../../services/database';

const FindDoctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Array<Doctor & { hospitalId: string; hospitalName: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const navigate = useNavigate();

  // Load all doctors on component mount
  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      setError(null);
      // Get all doctors (not filtered by hospital for patients to see all available doctors)
      const doctorsData = await getAllDoctors();
      // Filter only active/available doctors
      const activeDoctors = doctorsData.filter(doctor => 
        doctor.isAvailable && (doctor.status === 'active' || doctor.status === undefined)
      );
      setDoctors(activeDoctors);
    } catch (err) {
      console.error('Error loading doctors:', err);
      setError('Failed to load doctors. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Get unique specialties for filter
  const specialties = Array.from(new Set(
    doctors.map(doctor => doctor.specialization).filter(Boolean)
  ));

  // Filter doctors based on search and specialty
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.hospitalName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialty = !selectedSpecialty || 
      doctor.specialization === selectedSpecialty;
    
    return matchesSearch && matchesSpecialty;
  });

  const handleBookAppointment = (doctorId: string, hospitalId: string) => {
    // Navigate to booking page with both doctor and hospital IDs
    navigate(`/dashboard/patient/doctors/book/${hospitalId}/${doctorId}`);
  };

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
          <h1 className="text-2xl font-semibold mb-4 md:mb-0">Find Doctors</h1>
          <p className="text-neutral-600">Book appointments with available doctors</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search doctors by name or specialty..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
            </div>
            
            <select
              className="input-field"
              value={selectedSpecialty}
              onChange={e => setSelectedSpecialty(e.target.value)}
            >
              <option value="">All Specialties</option>
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold text-lg">
                    {doctor.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold text-neutral-800">{doctor.name}</h3>
                    <p className="text-sm text-neutral-600">{doctor.specialization}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {doctor.hospitalName && (
                    <div className="flex items-center text-sm text-neutral-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {doctor.hospitalName}
                    </div>
                  )}
                  {doctor.email && (
                    <div className="flex items-center text-sm text-neutral-600">
                      <User className="h-4 w-4 mr-2" />
                      {doctor.email}
                    </div>
                  )}
                  {doctor.phone && (
                    <div className="flex items-center text-sm text-neutral-600">
                      <Clock className="h-4 w-4 mr-2" />
                      {doctor.phone}
                    </div>
                  )}
                  <div className="flex items-center text-sm">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Available
                    </span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => handleBookAppointment(doctor.id!, doctor.hospitalId)}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Appointment
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredDoctors.length === 0 && !loading && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center py-12">
              <User className="h-12 w-12 text-neutral-300 mb-4 mx-auto" />
              <h3 className="text-lg font-medium text-neutral-700 mb-1">No doctors found</h3>
              <p className="text-neutral-500 mb-4">
                {searchTerm || selectedSpecialty 
                  ? 'Try adjusting your search criteria' 
                  : 'No doctors are currently available'}
              </p>
              {(searchTerm || selectedSpecialty) && (
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedSpecialty('');
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Routes>
      <Route path="/" element={<DoctorsList />} />
      {/* We'll add booking route later */}
    </Routes>
  );
};

export default FindDoctors; 