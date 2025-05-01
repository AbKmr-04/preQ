import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Search, Plus, Users, Clock, CheckCircle, X, ArrowRight } from 'lucide-react';
import Button from '../../../components/common/Button';

interface Queue {
  id: string;
  doctor: string;
  specialty: string;
  status: 'active' | 'paused' | 'ended';
  patients: number;
  avgWaitTime: number;
  startTime: string;
}

const QueueManagement: React.FC = () => {
  // Mock data
  const [queues, setQueues] = useState<Queue[]>([
    {
      id: '1',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      status: 'active',
      patients: 9,
      avgWaitTime: 22,
      startTime: '08:30 AM'
    },
    {
      id: '2',
      doctor: 'Dr. Michael Chen',
      specialty: 'Pediatrics',
      status: 'active',
      patients: 12,
      avgWaitTime: 15,
      startTime: '09:00 AM'
    },
    {
      id: '3',
      doctor: 'Dr. Emily Rodriguez',
      specialty: 'Dermatology',
      status: 'active',
      patients: 7,
      avgWaitTime: 12,
      startTime: '09:15 AM'
    },
    {
      id: '4',
      doctor: 'Dr. David Kim',
      specialty: 'Orthopedics',
      status: 'paused',
      patients: 10,
      avgWaitTime: 25,
      startTime: '08:45 AM'
    },
    {
      id: '5',
      doctor: 'Dr. Lisa Wong',
      specialty: 'General Medicine',
      status: 'ended',
      patients: 0,
      avgWaitTime: 0,
      startTime: '08:00 AM'
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredQueues = queues.filter(queue => 
    queue.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    queue.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const QueuesList = () => {
    return (
      <div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-semibold mb-4 md:mb-0">Queue Management</h1>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search queues..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
            </div>
            <Link to="/hospital-dashboard/queues/new">
              <Button variant="primary">
                <Plus className="h-4 w-4 mr-2" />
                Create Queue
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
                  <th className="px-6 py-3 text-left font-medium">Patients</th>
                  <th className="px-6 py-3 text-left font-medium">Avg. Wait</th>
                  <th className="px-6 py-3 text-left font-medium">Started</th>
                  <th className="px-6 py-3 text-left font-medium">Status</th>
                  <th className="px-6 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredQueues.map((queue) => (
                  <tr key={queue.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-neutral-800">{queue.doctor}</div>
                    </td>
                    <td className="px-6 py-4 text-neutral-600">{queue.specialty}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-neutral-400 mr-2" />
                        <span>{queue.patients}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span>{queue.avgWaitTime} min</span>
                    </td>
                    <td className="px-6 py-4 text-neutral-600">
                      {queue.startTime}
                    </td>
                    <td className="px-6 py-4">
                      <span 
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          queue.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : queue.status === 'paused'
                              ? 'bg-warning-400/20 text-warning-500'
                              : 'bg-neutral-100 text-neutral-800'
                        }`}
                      >
                        {queue.status === 'active' 
                          ? 'Active' 
                          : queue.status === 'paused' 
                            ? 'Paused' 
                            : 'Ended'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link to={`/hospital-dashboard/queues/${queue.id}`} className="text-primary-500 hover:text-primary-600">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredQueues.length === 0 && (
            <div className="py-12 flex flex-col items-center justify-center">
              <Clock className="h-12 w-12 text-neutral-300 mb-4" />
              <h3 className="text-lg font-medium text-neutral-700 mb-1">No queues found</h3>
              <p className="text-neutral-500 mb-4">
                {searchTerm ? 'Try a different search term' : 'Create your first queue to get started'}
              </p>
              <Link to="/hospital-dashboard/queues/new">
                <Button variant="primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Queue
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  const NewQueue = () => {
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState('');
    const [specialty, setSpecialty] = useState('');
    
    // Mock doctors data
    const doctors = [
      { id: '1', name: 'Dr. Sarah Johnson', specialty: 'Cardiology' },
      { id: '2', name: 'Dr. Michael Chen', specialty: 'Pediatrics' },
      { id: '3', name: 'Dr. Emily Rodriguez', specialty: 'Dermatology' },
      { id: '4', name: 'Dr. David Kim', specialty: 'Orthopedics' },
      { id: '5', name: 'Dr. Lisa Wong', specialty: 'General Medicine' }
    ];
    
    const handleDoctorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedDoctor = doctors.find(d => d.id === e.target.value);
      if (selectedDoctor) {
        setDoctor(selectedDoctor.name);
        setSpecialty(selectedDoctor.specialty);
      }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      // Add new queue to list
      const newQueue: Queue = {
        id: `${queues.length + 1}`,
        doctor,
        specialty,
        status: 'active',
        patients: 0,
        avgWaitTime: 0,
        startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setQueues([...queues, newQueue]);
      navigate('/hospital-dashboard/queues');
    };
    
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Create New Queue</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6">
            <div className="mb-6">
              <label htmlFor="doctor" className="block text-sm font-medium text-neutral-700 mb-2">
                Select Doctor
              </label>
              <select
                id="doctor"
                className="input-field"
                required
                onChange={handleDoctorChange}
              >
                <option value="">Select a doctor</option>
                {doctors.map(doc => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name} - {doc.specialty}
                  </option>
                ))}
              </select>
            </div>
            
            {doctor && (
              <div className="bg-primary-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium text-primary-700 mb-2">Queue Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-neutral-500">Doctor</p>
                    <p className="font-medium">{doctor}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Specialty</p>
                    <p className="font-medium">{specialty}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-neutral-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium mb-2">Queue Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary-500 focus:ring-primary-400 border-neutral-300 rounded"
                      defaultChecked
                    />
                    <span>Enable patient notifications</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary-500 focus:ring-primary-400 border-neutral-300 rounded"
                      defaultChecked
                    />
                    <span>Collect patient feedback</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary-500 focus:ring-primary-400 border-neutral-300 rounded"
                      defaultChecked
                    />
                    <span>AI questionnaire enabled</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 mt-8">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate('/hospital-dashboard/queues')}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="primary"
                disabled={!doctor}
              >
                Create Queue
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  return (
    <Routes>
      <Route path="/" element={<QueuesList />} />
      <Route path="/new" element={<NewQueue />} />
    </Routes>
  );
};

export default QueueManagement;