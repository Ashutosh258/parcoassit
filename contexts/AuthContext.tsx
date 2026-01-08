import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '../lib/firebase';
import { 
  onAuthStateChanged, 
  signInWithPhoneNumber,
  signOut as firebaseSignOut,
  User,
  ConfirmationResult
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  confirmationResult: ConfirmationResult | null;
  sendOtp: (phoneNumber: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const sendOtp = async (phoneNumber: string) => {
    try {
      setError(null);
      setIsLoading(true);
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone);
      setConfirmationResult(confirmation);
      setIsLoading(false);
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP');
      setIsLoading(false);
      throw err;
    }
  };

  const verifyOtp = async (otp: string) => {
    try {
      setError(null);
      setIsLoading(true);
      if (!confirmationResult) {
        throw new Error('No confirmation result available');
      }
      await confirmationResult.confirm(otp);
      setConfirmationResult(null);
      setIsLoading(false);
    } catch (err: any) {
      setError(err.message || 'Invalid OTP');
      setIsLoading(false);
      throw err;
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await firebaseSignOut(auth);
      setUser(null);
      setIsLoading(false);
    } catch (err: any) {
      setError(err.message || 'Failed to sign out');
      setIsLoading(false);
      throw err;
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        isAuthenticated: !!user,
        confirmationResult,
        sendOtp, 
        verifyOtp, 
        signOut,
        error,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
