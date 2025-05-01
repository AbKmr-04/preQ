import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Save, Bell, Lock, Shield } from 'lucide-react';
import Button from '../../../components/common/Button';
import { useAuth } from '../../../context/AuthContext';

const PatientSettings: React.FC = () => {
  const { currentUser } = useAuth();
  
  // Mock patient data
  const [patientData, setPatientData] = useState({
    name: currentUser?.name || 'John Doe',
    email: currentUser?.email || 'john.doe@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Anytown, AT 12345',
    dateOfBirth: '1985-06-15',
    emergencyContact: 'Jane Doe: (555) 987-6543',
    profileComplete: 75
  });
  
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    name: patientData.name,
    email: patientData.email,
    phone: patientData.phone,
    address: patientData.address,
    dateOfBirth: patientData.dateOfBirth,
    emergencyContact: patientData.emergencyContact
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
    setPatientData({
      ...patientData,
      ...formData
    });
    setIsEditing(false);
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Patient Settings</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Patient Profile</h2>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-center mb-6">
                <div className="h-24 w-24 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-3xl font-semibold">
                  {patientData.name.charAt(0)}
                </div>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-medium">{patientData.name}</h3>
                <p className="text-neutral-500">{patientData.email}</p>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-1">
                  <span>Profile Completion</span>
                  <span>{patientData.profileComplete}%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2.5">
                  <div 
                    className="bg-primary-400 h-2.5 rounded-full" 
                    style={{ width: `${patientData.profileComplete}%` }}
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
          
          {/* Notification Settings */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Notification Settings</h2>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                <li className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Bell className="h-5 w-5 text-neutral-400 mr-3" />
                    <span>Queue Updates</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                  </label>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Bell className="h-5 w-5 text-neutral-400 mr-3" />
                    <span>Email Notifications</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                  </label>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Bell className="h-5 w-5 text-neutral-400 mr-3" />
                    <span>Appointment Reminders</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Main Settings Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Personal Information</h2>
            </div>
            <div className="p-6">
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-neutral-400" />
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
                      <label htmlFor="dateOfBirth" className="block text-sm font-medium text-neutral-700 mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        className="input-field"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-2">
                        Home Address
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
                    
                    <div className="md:col-span-2">
                      <label htmlFor="emergencyContact" className="block text-sm font-medium text-neutral-700 mb-2">
                        Emergency Contact
                      </label>
                      <input
                        type="text"
                        id="emergencyContact"
                        name="emergencyContact"
                        className="input-field"
                        value={formData.emergencyContact}
                        onChange={handleInputChange}
                        placeholder="Name: Phone Number"
                        required
                      />
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-neutral-500 mb-1">Full Name</h3>
                      <div className="flex items-center">
                        <User className="h-5 w-5 text-neutral-400 mr-2" />
                        <p className="text-neutral-800">{patientData.name}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-neutral-500 mb-1">Email Address</h3>
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-neutral-400 mr-2" />
                        <p className="text-neutral-800">{patientData.email}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-neutral-500 mb-1">Phone Number</h3>
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-neutral-400 mr-2" />
                        <p className="text-neutral-800">{patientData.phone}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-neutral-500 mb-1">Date of Birth</h3>
                      <p className="text-neutral-800">{patientData.dateOfBirth}</p>
                    </div>
                    
                    <div className="md:col-span-2">
                      <h3 className="text-sm font-medium text-neutral-500 mb-1">Home Address</h3>
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-neutral-400 mr-2" />
                        <p className="text-neutral-800">{patientData.address}</p>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <h3 className="text-sm font-medium text-neutral-500 mb-1">Emergency Contact</h3>
                      <p className="text-neutral-800">{patientData.emergencyContact}</p>
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
          
          {/* Security Section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Security</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-start">
                    <Lock className="h-5 w-5 text-neutral-400 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Password</h3>
                      <p className="text-neutral-500 text-sm">Last changed 3 months ago</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Change
                  </Button>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-neutral-400 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <p className="text-neutral-500 text-sm">Add an extra layer of security</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Enable
                  </Button>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-neutral-400 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Privacy Settings</h3>
                      <p className="text-neutral-500 text-sm">Manage your data sharing preferences</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSettings;