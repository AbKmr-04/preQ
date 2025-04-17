const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
require('dotenv').config();

const initializeDb = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hospital-queue');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});

    // Create test users
    const testUsers = [
      {
        email: 'doctor@test.com',
        password: await bcrypt.hash('password123', 10),
        firstName: 'John',
        lastName: 'Smith',
        role: 'doctor',
        roomNumber: '101',
        specialization: 'General Medicine'
      },
      {
        email: 'helpdesk@test.com',
        password: await bcrypt.hash('password123', 10),
        firstName: 'Sarah',
        lastName: 'Johnson',
        role: 'helpdesk'
      },
      {
        email: 'patient@test.com',
        password: await bcrypt.hash('password123', 10),
        firstName: 'Michael',
        lastName: 'Brown',
        role: 'patient',
        dateOfBirth: new Date('1990-01-01')
      }
    ];

    // Insert test users
    await User.insertMany(testUsers);
    console.log('Test users created successfully');

    // Log test credentials
    console.log('\nTest Credentials:');
    console.log('Doctor - Email: doctor@test.com, Password: password123');
    console.log('Help Desk - Email: helpdesk@test.com, Password: password123');
    console.log('Patient - Email: patient@test.com, Password: password123');

  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the initialization
initializeDb(); 