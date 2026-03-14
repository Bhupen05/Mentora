import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth, UserRole } from "@/shared/context/AuthContext";
import { getRoleBasedHome } from "@/shared/utils/navigationPaths";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import { Button, Input } from "@/shared/components";
import { validateEmail, validatePassword } from "@/shared/utils";

export function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("student@example.com");
  const [password, setPassword] = useState("password123");
  const [selectedRole, setSelectedRole] = useState<UserRole>("student");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

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
        // Call auth context login
        await login(email, password, selectedRole);

        // Navigate to role-based home
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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.logo}>🎓</Text>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>
      </View>

      <View style={styles.form}>
        {/* Role Selection */}
        <View style={styles.roleSection}>
          <Text style={styles.roleLabel}>Login as:</Text>
          <View style={styles.roleButtons}>
            {(["student", "mentor", "parent"] as const).map((role) => (
              <TouchableOpacity
                key={role}
                style={[
                  styles.roleButton,
                  selectedRole === role && styles.roleButtonActive,
                ]}
                onPress={() => setSelectedRole(role)}
              >
                <Text
                  style={[
                    styles.roleButtonText,
                    selectedRole === role && styles.roleButtonTextActive,
                  ]}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Input
          label="Email Address"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          error={errors.email || ""}
          keyboardType="email-address"
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={errors.password || ""}
        />

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <Button
          title={loading ? "Signing In..." : "Sign In"}
          onPress={handleLogin}
          loading={loading}
          style={styles.loginButton}
          disabled={loading}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push("auth/register" as any)}>
          <Text style={styles.signUpLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingHorizontal: SPACING.base,
    paddingVertical: 60,
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
  logo: {
    fontSize: 60,
    marginBottom: SPACING.base,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.white,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: SPACING.sm,
  },
  form: {
    paddingHorizontal: SPACING.base,
    paddingVertical: 40,
  },
  roleSection: {
    marginBottom: SPACING.xl,
  },
  roleLabel: {
    ...TYPOGRAPHY.label,
    color: COLORS.dark,
    marginBottom: SPACING.base,
    fontWeight: "600",
  },
  roleButtons: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  roleButton: {
    flex: 1,
    paddingVertical: SPACING.base,
    paddingHorizontal: SPACING.sm,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.gray300,
    alignItems: "center",
  },
  roleButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  roleButtonText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.dark,
    fontWeight: "600",
  },
  roleButtonTextActive: {
    color: COLORS.white,
  },
  forgotPassword: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.primary,
    textAlign: "right",
    marginVertical: SPACING.base,
  },
  loginButton: {
    marginTop: SPACING.xl,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.xl,
  },
  footerText: {
    ...TYPOGRAPHY.body,
    color: COLORS.gray600,
  },
  signUpLink: {
    ...TYPOGRAPHY.body,
    color: COLORS.primary,
    fontWeight: "600",
  },
});
