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
import Mail from "lucide-react-native/dist/esm/icons/mail.js";
import Lock from "lucide-react-native/dist/esm/icons/lock.js";
import ArrowLeft from "lucide-react-native/dist/esm/icons/arrow-left.js";
import Eye from "lucide-react-native/dist/esm/icons/eye.js";
import EyeOff from "lucide-react-native/dist/esm/icons/eye-off.js";
import { useAuth, UserRole } from "@/shared/context/AuthContext";
import { getRoleBasedHome } from "@/shared/utils/navigationPaths";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import { Button } from "@/shared/components";
import { validateEmail, validatePassword } from "@/shared/utils";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("student@example.com");
  const [password, setPassword] = useState("password123");
  const [selectedRole, setSelectedRole] = useState<UserRole>("student");
  const [socialLoading, setSocialLoading] = useState<
    "google" | "facebook" | null
  >(null);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    const newErrors = { email: "", password: "" };

    if (!email || !validateEmail(email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!password || !validatePassword(password)) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      setLoading(true);
      try {
        await login(email, password, selectedRole);

        const homeRoute = getRoleBasedHome(selectedRole);
        router.replace(homeRoute as any);
      } catch (error) {
        console.error("Login error:", error);
        setErrors({
          email: "Login failed. Please try again.",
          password: "",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSocialLogin = async (provider: "google" | "facebook") => {
    try {
      setSocialLoading(provider);
      await new Promise((resolve) => setTimeout(resolve, 600));
      Alert.alert(
        "Social Login",
        `${provider === "google" ? "Google" : "Facebook"} login will be connected in auth service.`,
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
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>
              Lorem Ipsum is simply dummy text of the Lorem has been the
              industry's
            </Text>

            <View style={styles.form}>
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
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
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
                {errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>

              <TouchableOpacity
                style={styles.forgotPasswordContainer}
                onPress={() => router.push("/auth/forgot-password" as any)}
              >
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>

              <Button
                title={loading ? "Signing In..." : "Sign in"}
                onPress={handleLogin}
                loading={loading}
                style={styles.loginButton}
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
                  onPress={() => handleSocialLogin("facebook")}
                  disabled={loading || socialLoading !== null}
                  activeOpacity={0.7}
                >
                  <View style={[styles.socialIcon, styles.facebookIcon]}>
                    <Text style={styles.socialIconText}>f</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={() => handleSocialLogin("google")}
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
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => router.push("/auth/register" as any)}
            >
              <Text style={styles.signUpLink}>Sign up</Text>
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
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.dark,
    marginTop: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.gray500,
    lineHeight: 18,
    marginBottom: SPACING.base,
  },
  form: {
    marginTop: SPACING.xs,
  },
  inputGroup: {
    marginBottom: SPACING.base,
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
    paddingHorizontal: SPACING["4xl"],
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
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: SPACING.xs,
  },
  forgotPassword: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.primary,
    fontWeight: "600",
    fontSize: 11,
  },
  loginButton: {
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
  signUpLink: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: "700",
  },
});
