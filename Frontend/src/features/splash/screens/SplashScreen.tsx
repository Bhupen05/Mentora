/**
 * Splash Screen
 * Simple animated splash with logo zoom and loading
 * Shows home page underneath while loading
 */

import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/shared/context/AuthContext";
import { getRoleBasedHome } from "@/shared/utils/navigationPaths";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";

export function SplashScreen() {
  const router = useRouter();
  const { isAuthenticated, userRole, checkAuth } = useAuth();

  // Animations
  const logoScale = React.useRef(new Animated.Value(0.3)).current;
  const loaderOpacity = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Zoom logo animation
    Animated.timing(logoScale, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();

    // Check auth and navigate after 2 seconds
    const navigationTimer = setTimeout(() => {
      handleNavigation();
    }, 2000);

    return () => clearTimeout(navigationTimer);
  }, []);

  const handleNavigation = async () => {
    try {
      await checkAuth();

      if (isAuthenticated && userRole) {
        const homeRoute = getRoleBasedHome(userRole);
        router.replace(homeRoute as any);
      } else {
        router.replace("auth/login" as any);
      }
    } catch (error) {
      console.error("Error during splash screen navigation:", error);
      router.replace("auth/login" as any);
    }
  };

  return (
    <View style={styles.container}>
      {/* Overlay */}
      <View style={styles.overlay} />

      {/* Animated Logo with Zoom */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [{ scale: logoScale }],
          },
        ]}
      >
        <Text style={styles.logo}>🎓</Text>
        <Text style={styles.brandName}>Mentora</Text>
      </Animated.View>

      {/* Loading Indicator */}
      <Animated.View style={[styles.loaderContainer, { opacity: loaderOpacity }]}>
        <ActivityIndicator size="large" color={COLORS.white} />
        <Text style={styles.loadingText}>Loading...</Text>
      </Animated.View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.primary,
    zIndex: 10,
  },
  logoContainer: {
    alignItems: "center",
    zIndex: 20,
  },
  logo: {
    fontSize: 100,
    marginBottom: SPACING.base,
  },
  brandName: {
    fontSize: 40,
    fontWeight: "800",
    color: COLORS.white,
  },
  loaderContainer: {
    alignItems: "center",
    marginTop: SPACING["3xl"],
    zIndex: 20,
  },
  loadingText: {
    fontSize: 14,
    color: COLORS.white,
    fontWeight: "500",
    marginTop: SPACING.base,
  },
});
