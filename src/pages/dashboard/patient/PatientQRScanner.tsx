import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { QrCode, Camera, AlertTriangle } from 'lucide-react';
import Button from '../../../components/common/Button';

const PatientQRScanner: React.FC = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState('');
  
  // In a real app, this would connect to the device camera
  const startScanner = () => {
    setIsScanning(true);
    setScanError('');
    
    // Simulate scanning delay
    setTimeout(() => {
      // Simulate successful scan
      // In a real app, this would process the QR code data
      const queueId = '123';
      navigate(`/patient-dashboard/questionnaire/${queueId}`);
    }, 2000);
  };
  
  const simulateError = () => {
    setIsScanning(false);
    setScanError('Could not read QR code. Please try again.');
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Scan QR Code</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Join a Doctor's Queue</h2>
        </div>
        <div className="p-6">
          <div className="flex flex-col items-center justify-center">
            {!isScanning ? (
              <div className="text-center max-w-md mx-auto">
                <div className="bg-neutral-100 p-8 rounded-full mb-6 mx-auto w-32 h-32 flex items-center justify-center">
                  <QrCode className="h-16 w-16 text-neutral-400" />
                </div>
                <h3 className="text-xl font-medium mb-4">Scan Doctor's QR Code</h3>
                <p className="text-neutral-600 mb-6">
                  Point your camera at the doctor's QR code to join their queue and complete the pre-appointment questionnaire.
                </p>
                
                {scanError && (
                  <div className="bg-error-400/10 text-error-500 p-4 rounded-lg mb-6 flex items-start">
                    <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <p>{scanError}</p>
                  </div>
                )}
                
                <Button variant="primary" className="mb-4" onClick={startScanner}>
                  <Camera className="h-4 w-4 mr-2" />
                  Scan QR Code
                </Button>
                
                <Button variant="ghost" className="text-neutral-500" onClick={simulateError}>
                  Simulate Error
                </Button>
              </div>
            ) : (
              <div className="text-center w-full max-w-md mx-auto">
                <div className="relative w-full aspect-square max-w-sm mx-auto mb-6 bg-neutral-900 rounded-lg overflow-hidden">
                  {/* This would be a camera viewport in a real app */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border-2 border-primary-400 rounded-lg relative">
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary-400"></div>
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary-400"></div>
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary-400"></div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary-400"></div>
                    </div>
                  </div>
                  
                  {/* Scanner animation */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-primary-400 animate-scan"></div>
                </div>
                
                <h3 className="text-xl font-medium mb-2">Scanning...</h3>
                <p className="text-neutral-600 mb-6">
                  Position the QR code within the frame
                </p>
                
                <Button variant="outline" onClick={() => setIsScanning(false)}>
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Instructions Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-8">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">How to Join a Queue</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-neutral-50 p-6 rounded-lg">
              <div className="bg-primary-100 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary-600 font-bold">1</span>
              </div>
              <h3 className="font-medium mb-2">Find Your Doctor</h3>
              <p className="text-neutral-600">
                Locate your doctor's QR code at the reception or waiting area.
              </p>
            </div>
            
            <div className="bg-neutral-50 p-6 rounded-lg">
              <div className="bg-primary-100 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary-600 font-bold">2</span>
              </div>
              <h3 className="font-medium mb-2">Scan the QR Code</h3>
              <p className="text-neutral-600">
                Use the scanner above to scan your doctor's unique QR code.
              </p>
            </div>
            
            <div className="bg-neutral-50 p-6 rounded-lg">
              <div className="bg-primary-100 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary-600 font-bold">3</span>
              </div>
              <h3 className="font-medium mb-2">Complete Questionnaire</h3>
              <p className="text-neutral-600">
                Answer a few questions to help your doctor prepare for your visit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientQRScanner;