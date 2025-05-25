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
  DocumentReference
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Type definitions
export interface Doctor {
  name: string;
  specialization: string;
  hospitalId: string;
  available: boolean;
}

export interface Patient {
  name: string;
  age: number;
  gender: string;
  phone: string;
  uid: string;
}

export interface QueueEntry {
  patientId: string;
  joinedAt: Timestamp;
  status: 'waiting' | 'in_progress' | 'done';
  questionnaireCompleted: boolean;
  summaryMapId: string;
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
const doctorsRef = collection(db, 'doctors');
const patientsRef = collection(db, 'patients');
const responsesRef = collection(db, 'responses');
const appointmentsRef = collection(db, 'appointments');

// Doctor operations
export const addDoctor = async (doctorId: string, doctorData: Doctor) => {
  await setDoc(doc(doctorsRef, doctorId), doctorData);
};

export const getDoctor = async (doctorId: string) => {
  const docRef = doc(doctorsRef, doctorId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() as Doctor : null;
};

// Patient operations
export const addPatient = async (patientId: string, patientData: Patient) => {
  await setDoc(doc(patientsRef, patientId), patientData);
};

export const getPatient = async (patientId: string) => {
  const docRef = doc(patientsRef, patientId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() as Patient : null;
};

// Queue operations
export const addToQueue = async (doctorId: string, queueData: QueueEntry) => {
  const queueRef = collection(db, `queues/${doctorId}/patients`);
  const newQueueRef = doc(queueRef);
  await setDoc(newQueueRef, {
    ...queueData,
    joinedAt: Timestamp.now()
  });
  return newQueueRef.id;
};

export const getDoctorQueue = async (doctorId: string) => {
  const queueRef = collection(db, `queues/${doctorId}/patients`);
  const queueSnap = await getDocs(queueRef);
  return queueSnap.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as QueueEntry & { id: string }));
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