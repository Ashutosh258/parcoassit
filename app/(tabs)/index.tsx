import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme, spacing, borderRadius, typography } from '../../hooks/useTheme';

export default function HomeScreen() {
  const { theme, isDark, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => router.replace('/landing') }
    ]);
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <View style={styles.logoRow}>
          <LinearGradient colors={['#22D3EE', '#0EA5E9']} style={styles.logo}>
            <Ionicons name="car-sport" size={20} color="#030712" />
          </LinearGradient>
          <Text style={[styles.appName, { color: theme.text }]}>ParkAssist</Text>
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={[styles.iconBtn, { backgroundColor: theme.card }]} onPress={toggleTheme}>
            <Ionicons name={isDark ? 'sunny' : 'moon'} size={20} color="#22D3EE" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconBtn, { backgroundColor: theme.card }]} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.userCard}>
        <LinearGradient colors={['#22D3EE', '#0EA5E9', '#0284C7']} style={styles.userGradient}>
          <View style={styles.userAvatar}>
            <Ionicons name="person" size={32} color="#22D3EE" />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Welcome!</Text>
            <Text style={styles.userPhone}>+91 1234567890</Text>
          </View>
        </LinearGradient>
      </View>

      <Text style={[styles.sectionTitle, { color: theme.text }]}>Quick Actions</Text>
      
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.actionCard, { backgroundColor: theme.card }]} onPress={() => router.push('/(tabs)/generate')}>
          <View style={styles.actionIcon}><Ionicons name="qr-code" size={28} color="#22D3EE" /></View>
          <Text style={[styles.actionTitle, { color: theme.text }]}>Generate QR</Text>
          <Text style={[styles.actionDesc, { color: theme.textSecondary }]}>Create your car code</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.actionCard, { backgroundColor: theme.card }]} onPress={() => router.push('/(tabs)/scan')}>
          <View style={styles.actionIcon}><Ionicons name="scan" size={28} color="#22D3EE" /></View>
          <Text style={[styles.actionTitle, { color: theme.text }]}>Scan QR</Text>
          <Text style={[styles.actionDesc, { color: theme.textSecondary }]}>Contact car owner</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.sectionTitle, { color: theme.text }]}>Your Stats</Text>
      
      <View style={[styles.statsCard, { backgroundColor: theme.card }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: '#22D3EE' }]}>0</Text>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>QR Created</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: theme.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: '#22D3EE' }]}>0</Text>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Scans</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: theme.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: '#22D3EE' }]}>0</Text>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Calls</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingBottom: 100 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 16 },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logo: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  appName: { fontSize: 18, fontWeight: '700' },
  headerButtons: { flexDirection: 'row', gap: 8 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  userCard: { marginHorizontal: 20, marginBottom: 24 },
  userGradient: { borderRadius: 20, padding: 20, flexDirection: 'row', alignItems: 'center' },
  userAvatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(255,255,255,0.9)', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  userInfo: { flex: 1 },
  userName: { fontSize: 22, fontWeight: '700', color: '#030712' },
  userPhone: { fontSize: 14, color: 'rgba(3,7,18,0.7)', marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '600', paddingHorizontal: 20, marginBottom: 12 },
  actions: { flexDirection: 'row', paddingHorizontal: 20, gap: 12, marginBottom: 24 },
  actionCard: { flex: 1, padding: 20, borderRadius: 16, alignItems: 'center' },
  actionIcon: { width: 56, height: 56, borderRadius: 14, backgroundColor: 'rgba(34,211,238,0.15)', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  actionTitle: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  actionDesc: { fontSize: 12, textAlign: 'center' },
  statsCard: { marginHorizontal: 20, borderRadius: 16, padding: 20, flexDirection: 'row', justifyContent: 'space-around' },
  statItem: { alignItems: 'center' },
  statNumber: { fontSize: 28, fontWeight: '700' },
  statLabel: { fontSize: 12, marginTop: 4 },
  statDivider: { width: 1, height: 40 },
});
