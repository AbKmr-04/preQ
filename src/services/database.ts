import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  Timestamp,
  CollectionReference,
  DocumentReference,
  addDoc,
  updateDoc,
  increment
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Updated Type definitions
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'staff' | 'patient' | 'doctor' | 'hospital';
  createdAt: Timestamp;
  hospitalId?: string; // For staff members
  // Patient-specific fields
  age?: number;
  gender?: string;
  phone?: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: string;
  phone: string;
  createdAt: Timestamp;
  status: 'active' | 'inactive';
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  createdAt: Timestamp;
  createdBy: string; // staffId
  staffCount: number;
  doctorCount: number;
  status: 'active' | 'inactive';
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  hospitalId: string;
  role: 'admin' | 'staff';
  createdAt: Timestamp;
  status: 'active' | 'inactive';
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  email: string;
  phone: string;
  isAvailable: boolean;
  addedBy: string; // staffId
  addedAt: Timestamp;
  status: 'active' | 'inactive';
}

export interface Queue {
  id: string; // Format: YYYY-MM-DD (date-based)
  date: string;
  currentNumber: number;
  totalPatients: number;
  status: 'active' | 'completed' | 'paused';
  createdAt: Timestamp;
  lastUpdated: Timestamp;
}

export interface QueueEntry {
  id: string;
  patientId: string;
  patientName: string;
  number: number;
  status: 'waiting' | 'in-progress' | 'completed' | 'no-show';
  joinedAt: Timestamp;
  completedAt?: Timestamp;
  questionnaireCompleted: boolean;
  summaryMapId?: string;
}

export interface QuestionnaireResponse {
  patientId: string;
  appointmentId: string;
  responses: Record<string, string>;
  summaryMap: string;
  createdAt: Timestamp;
}

export interface Appointment {
  doctorId: string;
  date: string;
  patientsSeen: number;
}

// Collection references
const usersRef = collection(db, 'users');
const hospitalsRef = collection(db, 'hospitals');
const staffRef = collection(db, 'staff');
const doctorsRef = collection(db, 'doctors');
const queuesRef = collection(db, 'queues');
const queueEntriesRef = collection(db, 'queueEntries');
const patientsRef = collection(db, 'patients');
const responsesRef = collection(db, 'responses');
const appointmentsRef = collection(db, 'appointments');

// Helper functions to get nested collections
const getDoctorsRef = (hospitalId: string) => collection(db, 'hospitals', hospitalId, 'doctors');
const getQueuesRef = (hospitalId: string, doctorId: string) => collection(db, 'hospitals', hospitalId, 'doctors', doctorId, 'queues');
const getQueueEntriesRef = (hospitalId: string, doctorId: string, queueId: string) => 
  collection(db, 'hospitals', hospitalId, 'doctors', doctorId, 'queues', queueId, 'entries');

// User operations
export const createUser = async (userId: string, userData: Omit<User, 'id' | 'createdAt'>) => {
  await setDoc(doc(usersRef, userId), {
    ...userData,
    id: userId,
    createdAt: Timestamp.now()
  });
};

export const getUser = async (userId: string) => {
  const docRef = doc(usersRef, userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() as User : null;
};

export const updateUserHospital = async (userId: string, hospitalId: string) => {
  const docRef = doc(usersRef, userId);
  await updateDoc(docRef, { hospitalId });
};

// Hospital operations
export const createHospital = async (hospitalData: Omit<Hospital, 'id' | 'createdAt' | 'staffCount' | 'doctorCount' | 'status'>) => {
  const docRef = await addDoc(hospitalsRef, {
    ...hospitalData,
    createdAt: Timestamp.now(),
    staffCount: 1, // Creator is first staff
    doctorCount: 0,
    status: 'active'
  });
  return docRef.id;
};

export const getHospital = async (hospitalId: string) => {
  const docRef = doc(hospitalsRef, hospitalId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Hospital : null;
};

export const getHospitals = async () => {
  const querySnapshot = await getDocs(hospitalsRef);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Hospital));
};

export const joinHospital = async (hospitalId: string) => {
  const docRef = doc(hospitalsRef, hospitalId);
  await updateDoc(docRef, {
    staffCount: increment(1)
  });
};

// Staff operations
export const createStaff = async (staffData: Omit<Staff, 'id' | 'createdAt' | 'status'>) => {
  const docRef = await addDoc(staffRef, {
    ...staffData,
    createdAt: Timestamp.now(),
    status: 'active'
  });
  return docRef.id;
};

export const getStaff = async (staffId: string) => {
  const docRef = doc(staffRef, staffId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Staff : null;
};

export const getHospitalStaff = async (hospitalId: string) => {
  const q = query(staffRef, where('hospitalId', '==', hospitalId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Staff));
};

// Doctor operations (nested under hospital)
export const addDoctor = async (hospitalId: string, doctorData: Omit<Doctor, 'id' | 'addedAt' | 'status'>) => {
  const doctorsRef = getDoctorsRef(hospitalId);
  const docRef = await addDoc(doctorsRef, {
    ...doctorData,
    addedAt: Timestamp.now(),
    status: 'active',
    isAvailable: true
  });

  // Update hospital doctor count
  const hospitalRef = doc(hospitalsRef, hospitalId);
  await updateDoc(hospitalRef, {
    doctorCount: increment(1)
  });

  return docRef.id;
};

export const getHospitalDoctors = async (hospitalId: string) => {
  const doctorsRef = getDoctorsRef(hospitalId);
  const querySnapshot = await getDocs(doctorsRef);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Doctor));
};

export const updateDoctorAvailability = async (hospitalId: string, doctorId: string, isAvailable: boolean) => {
  const doctorsRef = getDoctorsRef(hospitalId);
  const docRef = doc(doctorsRef, doctorId);
  await updateDoc(docRef, { isAvailable });
};

export const getDoctor = async (hospitalId: string, doctorId: string) => {
  const doctorsRef = getDoctorsRef(hospitalId);
  const docRef = doc(doctorsRef, doctorId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Doctor : null;
};

// Queue operations (nested under doctor)
export const getTodaysQueue = async (hospitalId: string, doctorId: string): Promise<Queue | null> => {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  const queuesRef = getQueuesRef(hospitalId, doctorId);
  const docRef = doc(queuesRef, today);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Queue : null;
};

export const createTodaysQueue = async (hospitalId: string, doctorId: string): Promise<string> => {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  const queuesRef = getQueuesRef(hospitalId, doctorId);
  
  const queueData: Omit<Queue, 'id'> = {
    date: today,
    currentNumber: 0,
    totalPatients: 0,
    status: 'active',
    createdAt: Timestamp.now(),
    lastUpdated: Timestamp.now()
  };

  await setDoc(doc(queuesRef, today), queueData);
  return today;
};

export const addToQueue = async (hospitalId: string, doctorId: string, patientId: string, patientName: string): Promise<string> => {
  // Get or create today's queue
  let queue = await getTodaysQueue(hospitalId, doctorId);
  if (!queue) {
    await createTodaysQueue(hospitalId, doctorId);
    queue = await getTodaysQueue(hospitalId, doctorId);
  }

  if (!queue) throw new Error('Failed to create queue');

  const nextNumber = queue.currentNumber + 1;
  const queueEntriesRef = getQueueEntriesRef(hospitalId, doctorId, queue.id);
  
  // Add queue entry
  const entryData: Omit<QueueEntry, 'id'> = {
    patientId,
    patientName,
    number: nextNumber,
    status: 'waiting',
    joinedAt: Timestamp.now(),
    questionnaireCompleted: false
  };

  const entryRef = await addDoc(queueEntriesRef, entryData);

  // Update queue
  const queuesRef = getQueuesRef(hospitalId, doctorId);
  const queueRef = doc(queuesRef, queue.id);
  await updateDoc(queueRef, {
    currentNumber: nextNumber,
    totalPatients: increment(1),
    lastUpdated: Timestamp.now()
  });

  return entryRef.id;
};

export const getQueueEntries = async (hospitalId: string, doctorId: string, queueId?: string): Promise<QueueEntry[]> => {
  const actualQueueId = queueId || new Date().toISOString().split('T')[0];
  const queueEntriesRef = getQueueEntriesRef(hospitalId, doctorId, actualQueueId);
  const querySnapshot = await getDocs(queueEntriesRef);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as QueueEntry));
};

