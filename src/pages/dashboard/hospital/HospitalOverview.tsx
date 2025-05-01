import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Clock, ArrowUp, ArrowDown, TrendingUp, AlertCircle, CheckCircle, Download } from 'lucide-react';
import Button from '../../../components/common/Button';

const HospitalOverview: React.FC = () => {
  // Mock data
  const stats = {
    activeDoctors: 8,
    activeQueues: 5,
    totalPatients: 43,
    avgWaitTime: 18,
    completedConsultations: 27,
  };
  
  const activeQueues = [
    { id: 1, doctor: 'Dr. Sarah Johnson', specialty: 'Cardiology', patients: 9, avgWaitTime: 22, status: 'active' },
    { id: 2, doctor: 'Dr. Michael Chen', specialty: 'Pediatrics', patients: 12, avgWaitTime: 15, status: 'active' },
    { id: 3, doctor: 'Dr. Emily Rodriguez', specialty: 'Dermatology', patients: 7, avgWaitTime: 12, status: 'active' },
    { id: 4, doctor: 'Dr. David Kim', specialty: 'Orthopedics', patients: 10, avgWaitTime: 25, status: 'active' },
    { id: 5, doctor: 'Dr. Lisa Wong', specialty: 'General Medicine', patients: 5, avgWaitTime: 8, status: 'active' },
  ];
  
  const recentAlerts = [
    { id: 1, type: 'warning', message: 'Dr. Johnson\'s queue exceeding 30 min wait time', time: '12 min ago' },
    { id: 2, type: 'info', message: 'New patient questionnaire patterns detected', time: '35 min ago' },
    { id: 3, type: 'success', message: 'AI model updated for improved questionnaire efficiency', time: '1 hour ago' },
  ];
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {/* Active Doctors */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-neutral-500 text-sm">Active Doctors</p>
              <h3 className="text-3xl font-bold mt-2">{stats.activeDoctors}</h3>
            </div>
            <div className="bg-primary-50 p-3 rounded-full">
              <Users className="h-6 w-6 text-primary-500" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <span className="flex items-center text-success-500 text-sm">
              <ArrowUp className="h-3 w-3 mr-1" />
              2
            </span>
            <span className="text-neutral-500 text-sm ml-2">from yesterday</span>
          </div>
        </div>
        
        {/* Active Queues */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-neutral-500 text-sm">Active Queues</p>
              <h3 className="text-3xl font-bold mt-2">{stats.activeQueues}</h3>
            </div>
            <div className="bg-secondary-50 p-3 rounded-full">
              <Clock className="h-6 w-6 text-secondary-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <span className="flex items-center text-success-500 text-sm">
              <ArrowUp className="h-3 w-3 mr-1" />
              1
            </span>
            <span className="text-neutral-500 text-sm ml-2">from yesterday</span>
          </div>
        </div>
        
        {/* Average Wait Time */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-neutral-500 text-sm">Avg. Wait Time</p>
              <h3 className="text-3xl font-bold mt-2">{stats.avgWaitTime} min</h3>
            </div>
            <div className="bg-primary-50 p-3 rounded-full">
              <Clock className="h-6 w-6 text-primary-500" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <span className="flex items-center text-error-500 text-sm">
              <ArrowUp className="h-3 w-3 mr-1" />
              4 min
            </span>
            <span className="text-neutral-500 text-sm ml-2">from yesterday</span>
          </div>
        </div>
        
        {/* Completed Consultations */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-neutral-500 text-sm">Completed Today</p>
              <h3 className="text-3xl font-bold mt-2">{stats.completedConsultations}</h3>
            </div>
            <div className="bg-secondary-50 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-secondary-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <span className="flex items-center text-success-500 text-sm">
              <TrendingUp className="h-3 w-3 mr-1" />
              12%
            </span>
            <span className="text-neutral-500 text-sm ml-2">increase</span>
          </div>
        </div>
      </div>
      
      {/* Active Queues Table */}
      <div className="bg-white rounded-lg shadow-sm mb-8">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Active Queues</h2>
            <Link to="/hospital-dashboard/queues">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>
        </div>
        <div className="p-0 overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 text-sm text-neutral-500">
              <tr>
                <th className="px-6 py-3 text-left font-medium">Doctor</th>
                <th className="px-6 py-3 text-left font-medium">Specialty</th>
                <th className="px-6 py-3 text-left font-medium">Patients</th>
                <th className="px-6 py-3 text-left font-medium">Avg. Wait</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
                <th className="px-6 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {activeQueues.map((queue) => (
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
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link to={`/hospital-dashboard/queues/${queue.id}`} className="text-primary-500 hover:text-primary-600">
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Alerts and QR section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Alerts */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Recent Alerts</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`p-4 rounded-lg flex items-start ${
                    alert.type === 'warning' ? 'bg-warning-400/10' :
                    alert.type === 'success' ? 'bg-success-400/10' : 'bg-primary-400/10'
                  }`}
                >
                  {alert.type === 'warning' ? (
                    <AlertCircle className="h-5 w-5 text-warning-500 mr-3 flex-shrink-0" />
                  ) : alert.type === 'success' ? (
                    <CheckCircle className="h-5 w-5 text-success-500 mr-3 flex-shrink-0" />
                  ) : (
                    <Clock className="h-5 w-5 text-primary-500 mr-3 flex-shrink-0" />
                  )}
                  <div>
                    <p className={`font-medium ${
                      alert.type === 'warning' ? 'text-warning-500' :
                      alert.type === 'success' ? 'text-success-500' : 'text-primary-500'
                    }`}>
                      {alert.message}
                    </p>
                    <p className="text-neutral-500 text-sm mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Quick QR Code Access */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Quick Access</h2>
          </div>
          <div className="p-6 flex flex-col items-center">
            <p className="text-neutral-600 text-center mb-4">
              Generate new QR codes for doctors or create a new queue.
            </p>
            <div className="grid grid-cols-2 gap-4 w-full">
              <Link to="/hospital-dashboard/doctors/new">
                <Button variant="primary" fullWidth>
                  <Users className="h-4 w-4 mr-2" />
                  New Doctor
                </Button>
              </Link>
              <Link to="/hospital-dashboard/queues/new">
                <Button variant="outline" fullWidth>
                  <Clock className="h-4 w-4 mr-2" />
                  New Queue
                </Button>
              </Link>
            </div>
            <div className="mt-5 p-4 bg-neutral-50 rounded-lg w-full">
              <h3 className="font-medium text-center mb-3">Download QR Codes</h3>
              <Button variant="ghost" fullWidth className="border border-neutral-200">
                <Download className="h-4 w-4 mr-2" />
                Download All
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalOverview;