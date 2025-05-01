import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Search, Plus, Download, QrCode, Edit, Trash2, User } from 'lucide-react';
import Button from '../../../components/common/Button';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  qrCode: string;
}

const DoctorsManagement: React.FC = () => {
  // Mock data
  const [doctors, setDoctors] = useState<Doctor[]>([
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      email: 'sarah.johnson@preq.com',
      phone: '(555) 123-4567',
      status: 'active',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=doctor-1'
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Pediatrics',
      email: 'michael.chen@preq.com',
      phone: '(555) 987-6543',
      status: 'active',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=doctor-2'
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      specialty: 'Dermatology',
      email: 'emily.rodriguez@preq.com',
      phone: '(555) 456-7890',
      status: 'active',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=doctor-3'
    },
    {
      id: '4',
      name: 'Dr. David Kim',
      specialty: 'Orthopedics',
      email: 'david.kim@preq.com',
      phone: '(555) 234-5678',
      status: 'active',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=doctor-4'
    },
    {
      id: '5',
      name: 'Dr. Lisa Wong',
      specialty: 'General Medicine',
      email: 'lisa.wong@preq.com',
      phone: '(555) 876-5432',
      status: 'inactive',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=doctor-5'
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const DoctorsList = () => {
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
                    <td className="px-6 py-4 text-neutral-600">{doctor.specialty}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-neutral-600">{doctor.email}</div>
                      <div className="text-sm text-neutral-500">{doctor.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span 
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          doctor.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-neutral-100 text-neutral-800'
                        }`}
                      >
                        {doctor.status === 'active' ? 'Active' : 'Inactive'}
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
          
          {filteredDoctors.length === 0 && (
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
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      // Add new doctor to list
      const newDoctor: Doctor = {
        id: `${doctors.length + 1}`,
        name: doctorName,
        specialty,
        email,
        phone,
        status: 'active',
        qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=doctor-${doctors.length + 1}`
      };
      
      setDoctors([...doctors, newDoctor]);
      navigate('/hospital-dashboard/doctors');
    };
    
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Add New Doctor</h1>
        </div>
        
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
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 mt-8">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate('/hospital-dashboard/doctors')}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Create Doctor
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