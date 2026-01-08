import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';

export default function TabLayout() {
  const { theme } = useTheme();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#22D3EE',
        tabBarInactiveTintColor: theme.tabInactive,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: theme.border,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
          height: 70,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="generate"
        options={{
          title: 'Generate',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "qr-code" : "qr-code-outline"} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "scan" : "scan-outline"} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}