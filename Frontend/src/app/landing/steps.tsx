import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  ScrollView,
  SafeAreaView,
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
      // Navigate to role selection after last step
      router.push("landing/role" as any);
    }
  };

  const handleSkip = () => {
    router.push("landing/role" as any);
  };

  const step = STEPS[currentStep];
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
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
              {currentStep + 1} of {STEPS.length}
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.skipButtonContainer}
            onPress={handleSkip}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
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
                    width: index === currentStep ? 30 : 10,
                  },
                ]}
              />
            ))}
          </View>
        </Animated.View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={handleSkip}
          activeOpacity={0.7}
        >
          <Text style={styles.secondaryButtonText}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.primaryButton, { backgroundColor: step.color }]}
          onPress={handleNext}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryButtonText}>
            {currentStep === STEPS.length - 1 ? "Get Started" : "Next →"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 20,
  },
  progressContainer: {
    flex: 1,
    marginRight: 20,
  },
  progressBar: {
    height: 6,
    backgroundColor: COLORS.light,
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 12,
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: COLORS.gray,
    fontWeight: "600",
    letterSpacing: 0.4,
  },
  skipButtonContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  skipButton: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "600",
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingVertical: 48,
    minHeight: height * 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 48,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  icon: {
    fontSize: 70,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.dark,
    textAlign: "center",
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 17,
    color: COLORS.gray,
    textAlign: "center",
    lineHeight: 28,
    marginBottom: 56,
    letterSpacing: 0.3,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 40,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.light,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 52,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  secondaryButton: {
    backgroundColor: COLORS.light,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
