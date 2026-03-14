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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";

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
    animation: require("@/assets/animations/Online-Learning.json"),
    title: "Choosing the Right Online Course",
    description: "Select courses that align with your growth goals and learning pace",
    color: "#6366f1",
  },
  {
    id: 2,
    animation: require("@/assets/animations/ai-chatbot.json"),
    title: "AI Support That Helps You Learn",
    description: "AI-generated quiz and real-time support to solve any doubts anytime",
    color: "#ec4899",
  },
  {
    id: 3,
    animation: require("@/assets/animations/search-for-employee.json"),
    title: "Start Your Path to Mastery",
    description: "Begin your journey with Mentora and unlock your full potential",
    color: "#10b981",
  },
];

export default function Steps() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
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
        <View
          style={[
            styles.header,
            {
              paddingTop: Math.max(insets.top, 40),
              paddingHorizontal: Math.max(insets.left + insets.right + 24, 24),
            },
          ]}
        >
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
          {/* Icon Animation */}
          <View style={[styles.iconContainer, { backgroundColor: step.color }]}>
            <LottieView
              source={step.animation}
              autoPlay
              loop
              style={styles.lottieIcon}
            />
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
      <View
        style={[
          styles.buttonContainer,
          {
            paddingBottom: Math.max(insets.bottom, 16),
            paddingHorizontal: Math.max(insets.left + insets.right + 24, 24),
          },
        ]}
      >
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
    paddingBottom: 28,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light,
  },
  progressContainer: {
    flex: 1,
    marginRight: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.light,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 14,
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 13,
    color: COLORS.gray,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  skipButtonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: COLORS.light,
  },
  skipButton: {
    fontSize: 15,
    color: COLORS.primary,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingVertical: 56,
    minHeight: height * 0.55,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    width: 260,
    height: 260,
    borderRadius: 80,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 56,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  icon: {
    fontSize: 70,
  },
  lottieIcon: {
    width: 160,
    height: 160,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: COLORS.dark,
    textAlign: "center",
    marginBottom: 24,
    letterSpacing: -0.6,
    lineHeight: 44,
  },
  description: {
    fontSize: 18,
    color: COLORS.gray,
    textAlign: "center",
    lineHeight: 30,
    marginBottom: 64,
    letterSpacing: 0.2,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 48,
  },
  dot: {
    height: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 14,
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.light,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 56,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 56,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 7,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  secondaryButton: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
});
