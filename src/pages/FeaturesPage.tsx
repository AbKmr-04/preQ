import React from 'react';
import Layout from '../components/layout/Layout';

const FeaturesPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Our Features</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Queue Management */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Smart Queue Management</h3>
            <p className="text-gray-600">
              Efficiently manage patient queues with our intelligent system that optimizes wait times and improves patient flow.
            </p>
          </div>

          {/* Real-time Updates */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Real-time Updates</h3>
            <p className="text-gray-600">
              Stay informed with instant notifications about queue status, estimated wait times, and important announcements.
            </p>
          </div>

          {/* Digital Health Records */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Digital Health Records</h3>
            <p className="text-gray-600">
              Access and manage patient health records securely through our encrypted digital platform.
            </p>
          </div>

          {/* Multi-role Access */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Multi-role Access</h3>
            <p className="text-gray-600">
              Specialized interfaces for hospitals, doctors, and patients ensuring everyone has the right tools at their fingertips.
            </p>
          </div>

          {/* QR Code Integration */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">QR Code Integration</h3>
            <p className="text-gray-600">
              Seamless check-ins and queue management through our innovative QR code system.
            </p>
          </div>

          {/* Analytics Dashboard */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Analytics Dashboard</h3>
            <p className="text-gray-600">
              Comprehensive analytics and reporting tools to help hospitals optimize their operations and improve patient care.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FeaturesPage;