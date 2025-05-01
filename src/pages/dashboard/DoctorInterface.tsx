import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, User, CheckCircle, Heart, ArrowRight, Activity } from 'lucide-react';
import Logo from '../../components/common/Logo';

interface PatientData {
  id: string;
  name: string;
  age: number;
  visitReason: string;
  symptoms: string[];
  waitTime: number;
  questionnaireData: {
    painLevel: number;
    symptomDuration: string;
    additionalInfo: string;
  };
}

const DoctorInterface: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock current patient data
  const [currentPatient, setCurrentPatient] = useState<PatientData | null>({
    id: '123',
    name: 'Sarah Johnson',
    age: 42,
    visitReason: 'Chest pain and shortness of breath',
    symptoms: ['Chest pain', 'Shortness of breath', 'Fatigue'],
    waitTime: 22,
    questionnaireData: {
      painLevel: 7,
      symptomDuration: '4-7 days',
      additionalInfo: 'Pain is worse when lying down and in the mornings. Taking over-the-counter pain medication with limited relief.'
    }
  });
  
  const [nextPatient, setNextPatient] = useState({
    name: 'Michael Brown',
    waitTime: 15
  });
  
  const [queueLength, setQueueLength] = useState(8);
  
  // In a real app, this would fetch data from an API
  useEffect(() => {
    // Simulate API call to get queue information
    // For demo purposes, we'll use the current data
  }, [id]);
  
  const completeConsultation = () => {
    // In a real app, this would update the queue in the backend
    setCurrentPatient(null);
    
    // Simulate loading the next patient after a short delay
    setTimeout(() => {
      setCurrentPatient({
        id: '124',
        name: 'Michael Brown',
        age: 35,
        visitReason: 'Persistent headache and dizziness',
        symptoms: ['Headache', 'Dizziness', 'Nausea'],
        waitTime: 15,
        questionnaireData: {
          painLevel: 6,
          symptomDuration: '1-2 weeks',
          additionalInfo: 'Headaches are more intense in the morning and when standing up quickly. Some visual disturbances occasionally.'
        }
      });
      
      setNextPatient({
        name: 'Emma Wilson',
        waitTime: 18
      });
      
      setQueueLength(7);
    }, 3000);
  };
  
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6 mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Logo />
            <span className="ml-2 text-xl font-inter font-semibold">PreQ</span>
          </div>
          <div className="flex items-center">
            <div className="bg-neutral-100 px-4 py-2 rounded-full flex items-center">
              <Clock className="h-5 w-5 text-neutral-500 mr-2" />
              <span className="text-neutral-700 font-medium">
                Queue: {queueLength} patients
              </span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 mb-12">
        {currentPatient ? (
          <div>
            {/* Current Patient */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="p-6 border-b bg-primary-50">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold text-xl">
                      {currentPatient.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h2 className="text-xl font-bold">{currentPatient.name}</h2>
                      <p className="text-neutral-600">Age: {currentPatient.age}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-white px-4 py-2 rounded-full border border-neutral-200 flex items-center">
                      <Clock className="h-5 w-5 text-primary-500 mr-2" />
                      <span className="text-neutral-700">
                        Waiting: {currentPatient.waitTime} min
                      </span>
                    </div>
                    <button 
                      onClick={completeConsultation}
                      className="ml-4 bg-primary-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-primary-600 transition-colors"
                    >
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Complete
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Patient Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <h4 className="font-medium text-neutral-700 flex items-center mb-2">
                      <Activity className="h-5 w-5 text-primary-500 mr-2" />
                      Reason for Visit
                    </h4>
                    <p className="text-neutral-800">{currentPatient.visitReason}</p>
                  </div>
                  
                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <h4 className="font-medium text-neutral-700 flex items-center mb-2">
                      <Clock className="h-5 w-5 text-primary-500 mr-2" />
                      Symptom Duration
                    </h4>
                    <p className="text-neutral-800">{currentPatient.questionnaireData.symptomDuration}</p>
                  </div>
                  
                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <h4 className="font-medium text-neutral-700 flex items-center mb-2">
                      <Heart className="h-5 w-5 text-primary-500 mr-2" />
                      Pain Level
                    </h4>
                    <div className="flex items-center">
                      <div className="w-full bg-neutral-200 rounded-full h-2.5 mr-2">
                        <div 
                          className={`h-2.5 rounded-full ${
                            currentPatient.questionnaireData.painLevel > 7 
                              ? 'bg-error-500' 
                              : currentPatient.questionnaireData.painLevel > 3 
                                ? 'bg-warning-400' 
                                : 'bg-success-400'
                          }`}
                          style={{ width: `${(currentPatient.questionnaireData.painLevel / 10) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-lg font-medium">{currentPatient.questionnaireData.painLevel}/10</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-neutral-700 mb-2">Reported Symptoms</h4>
                    <ul className="space-y-2">
                      {currentPatient.symptoms.map((symptom, index) => (
                        <li key={index} className="flex items-center">
                          <span className="h-2 w-2 bg-primary-500 rounded-full mr-2"></span>
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-neutral-700 mb-2">Additional Information</h4>
                    <p className="text-neutral-700">
                      {currentPatient.questionnaireData.additionalInfo}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Next Patient Preview */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">Next Patient</h3>
              </div>
              <div className="p-6 flex justify-between items-center">
                <div className="flex items-center">
                  <User className="h-8 w-8 text-neutral-400 bg-neutral-100 p-1 rounded-full" />
                  <div className="ml-3">
                    <h4 className="font-medium">{nextPatient.name}</h4>
                    <p className="text-neutral-500 text-sm">Waiting: {nextPatient.waitTime} min</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-neutral-400" />
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-6"></div>
            <h2 className="text-2xl font-semibold mb-2">Loading next patient...</h2>
            <p className="text-neutral-600">
              The next patient's information will appear here shortly.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default DoctorInterface;