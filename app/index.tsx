import { Redirect } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import LoadingScreen from './loading';

export default function Index() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Redirect href="/landing" />;
}
