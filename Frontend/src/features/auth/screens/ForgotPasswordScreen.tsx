import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, Mail } from "lucide-react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import { Button } from "@/shared/components";
import { validateEmail } from "@/shared/utils";

export function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSendCode = () => {
    const newErrors = { email: "" };

    if (!email || !validateEmail(email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);

    if (!newErrors.email) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSent(true);
      }, 1200);
    }
  };

  return (
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
        <Text style={styles.title}>Forgot password</Text>
        <Text style={styles.subtitle}>
          Lorem Ipsum is simply dummy text of the Lorem has been the industry's
        </Text>

        {!sent ? (
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
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            <Button
              title={loading ? "Sending..." : "Send code"}
              onPress={handleSendCode}
              loading={loading}
              style={styles.sendButton}
              disabled={loading}
            />
          </View>
        ) : (
          <View style={styles.successContainer}>
            <View style={styles.successIcon}>
              <Text style={styles.checkmark}>✓</Text>
            </View>
            <Text style={styles.successTitle}>Check your email</Text>
            <Text style={styles.successText}>
              We've sent a password reset code to {email}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.push("/auth/login" as any)}>
          <Text style={styles.signInLink}>Go back to Sign in</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  sendButton: {
    marginTop: SPACING.xs,
    marginBottom: SPACING.base,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  successContainer: {
    alignItems: "center",
    marginTop: SPACING.xl,
    paddingHorizontal: SPACING.base,
  },
  successIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.base,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  checkmark: {
    fontSize: 36,
    fontWeight: "700",
    color: COLORS.white,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.dark,
    marginBottom: SPACING.xs,
  },
  successText: {
    fontSize: 12,
    color: COLORS.gray600,
    textAlign: "center",
    lineHeight: 18,
  },
  footer: {
    alignItems: "center",
    paddingVertical: SPACING.base,
    paddingHorizontal: SPACING.base,
  },
  signInLink: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: "700",
    textDecorationLine: "none",
  },
});
