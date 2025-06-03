import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Building, Mail, Phone, MapPin, Save, UserPlus } from 'lucide-react';
import Button from '../../../components/common/Button';
import { useAuth } from '../../../context/AuthContext';

const HospitalSettings: React.FC = () => {
  const { currentUser } = useAuth();
  
  // Mock hospital data
  const [hospitalData, setHospitalData] = useState({
    name: currentUser?.name || 'City General Hospital',
    email: currentUser?.email || 'admin@citygeneralhospital.com',
    phone: '(555) 123-4567',
    address: '123 Medical Center Dr, Healthcare City, HC 12345',
    profileComplete: 85
  });
  
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    name: hospitalData.name,
    email: hospitalData.email,
    phone: hospitalData.phone,
    address: hospitalData.address
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHospitalData({
      ...hospitalData,
      ...formData
    });
    setIsEditing(false);
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Hospital Settings</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Hospital Profile</h2>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-center mb-6">
                <div className="h-24 w-24 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-3xl font-semibold">
                  {hospitalData.name.charAt(0)}
                </div>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-medium">{hospitalData.name}</h3>
                <p className="text-neutral-500">{hospitalData.email}</p>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-1">
                  <span>Profile Completion</span>
                  <span>{hospitalData.profileComplete}%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2.5">
                  <div 
                    className="bg-primary-400 h-2.5 rounded-full" 
                    style={{ width: `${hospitalData.profileComplete}%` }}
                  ></div>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                fullWidth
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            </div>
          </div>
          
          {/* Quick Access */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Quick Access</h2>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                <li>
                  <Link to="../doctors/new" className="flex items-center text-neutral-700 hover:text-primary-500 transition-colors">
                    <UserPlus className="h-5 w-5 mr-3" />
                    <span>Add New Doctor</span>
                  </Link>
                </li>
                <li>
                  <Link to="../queues/new" className="flex items-center text-neutral-700 hover:text-primary-500 transition-colors">
                    <User className="h-5 w-5 mr-3" />
                    <span>Create New Queue</span>
                  </Link>
                </li>
                <li>
                  <a href="#" className="flex items-center text-neutral-700 hover:text-primary-500 transition-colors">
                    <Building className="h-5 w-5 mr-3" />
                    <span>Manage Departments</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Main Settings Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Hospital Information</h2>
            </div>
            <div className="p-6">
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                        Hospital Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Building className="h-5 w-5 text-neutral-400" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="input-field pl-10"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-neutral-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="input-field pl-10"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-neutral-400" />
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className="input-field pl-10"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-2">
                        Hospital Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin className="h-5 w-5 text-neutral-400" />
                        </div>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          className="input-field pl-10"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-4 mt-8">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-500 mb-1">Hospital Name</h3>
                    <div className="flex items-center">
                      <Building className="h-5 w-5 text-neutral-400 mr-2" />
                      <p className="text-neutral-800">{hospitalData.name}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-neutral-500 mb-1">Email Address</h3>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-neutral-400 mr-2" />
                      <p className="text-neutral-800">{hospitalData.email}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-neutral-500 mb-1">Phone Number</h3>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-neutral-400 mr-2" />
                      <p className="text-neutral-800">{hospitalData.phone}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-neutral-500 mb-1">Hospital Address</h3>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-neutral-400 mr-2" />
                      <p className="text-neutral-800">{hospitalData.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Information
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Additional Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold">Notification Settings</h2>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-center justify-between">
                    <span>Email Notifications</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Doctor Activity Alerts</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Long Wait Time Alerts</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold">System Settings</h2>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-center justify-between">
                    <span>AI Questionnaire</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Auto-Optimize Queues</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Patient Feedback</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalSettings;