import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import { Button, Input, Badge } from "@/shared/components";
import { validateEmail, validatePassword } from "@/shared/utils";

type UserRole = "student" | "parent" | "mentor";

export function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

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

    if (!name) newErrors.name = "Name is required";
    if (!email || !validateEmail(email))
      newErrors.email = "Please enter a valid email";
    if (!password || !validatePassword(password))
      newErrors.password = "Password must be at least 8 characters";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((err) => err);
    if (!hasErrors) {
      setLoading(true);
      // Simulate registration
      setTimeout(() => {
        setLoading(false);
        router.push("../login" as any);
      }, 1500);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join Mentora today</Text>
      </View>

      <View style={styles.form}>
        <Input
          label="Full Name"
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          error={errors.name || ""}
        />

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

        <Input
          label="Confirm Password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          error={errors.confirmPassword || ""}
        />

        <Text style={styles.roleLabel}>Select Your Role</Text>
        <View style={styles.roleContainer}>
          {ROLES.map((r) => (
            <TouchableOpacity
              key={r.value}
              style={[
                styles.roleButton,
                role === r.value && styles.roleButtonActive,
              ]}
              onPress={() => setRole(r.value)}
            >
              <Text
                style={[
                  styles.roleButtonText,
                  role === r.value && styles.roleButtonTextActive,
                ]}
              >
                {r.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button
          title="Create Account"
          onPress={handleRegister}
          loading={loading}
          style={styles.registerButton}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push("../login" as any)}>
          <Text style={styles.signInLink}>Sign In</Text>
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
    paddingTop: SPACING.base,
    paddingBottom: SPACING.xl,
    backgroundColor: COLORS.primary,
  },
  backButton: {
    fontSize: 24,
    color: COLORS.white,
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
    paddingVertical: SPACING.xl,
  },
  roleLabel: {
    ...TYPOGRAPHY.label,
    color: COLORS.dark,
    marginTop: SPACING.base,
    marginBottom: SPACING.base,
  },
  roleContainer: {
    flexDirection: "row",
    gap: SPACING.base,
    marginBottom: SPACING.xl,
  },
  roleButton: {
    flex: 1,
    paddingVertical: SPACING.base,
    paddingHorizontal: SPACING.sm,
    borderWidth: 2,
    borderColor: COLORS.gray300,
    borderRadius: 8,
    alignItems: "center",
  },
  roleButtonActive: {
    borderColor: COLORS.primary,
    backgroundColor: "#e0e7ff",
  },
  roleButtonText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.gray600,
    fontWeight: "500",
  },
  roleButtonTextActive: {
    color: COLORS.primary,
  },
  registerButton: {
    marginTop: SPACING.base,
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
  signInLink: {
    ...TYPOGRAPHY.body,
    color: COLORS.primary,
    fontWeight: "600",
  },
});
