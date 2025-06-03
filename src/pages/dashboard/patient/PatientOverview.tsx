import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, QrCode, Stethoscope, ChevronRight, AlertTriangle, X } from 'lucide-react';
import Button from '../../../components/common/Button';
import { useAuth } from '../../../context/AuthContext';

interface Queue {
  id: string;
  doctor: string;
  specialty: string;
  position: number;
  estimatedTime: number;
  waitingTime: number;
  status: 'waiting' | 'next' | 'completed' | 'cancelled';
}

const PatientOverview: React.FC = () => {
  const { currentUser } = useAuth();
  
  // Mock data
  const [activeQueue, setActiveQueue] = React.useState<Queue | null>({
    id: '1',
    doctor: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    position: 3,
    estimatedTime: 15,
    waitingTime: 12,
    status: 'waiting'
  });
  
  const recentQueues = [
    {
      id: '2',
      doctor: 'Dr. Michael Chen',
      specialty: 'Pediatrics',
      date: '2023-05-10',
      status: 'completed'
    },
    {
      id: '3',
      doctor: 'Dr. Emily Rodriguez',
      specialty: 'Dermatology',
      date: '2023-04-22',
      status: 'completed'
    },
    {
      id: '4',
      doctor: 'Dr. David Kim',
      specialty: 'Orthopedics',
      date: '2023-04-15',
      status: 'cancelled'
    }
  ];
  
  const leaveQueue = () => {
    // In a real app, you would call an API to leave the queue
    setActiveQueue(null);
  };
  
  return (
    <div>
      {/* Active Queue Section */}
      {activeQueue ? (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold">Current Queue</h2>
            {activeQueue.status === 'waiting' && (
              <button 
                onClick={leaveQueue} 
                className="text-error-500 hover:text-error-600 text-sm font-medium flex items-center"
              >
                <X className="h-4 w-4 mr-1" />
                Leave Queue
              </button>
            )}
          </div>
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="md:w-2/3">
                <div className="flex items-start mb-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Stethoscope className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-1">{activeQueue.doctor}</h3>
                    <p className="text-neutral-500">{activeQueue.specialty}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <p className="text-sm text-neutral-500 mb-1">Position in Queue</p>
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-primary-500 mr-2" />
                      <span className="text-lg font-medium">
                        {activeQueue.position === 1 ? 'Next' : `#${activeQueue.position}`}
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <p className="text-sm text-neutral-500 mb-1">Estimated Wait</p>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-primary-500 mr-2" />
                      <span className="text-lg font-medium">{activeQueue.estimatedTime} min</span>
                    </div>
                  </div>
                  
                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <p className="text-sm text-neutral-500 mb-1">Waiting Time</p>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-primary-500 mr-2" />
                      <span className="text-lg font-medium">{activeQueue.waitingTime} min</span>
                    </div>
                  </div>
                </div>
                
                {activeQueue.status === 'next' && (
                  <div className="bg-primary-50 border border-primary-200 p-4 rounded-lg mb-6 flex items-center">
                    <AlertTriangle className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0" />
                    <p className="text-primary-700">
                      <span className="font-medium">You're next!</span> Please proceed to the doctor's room.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="md:w-1/3 flex justify-center items-center mt-6 md:mt-0">
                <div className="text-center">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full border-8 border-primary-100 flex items-center justify-center">
                      <div className="text-5xl font-semibold text-primary-600">{activeQueue.position}</div>
                    </div>
                    <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-2 border border-neutral-200">
                      <div className="bg-green-500 h-6 w-6 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <p className="mt-6 text-neutral-500">Your position in queue</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Current Queue</h2>
          </div>
          <div className="p-12 flex flex-col items-center justify-center">
            <div className="bg-neutral-100 p-4 rounded-full mb-4">
              <QrCode className="h-12 w-12 text-neutral-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">You're not in any queue</h3>
            <p className="text-neutral-500 mb-6 text-center max-w-md">
              Scan a doctor's QR code to join their queue and complete the pre-appointment questionnaire.
            </p>
            <Link to="scanner">
              <Button variant="primary">
                <QrCode className="h-4 w-4 mr-2" />
                Scan QR Code
              </Button>
            </Link>
          </div>
        </div>
      )}
      
      {/* Recent Queues Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Recent Visits</h2>
        </div>
        {recentQueues.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 text-sm text-neutral-500">
                <tr>
                  <th className="px-6 py-3 text-left font-medium">Doctor</th>
                  <th className="px-6 py-3 text-left font-medium">Specialty</th>
                  <th className="px-6 py-3 text-left font-medium">Date</th>
                  <th className="px-6 py-3 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {recentQueues.map((queue) => (
                  <tr key={queue.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-neutral-800">{queue.doctor}</div>
                    </td>
                    <td className="px-6 py-4 text-neutral-600">{queue.specialty}</td>
                    <td className="px-6 py-4 text-neutral-600">{queue.date}</td>
                    <td className="px-6 py-4">
                      <span 
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          queue.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-neutral-100 text-neutral-800'
                        }`}
                      >
                        {queue.status === 'completed' ? 'Completed' : 'Cancelled'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 flex flex-col items-center justify-center">
            <Clock className="h-12 w-12 text-neutral-300 mb-4" />
            <h3 className="text-lg font-medium text-neutral-700 mb-1">No recent visits</h3>
            <p className="text-neutral-500">You don't have any recent visits yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientOverview;