/**
 * Splash Screen
 * Shows logo and loading indicator while initializing the app
 * Checks user authentication state and navigates accordingly
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
  const logoScale = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate logo entrance
    Animated.sequence([
      Animated.delay(200),
      Animated.spring(logoScale, {
        toValue: 1,
        useNativeDriver: true,
        bounciness: 8,
      }),
    ]).start();

    // Check authentication and navigate after 2.5 seconds
    const timer = setTimeout(() => {
      handleNavigation();
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleNavigation = async () => {
    try {
      // Verify auth status is up to date
      await checkAuth();

      // Navigate based on authentication status
      if (isAuthenticated && userRole) {
        // User is authenticated, go to role-based home
        const homeRoute = getRoleBasedHome(userRole);
        router.replace(homeRoute as any);
      } else {
        // User is not authenticated, go to login
        router.replace("auth/login" as any);
      }
    } catch (error) {
      console.error("Error during splash screen navigation:", error);
      // On error, go to login screen
      router.replace("auth/login" as any);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo with spring animation */}
      <Animated.View
        style={[
          styles.logoContainer,
          { transform: [{ scale: logoScale }] },
        ]}
      >
        <Text style={styles.logo}>🎓</Text>
        <Text style={styles.title}>Mentora</Text>
      </Animated.View>

      {/* Tagline */}
      <Text style={styles.tagline}>Connect with Industry Leaders</Text>

      {/* Loading Indicator */}
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.white} />
        <Text style={styles.loadingText}>Initializing your session...</Text>
      </View>

      {/* Bottom accent */}
      <View style={styles.accent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.base,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: SPACING["3xl"],
  },
  logo: {
    fontSize: 80,
    marginBottom: SPACING.base,
  },
  title: {
    ...TYPOGRAPHY.h1,
    color: COLORS.white,
  },
  tagline: {
    ...TYPOGRAPHY.body,
    color: "rgba(255, 255, 255, 0.85)",
    textAlign: "center",
    marginBottom: SPACING["3xl"],
  },
  loaderContainer: {
    alignItems: "center",
    gap: SPACING.base,
    marginTop: SPACING["2xl"],
  },
  loadingText: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.7)",
    fontWeight: "500",
  },
  accent: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 6,
    backgroundColor: COLORS.secondary,
  },
});
