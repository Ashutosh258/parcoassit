import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '../hooks/useTheme';
import { AuthProvider } from '../contexts/AuthContext';

function RootLayoutContent() {
  return (
    <AuthProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="landing" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false, presentation: 'modal', animation: 'slide_from_bottom' }} />
        <Stack.Screen name="loading" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <RootLayoutContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
