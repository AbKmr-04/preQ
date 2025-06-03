import React, { createContext, useState, useEffect, useContext } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { auth } from '../config/firebase';
import { createUser, getUser, User } from '../services/database';

type UserRole = 'staff' | 'patient' | 'doctor' | 'hospital' | null;

interface AuthContextType {
  currentUser: User | null;
  firebaseUser: FirebaseUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole, additionalData?: any) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Auth state changed:', user ? user.uid : 'No user');
      setFirebaseUser(user);
      if (user) {
        console.log('Fetching user data for:', user.uid);
        const userData = await getUser(user.uid);
        console.log('User data received:', userData);
        setCurrentUser(userData);
      } else {
        setCurrentUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    console.log('Login attempt for:', email);
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Firebase login successful:', userCredential.user.uid);
      const userData = await getUser(userCredential.user.uid);
      console.log('User data after login:', userData);
      setCurrentUser(userData);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, role: UserRole, additionalData?: any) => {
    if (!role) throw new Error('Role is required');
    
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      const userData: Omit<User, 'id' | 'createdAt'> = {
        name,
        email,
        role,
        ...additionalData
      };
      
      await createUser(userCredential.user.uid, userData);
      
      const newUser: User = {
        id: userCredential.user.uid,
        ...userData,
        createdAt: Timestamp.now()
      };
      setCurrentUser(newUser);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setFirebaseUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const refreshUser = async () => {
    if (firebaseUser) {
      try {
        const userData = await getUser(firebaseUser.uid);
        setCurrentUser(userData);
      } catch (error) {
        console.error('Refresh user error:', error);
        throw error;
      }
    }
  };

  const value = {
    currentUser,
    firebaseUser,
    isLoading,
    login,
    signup,
    logout,
    refreshUser,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};