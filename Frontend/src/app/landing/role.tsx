import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const COLORS = {
  primary: "#6366f1",
  secondary: "#ec4899",
  dark: "#1f2937",
  light: "#f9fafb",
  gray: "#6b7280",
  white: "#ffffff",
};

const ROLES = [
  {
    id: "student",
    icon: "👨‍🎓",
    title: "Student",
    description: "Learn from expert mentors and grow your skills",
    color: "#6366f1",
    bgColor: "#eef2ff",
  },
  {
    id: "parent",
    icon: "👨‍👩‍👧",
    title: "Parent",
    description: "Find mentors for your child's education",
    color: "#10b981",
    bgColor: "#ecfdf5",
  },
  {
    id: "mentor",
    icon: "👨‍🏫",
    title: "Mentor",
    description: "Share your expertise and guide others",
    color: "#ec4899",
    bgColor: "#fce7f3",
  },
];

export default function RoleSelection() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(30)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSelectRole = (roleId: string) => {
    setSelectedRole(roleId);
  };

  const handleContinue = () => {
    if (selectedRole) {
      // Pass role as a query parameter or store in context
      router.push({
        pathname: "auth/login",
        params: { role: selectedRole },
      } as any);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Animated.View
        style={[
          styles.header,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.title}>Choose Your Role</Text>
        <Text style={styles.subtitle}>
          Select the option that best describes you
        </Text>
      </Animated.View>

      {/* Role Cards */}
      <Animated.View
        style={[
          styles.cardsContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {ROLES.map((role, index) => (
          <TouchableOpacity
            key={role.id}
            style={[
              styles.roleCard,
              {
                backgroundColor: role.bgColor,
                borderColor: selectedRole === role.id ? role.color : "transparent",
                borderWidth: selectedRole === role.id ? 3 : 1,
                borderStyle: "solid",
                borderBottomColor:
                  selectedRole === role.id ? role.color : COLORS.light,
              },
            ]}
            onPress={() => handleSelectRole(role.id)}
            activeOpacity={0.7}
          >
            {/* Checkmark */}
            {selectedRole === role.id && (
              <View style={[styles.checkmark, { backgroundColor: role.color }]}>
                <Text style={styles.checkmarkText}>✓</Text>
              </View>
            )}

            {/* Icon */}
            <Text style={styles.icon}>{role.icon}</Text>

            {/* Title */}
            <Text style={[styles.roleTitle, { color: role.color }]}>
              {role.title}
            </Text>

            {/* Description */}
            <Text style={styles.roleDescription}>{role.description}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>

      {/* Bottom Buttons */}
      <Animated.View
        style={[
          styles.buttonContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedRole && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!selectedRole}
        >
          <Text style={styles.continueButtonText}>
            {selectedRole ? "Continue" : "Select a Role"}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 48,
    justifyContent: "space-between",
  },
  header: {
    marginBottom: 48,
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: COLORS.dark,
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: "center",
    lineHeight: 24,
  },
  cardsContainer: {
    flex: 1,
    gap: 16,
    marginBottom: 32,
  },
  roleCard: {
    flex: 1,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  checkmark: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  checkmarkText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "700",
  },
  icon: {
    fontSize: 56,
    marginBottom: 16,
  },
  roleTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  roleDescription: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: "center",
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 14,
    marginTop: 32,
  },
  backButton: {
    flex: 0.3,
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: COLORS.light,
    borderRadius: 56,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.gray,
  },
  backButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.dark,
    letterSpacing: 0.3,
  },
  continueButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: COLORS.primary,
    borderRadius: 56,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  continueButtonDisabled: {
    backgroundColor: COLORS.light,
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.white,
    letterSpacing: 0.5,
  },
});
