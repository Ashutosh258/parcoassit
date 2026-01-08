import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Dimensions,
  ImageBackground,
  Animated,
  Easing
} from 'react-native';
import { useEffect, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function LandingScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  
  const floatAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -8,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleGetStarted = () => router.push('/auth');
  const handleSignIn = () => router.push('/auth');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <View style={styles.logoContainer}>
          <LinearGradient colors={['#22D3EE', '#0EA5E9']} style={styles.logoBackground}>
            <Ionicons name="car-sport" size={20} color="#030712" />
          </LinearGradient>
          <Text style={styles.logoText}>ParkAssist</Text>
        </View>
        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.heroSection}>
        <View style={styles.badge}>
          <Ionicons name="sparkles" size={16} color="#22D3EE" />
          <Text style={styles.badgeText}>Smart Parking Solution</Text>
        </View>
        <Text style={styles.headline}>
          Never Get <Text style={styles.headlineCyan}>Blocked</Text> Again
        </Text>
        <Text style={styles.subtitle}>
          Generate a QR code for your car. Someone scans it,{'\n'}calls you instantly. Simple.
        </Text>
        <TouchableOpacity style={styles.ctaButton} onPress={handleGetStarted} activeOpacity={0.9}>
          <LinearGradient colors={['#22D3EE', '#0EA5E9']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.ctaGradient}>
            <Text style={styles.ctaText}>Get Started Free</Text>
            <Ionicons name="arrow-forward" size={20} color="#030712" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.imageSection}>
        <LinearGradient colors={['#0F172A', '#1E293B']} style={styles.imagePlaceholder}>
          <Animated.View style={[styles.qrCardContainer, { transform: [{ translateY: floatAnim }] }]}>
            <View style={styles.qrCard}>
              <View style={styles.qrIconContainer}>
                <Ionicons name="qr-code" size={32} color="#030712" />
              </View>
              <View style={styles.qrCardContent}>
                <Text style={styles.qrCardTitle}>Your QR Code</Text>
                <Text style={styles.qrCardSubtitle}>Scan to contact owner</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="rgba(255,255,255,0.5)" />
            </View>
          </Animated.View>
        </LinearGradient>
      </View>

      <View style={styles.featuresSection}>
        <View style={styles.featureCard}>
          <View style={styles.featureIcon}><Ionicons name="qr-code" size={28} color="#22D3EE" /></View>
          <Text style={styles.featureTitle}>Generate QR</Text>
          <Text style={styles.featureDesc}>Unique code for your car</Text>
        </View>
        <View style={styles.featureCard}>
          <View style={styles.featureIcon}><Ionicons name="call" size={28} color="#22D3EE" /></View>
          <Text style={styles.featureTitle}>Instant Call</Text>
          <Text style={styles.featureDesc}>One tap to contact you</Text>
        </View>
        <View style={styles.featureCard}>
          <View style={styles.featureIcon}><Ionicons name="shield-checkmark" size={28} color="#22D3EE" /></View>
          <Text style={styles.featureTitle}>Stay Private</Text>
          <Text style={styles.featureDesc}>Number hidden until needed</Text>
        </View>
      </View>

      <View style={styles.statsSection}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>10K+</Text>
          <Text style={styles.statLabel}>Users</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>50K+</Text>
          <Text style={styles.statLabel}>Scans</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>4.9★</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
        <View style={styles.footerLogoContainer}>
          <LinearGradient colors={['#22D3EE', '#0EA5E9']} style={styles.footerLogo}>
            <Ionicons name="car-sport" size={14} color="#030712" />
          </LinearGradient>
          <Text style={styles.footerText}>© 2025 ParkAssist</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#030712' },
  scrollContent: { flexGrow: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 20 },
  logoContainer: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logoBackground: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  logoText: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  signInButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.1)' },
  signInText: { color: '#FFFFFF', fontSize: 14, fontWeight: '500' },
  heroSection: { alignItems: 'center', paddingHorizontal: 20, paddingTop: 40 },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(34, 211, 238, 0.3)', backgroundColor: 'rgba(34, 211, 238, 0.1)', marginBottom: 24 },
  badgeText: { color: '#22D3EE', fontSize: 13, fontWeight: '500' },
  headline: { fontSize: 36, fontWeight: '800', color: '#FFFFFF', textAlign: 'center', marginBottom: 16, lineHeight: 44 },
  headlineCyan: { color: '#22D3EE' },
  subtitle: { fontSize: 15, color: 'rgba(255,255,255,0.6)', textAlign: 'center', lineHeight: 22, marginBottom: 32 },
  ctaButton: { width: '100%', marginBottom: 40 },
  ctaGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16, borderRadius: 14 },
  ctaText: { fontSize: 16, fontWeight: '700', color: '#030712' },
  imageSection: { marginHorizontal: 20, marginBottom: 32 },
  imagePlaceholder: { width: '100%', height: 200, borderRadius: 20, justifyContent: 'flex-end' },
  qrCardContainer: { padding: 16 },
  qrCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  qrIconContainer: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  qrCardContent: { flex: 1 },
  qrCardTitle: { fontSize: 16, fontWeight: '600', color: '#FFFFFF' },
  qrCardSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 2 },
  featuresSection: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 40, gap: 12 },
  featureCard: { flex: 1, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  featureIcon: { width: 56, height: 56, borderRadius: 14, backgroundColor: 'rgba(34, 211, 238, 0.15)', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  featureTitle: { fontSize: 13, fontWeight: '600', color: '#FFFFFF', marginBottom: 4, textAlign: 'center' },
  featureDesc: { fontSize: 11, color: 'rgba(255,255,255,0.5)', textAlign: 'center' },
  statsSection: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 24, marginHorizontal: 20, marginBottom: 32, gap: 32 },
  statItem: { alignItems: 'center' },
  statNumber: { fontSize: 28, fontWeight: '700', color: '#FFFFFF' },
  statLabel: { fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 4 },
  statDivider: { width: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.1)' },
  footer: { alignItems: 'center', paddingTop: 20, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' },
  footerLogoContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  footerLogo: { width: 24, height: 24, borderRadius: 6, justifyContent: 'center', alignItems: 'center' },
  footerText: { fontSize: 13, color: 'rgba(255,255,255,0.5)' },
});
