import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  ActivityIndicator,
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

export default function Index() {
  const router = useRouter();
  
  // Splash screen animations
  const splashLogoScale = React.useRef(new Animated.Value(0.3)).current;
  const splashOpacity = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Splash screen animation phase
    Animated.timing(splashLogoScale, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();

    // Auto-navigate after splash finishes
    setTimeout(() => {
      Animated.timing(splashOpacity, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start(() => {
        router.replace("landing/steps" as any);
      });
    }, 2400);
  }, []);

  return (
    <View style={styles.mainContainer}>
      {/* Splash Screen Overlay */}
      <Animated.View
        style={[
          styles.splashOverlay,
          {
            opacity: splashOpacity,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.splashLogoContainer,
            {
              transform: [{ scale: splashLogoScale }],
            },
          ]}
        >
          <Text style={styles.splashLogo}>🎓</Text>
          <Text style={styles.splashBrandName}>Mentora</Text>
        </Animated.View>

        <View style={styles.splashLoaderContainer}>
          <ActivityIndicator size="large" color={COLORS.white} />
          <Text style={styles.splashLoadingText}>Loading...</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  /* Splash Screen Overlay */
  splashOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  splashLogoContainer: {
    alignItems: "center",
    marginBottom: 48,
  },
  splashLogo: {
    fontSize: 100,
    marginBottom: 16,
  },
  splashBrandName: {
    fontSize: 40,
    fontWeight: "800",
    color: COLORS.white,
  },
  splashLoaderContainer: {
    alignItems: "center",
    gap: 12,
  },
  splashLoadingText: {
    fontSize: 14,
    color: COLORS.white,
    fontWeight: "500",
    marginTop: 8,
  },
});