export const updateQueueEntryStatus = async (
  hospitalId: string, 
  doctorId: string, 
  queueId: string, 
  entryId: string, 
  status: QueueEntry['status']
) => {
  const queueEntriesRef = getQueueEntriesRef(hospitalId, doctorId, queueId);
  const docRef = doc(queueEntriesRef, entryId);
  const updateData: any = { status };
  
  if (status === 'completed') {
    updateData.completedAt = Timestamp.now();
  }
  
  await updateDoc(docRef, updateData);
};

// Questionnaire operations
export const saveQuestionnaireResponse = async (
  patientId: string, 
  appointmentId: string, 
  responseData: Omit<QuestionnaireResponse, 'patientId' | 'appointmentId' | 'createdAt'>
) => {
  const docId = `${patientId}_${appointmentId}`;
  await setDoc(doc(responsesRef, docId), {
    ...responseData,
    patientId,
    appointmentId,
    createdAt: Timestamp.now()
  });
};

export const getQuestionnaireResponse = async (patientId: string, appointmentId: string) => {
  const docRef = doc(responsesRef, `${patientId}_${appointmentId}`);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() as QuestionnaireResponse : null;
};

// Appointment operations
export const createAppointment = async (doctorId: string, date: string) => {
  const docId = `${doctorId}_${date}`;
  await setDoc(doc(appointmentsRef, docId), {
    doctorId,
    date,
    patientsSeen: 0
  });
};

export const updatePatientsSeen = async (doctorId: string, date: string, increment: number = 1) => {
  const docRef = doc(appointmentsRef, `${doctorId}_${date}`);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const currentData = docSnap.data() as Appointment;
    await setDoc(docRef, {
      ...currentData,
      patientsSeen: currentData.patientsSeen + increment
    });
  }
};

// Patient operations
export const addPatient = async (patientId: string, patientData: Omit<Patient, 'id' | 'createdAt' | 'status'>) => {
  const patientsRef = collection(db, 'patients');
  await setDoc(doc(patientsRef, patientId), {
    ...patientData,
    id: patientId,
    createdAt: Timestamp.now(),
    status: 'active'
  });
};

export const getPatient = async (patientId: string) => {
  const patientsRef = collection(db, 'patients');
  const docRef = doc(patientsRef, patientId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Patient : null;
};

// Helper function to get all queues a patient is in
export const getPatientQueues = async (patientId: string): Promise<Array<{
  hospitalId: string;
  hospitalName: string;
  doctorId: string;
  doctorName: string;
  queueId: string;
  entry: QueueEntry;
}>> => {
  const results: Array<{
    hospitalId: string;
    hospitalName: string;
    doctorId: string;
    doctorName: string;
    queueId: string;
    entry: QueueEntry;
  }> = [];

  // Get all hospitals
  const hospitals = await getHospitals();
  
  for (const hospital of hospitals) {
    // Get all doctors in this hospital
    const doctors = await getHospitalDoctors(hospital.id);
    
    for (const doctor of doctors) {
      // Check today's queue for this patient
      const today = new Date().toISOString().split('T')[0];
      const entries = await getQueueEntries(hospital.id, doctor.id, today);
      
      const patientEntry = entries.find(entry => entry.patientId === patientId);
      if (patientEntry) {
        results.push({
          hospitalId: hospital.id,
          hospitalName: hospital.name,
          doctorId: doctor.id,
          doctorName: doctor.name,
          queueId: today,
          entry: patientEntry
        });
      }
    }
  }

  return results;
};

// Get all doctors from all hospitals for patient browsing
export const getAllDoctors = async (): Promise<Array<Doctor & { hospitalId: string; hospitalName: string }>> => {
  const results: Array<Doctor & { hospitalId: string; hospitalName: string }> = [];

  // Get all hospitals
  const hospitals = await getHospitals();
  
  for (const hospital of hospitals) {
    // Get all doctors in this hospital
    const doctors = await getHospitalDoctors(hospital.id);
    
    // Add hospital information to each doctor
    const doctorsWithHospital = doctors.map(doctor => ({
      ...doctor,
      hospitalId: hospital.id,
      hospitalName: hospital.name
    }));
    
    results.push(...doctorsWithHospital);
  }

  return results;
}; 