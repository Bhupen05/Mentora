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

const STEPS = [
  {
    id: 1,
    icon: "📚",
    title: "Choosing the Right Online Course",
    description: "Select courses that align with your growth goals and learning pace",
    color: "#6366f1",
  },
  {
    id: 2,
    icon: "🤖",
    title: "AI Support That Helps You Learn",
    description: "AI-generated quiz and real-time support to solve any doubts anytime",
    color: "#ec4899",
  },
  {
    id: 3,
    icon: "✨",
    title: "Start Your Path to Mastery",
    description: "Begin your journey with Mentora and unlock your full potential",
    color: "#10b981",
  },
];

export default function Steps() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;

  React.useEffect(() => {
    // Reset animations
    fadeAnim.setValue(0);
    slideAnim.setValue(50);

    // Animate on step change
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
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to login after last step
      router.push("auth/login" as any);
    }
  };

  const handleSkip = () => {
    router.push("auth/login" as any);
  };

  const step = STEPS[currentStep];
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <View style={styles.container}>
      {/* Header with Skip Button */}
      <View style={styles.header}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: `${progress}%`,
                  backgroundColor: step.color,
                },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {currentStep + 1} / {STEPS.length}
          </Text>
        </View>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipButton}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Step Content */}
      <Animated.View
        style={[
          styles.contentContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* Icon */}
        <View style={[styles.iconContainer, { backgroundColor: step.color }]}>
          <Text style={styles.icon}>{step.icon}</Text>
        </View>

        {/* Step Title */}
        <Text style={styles.title}>{step.title}</Text>

        {/* Step Description */}
        <Text style={styles.description}>{step.description}</Text>

        {/* Step Indicators */}
        <View style={styles.dotsContainer}>
          {STEPS.map((_, index) => (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    index === currentStep ? step.color : COLORS.gray,
                  width: index === currentStep ? 32 : 12,
                },
              ]}
            />
          ))}
        </View>
      </Animated.View>

      {/* Bottom Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={handleSkip}
        >
          <Text style={styles.secondaryButtonText}>
            {currentStep === STEPS.length - 1 ? "Skip to Login" : "Skip"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.primaryButton, { backgroundColor: step.color }]}
          onPress={handleNext}
        >
          <Text style={styles.primaryButtonText}>
            {currentStep === STEPS.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 32,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 48,
  },
  progressContainer: {
    flex: 1,
    marginRight: 16,
  },
  progressBar: {
    height: 4,
    backgroundColor: COLORS.light,
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: COLORS.gray,
    fontWeight: "600",
  },
  skipButton: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "600",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  icon: {
    fontSize: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.dark,
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 48,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    height: 12,
    borderRadius: 6,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: COLORS.light,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "600",
  },
});
