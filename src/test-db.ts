import { addDoctor } from './services/database';

// Test function to add a sample doctor
async function addTestDoctor() {
  try {
    await addDoctor('doc123', {
      name: "Dr. A. Sharma",
      specialization: "Orthopedic",
      hospitalId: "hosp123",
      available: true
    });
    console.log('Test doctor added successfully!');
  } catch (error) {
    console.error('Error adding test doctor:', error);
  }
}

// Run the test
addTestDoctor(); 