import AddDoctorForm from '../components/doctor/AddDoctorForm';
import AddPatientForm from '../components/patient/AddPatientForm';

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <AddDoctorForm />
        </div>
        <div>
          <AddPatientForm />
        </div>
      </div>
    </div>
  );
} 