import React, { useState } from "react";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, Mail, Lock, User, Check, Eye, EyeOff } from "lucide-react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import { Button } from "@/shared/components";
import { validateEmail, validatePassword } from "@/shared/utils";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

type UserRole = "student" | "parent" | "mentor";

export function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const [socialLoading, setSocialLoading] = useState<
    "google" | "facebook" | null
  >(null);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const ROLES: { label: string; value: UserRole }[] = [
    { label: "Student", value: "student" },
    { label: "Parent", value: "parent" },
    { label: "Mentor", value: "mentor" },
  ];

  const handleRegister = () => {
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email || !validateEmail(email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!password || !validatePassword(password)) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((err) => err);
    if (!hasErrors) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        router.push("/auth/login" as any);
      }, 1200);
    }
  };

  const handleSocialRegister = async (provider: "google" | "facebook") => {
    try {
      setSocialLoading(provider);
      await new Promise((resolve) => setTimeout(resolve, 600));
      Alert.alert(
        "Social Registration",
        `${provider === "google" ? "Google" : "Facebook"} signup will be connected in auth service.`,
      );
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color={COLORS.dark} strokeWidth={2.5} />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>Create an account</Text>
            <Text style={styles.subtitle}>
              has been the industry's Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates veniam
            </Text>

            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <View style={styles.inputContainer}>
                  <View style={styles.iconWrapper}>
                    <User size={22} color={COLORS.primary} strokeWidth={2.2} />
                  </View>
                  <TextInput
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                    style={styles.textInput}
                    placeholderTextColor={COLORS.gray400}
                  />
                </View>
                {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address</Text>
                <View style={styles.inputContainer}>
                  <View style={styles.iconWrapper}>
                    <Mail size={22} color={COLORS.primary} strokeWidth={2.2} />
                  </View>
                  <TextInput
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    style={styles.textInput}
                    placeholderTextColor={COLORS.gray400}
                  />
                </View>
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputContainer}>
                  <View style={styles.iconWrapper}>
                    <Lock size={22} color={COLORS.primary} strokeWidth={2.2} />
                  </View>
                  <TextInput
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    style={styles.textInput}
                    placeholderTextColor={COLORS.gray400}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Eye size={20} color={COLORS.primary} strokeWidth={2.2} />
                    ) : (
                      <EyeOff size={20} color={COLORS.gray400} strokeWidth={2.2} />
                    )}
                  </TouchableOpacity>
                </View>
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Confirm Password</Text>
                <View style={styles.inputContainer}>
                  <View style={styles.iconWrapper}>
                    <Lock size={22} color={COLORS.primary} strokeWidth={2.2} />
                  </View>
                  <TextInput
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                    style={styles.textInput}
                    placeholderTextColor={COLORS.gray400}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <Eye size={20} color={COLORS.primary} strokeWidth={2.2} />
                    ) : (
                      <EyeOff size={20} color={COLORS.gray400} strokeWidth={2.2} />
                    )}
                  </TouchableOpacity>
                </View>
                {errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
              </View>

              <TouchableOpacity
                style={styles.termsCheckbox}
                onPress={() => setAgreeTerms(!agreeTerms)}
              >
                <View style={[styles.checkbox, agreeTerms && styles.checkboxActive]}>
                  {agreeTerms && (
                    <Check size={16} color={COLORS.white} strokeWidth={2.5} />
                  )}
                </View>
                <Text style={styles.termsText}>I agree to the terms & conditions</Text>
              </TouchableOpacity>

              <Button
                title={loading ? "Creating Account..." : "Sign up"}
                onPress={handleRegister}
                loading={loading}
                style={styles.registerButton}
                disabled={loading || socialLoading !== null}
              />

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.dividerLine} />
              </View>

              <View style={styles.socialButtons}>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={() => handleSocialRegister("facebook")}
                  disabled={loading || socialLoading !== null}
                  activeOpacity={0.7}
                >
                  <View style={[styles.socialIcon, styles.facebookIcon]}>
                    <Text style={styles.socialIconText}>f</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={() => handleSocialRegister("google")}
                  disabled={loading || socialLoading !== null}
                  activeOpacity={0.7}
                >
                  <View style={[styles.socialIcon, styles.googleIcon]}>
                    <Text style={styles.socialIconText}>G</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/auth/login" as any)}>
              <Text style={styles.signInLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  contentContainer: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.base,
    paddingBottom: SPACING.xs,
  },
  content: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.dark,
    marginTop: SPACING.xs,
    marginBottom: SPACING.xs,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.gray500,
    lineHeight: 18,
    marginBottom: SPACING.base,
    textAlign: "center",
  },
  form: {
    marginTop: SPACING.xs,
  },
  inputGroup: {
    marginBottom: SPACING.sm,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.dark,
    marginBottom: SPACING.xs,
  },
  inputContainer: {
    position: "relative",
    marginBottom: SPACING.xs,
  },
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.gray300,
    borderRadius: 8,
    paddingHorizontal: SPACING["5xl"],
    paddingVertical: SPACING.base,
    fontSize: 14,
    color: COLORS.dark,
    backgroundColor: COLORS.white,
  },
  iconWrapper: {
    position: "absolute",
    left: SPACING.base + 2,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    zIndex: 10,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 11,
    marginTop: SPACING.xs,
  },
  eyeIcon: {
    position: "absolute",
    right: SPACING.base + 2,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    paddingHorizontal: SPACING.xs,
    zIndex: 10,
  },
  termsCheckbox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.base,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.xs,
  },
  checkboxActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  termsText: {
    fontSize: 12,
    color: COLORS.dark,
    fontWeight: "500",
    flex: 1,
  },
  registerButton: {
    marginTop: SPACING.xs,
    marginBottom: SPACING.base,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: SPACING.base,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.gray300,
  },
  dividerText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray500,
    marginHorizontal: SPACING.xs,
    fontSize: 10,
  },
  socialButtons: {
    flexDirection: "row",
    gap: SPACING.base,
    justifyContent: "center",
    marginBottom: SPACING.base,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: COLORS.gray300,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  socialIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  socialIconText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "800",
  },
  googleIcon: {
    backgroundColor: "#ea4335",
  },
  facebookIcon: {
    backgroundColor: "#1877f2",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.base,
    paddingHorizontal: SPACING.base,
  },
  footerText: {
    fontSize: 12,
    color: COLORS.gray600,
  },
  signInLink: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: "700",
  },
});
