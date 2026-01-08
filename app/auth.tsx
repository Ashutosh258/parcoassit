import { 
  View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator
} from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

export default function AuthScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { sendOtp, verifyOtp, isLoading, error, clearError } = useAuth();
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [testMode, setTestMode] = useState(false);

  const TEST_PHONE = '1234567890';
  const TEST_OTP = '123456';

  const handleSendOtp = async () => {
    if (phoneNumber.length < 10) return;
    if (phoneNumber === TEST_PHONE) {
      setTestMode(true);
      setStep('otp');
      return;
    }
    try {
      await sendOtp(phoneNumber);
      setStep('otp');
    } catch (err) {
      console.error('Send OTP error:', err);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) return;
    if (testMode && otp === TEST_OTP) {
      router.replace('/(tabs)/home');
      return;
    }
    try {
      await verifyOtp(otp);
    } catch (err) {
      console.error('Verify OTP error:', err);
    }
  };

  const handleBack = () => {
    if (step === 'otp') {
      setStep('phone');
      setOtp('');
      setTestMode(false);
      clearError();
    } else {
      router.back();
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <LinearGradient colors={['#22D3EE', '#0EA5E9']} style={styles.logoBackground}>
          <Ionicons name="car-sport" size={20} color="#030712" />
        </LinearGradient>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        {step === 'phone' ? (
          <>
            <Text style={styles.title}>Enter your phone number</Text>
            <Text style={styles.subtitle}>We'll send you a verification code</Text>
            <View style={styles.inputContainer}>
              <View style={styles.countryCode}><Text style={styles.countryCodeText}>+91</Text></View>
              <TextInput
                style={styles.input}
                placeholder="Phone number"
                placeholderTextColor="rgba(255,255,255,0.4)"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                maxLength={10}
              />
            </View>
            <Text style={styles.testHint}>Test: 1234567890 → OTP: 123456</Text>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <TouchableOpacity 
              style={[styles.submitButton, phoneNumber.length < 10 && styles.submitButtonDisabled]}
              onPress={handleSendOtp}
              disabled={phoneNumber.length < 10 || isLoading}
            >
              <LinearGradient
                colors={phoneNumber.length >= 10 ? ['#22D3EE', '#0EA5E9'] : ['#333', '#333']}
                style={styles.submitGradient}
              >
                {isLoading ? <ActivityIndicator color="#030712" /> : (
                  <>
                    <Text style={[styles.submitText, phoneNumber.length < 10 && styles.submitTextDisabled]}>Send OTP</Text>
                    <Ionicons name="arrow-forward" size={20} color={phoneNumber.length >= 10 ? "#030712" : "#666"} />
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.title}>Enter verification code</Text>
            <Text style={styles.subtitle}>We've sent a 6-digit code to +91 {phoneNumber}</Text>
            <TextInput
              style={styles.otpInput}
              placeholder="• • • • • •"
              placeholderTextColor="rgba(255,255,255,0.4)"
              keyboardType="number-pad"
              value={otp}
              onChangeText={setOtp}
              maxLength={6}
              textAlign="center"
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
            <TouchableOpacity 
              style={[styles.submitButton, otp.length !== 6 && styles.submitButtonDisabled]}
              onPress={handleVerifyOtp}
              disabled={otp.length !== 6 || isLoading}
            >
              <LinearGradient
                colors={otp.length === 6 ? ['#22D3EE', '#0EA5E9'] : ['#333', '#333']}
                style={styles.submitGradient}
              >
                {isLoading ? <ActivityIndicator color="#030712" /> : (
                  <>
                    <Text style={[styles.submitText, otp.length !== 6 && styles.submitTextDisabled]}>Verify & Continue</Text>
                    <Ionicons name="checkmark" size={20} color={otp.length === 6 ? "#030712" : "#666"} />
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.resendButton} onPress={handleSendOtp}>
              <Text style={styles.resendText}>Didn't receive code? Resend</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
        <Text style={styles.footerText}>By continuing, you agree to our Terms of Service</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#030712' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 20 },
  backButton: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  logoBackground: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  placeholder: { width: 40 },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 40 },
  title: { fontSize: 28, fontWeight: '700', color: '#FFFFFF', marginBottom: 12 },
  subtitle: { fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 22, marginBottom: 40 },
  inputContainer: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  countryCode: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 14, paddingHorizontal: 16, justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  countryCodeText: { color: '#FFFFFF', fontSize: 16, fontWeight: '500' },
  input: { flex: 1, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 14, paddingHorizontal: 20, paddingVertical: 16, fontSize: 18, color: '#FFFFFF', letterSpacing: 1, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  testHint: { color: '#22D3EE', fontSize: 12, marginBottom: 16, opacity: 0.7 },
  otpInput: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 14, paddingHorizontal: 20, paddingVertical: 20, fontSize: 32, color: '#FFFFFF', letterSpacing: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', marginBottom: 24 },
  errorText: { color: '#EF4444', fontSize: 14, marginBottom: 16 },
  submitButton: { marginTop: 8 },
  submitButtonDisabled: { opacity: 0.7 },
  submitGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16, borderRadius: 14 },
  submitText: { fontSize: 16, fontWeight: '700', color: '#030712' },
  submitTextDisabled: { color: '#666' },
  resendButton: { alignItems: 'center', marginTop: 24 },
  resendText: { color: '#22D3EE', fontSize: 14, fontWeight: '500' },
  footer: { paddingHorizontal: 24, paddingTop: 20 },
  footerText: { fontSize: 12, color: 'rgba(255,255,255,0.4)', textAlign: 'center', lineHeight: 18 },
});
