import React, { useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, Animated } from "react-native";
import { useRouter } from "expo-router";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
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

export default function Index() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

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
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
        <View style={styles.mainContainer}>
          {/* Splash Screen Overlay */}
          <Animated.View
            style={[
              styles.splashOverlay,
              {
                opacity: splashOpacity,
                paddingTop: insets.top + 16,
                paddingBottom: insets.bottom + 16,
                paddingLeft: insets.left + 16,
                paddingRight: insets.right + 16,
              },
            ]}
          >
            {/* Loader Container */}
            <View
              style={[
                styles.splashLoaderContainer,
                {
                  marginBottom: Math.max(insets.bottom, 20),
                },
              ]}
            >
              <LottieView
                source={require("../../assets/animations/Welcome.json")}
                autoPlay
                loop
                style={styles.lottieAnimation}
              />
              <Text style={styles.splashBrandName}>Mentora</Text>
            </View>
          </Animated.View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
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
    paddingHorizontal: 24,
  },
  splashLogoContainer: {
    alignItems: "center",
    gap: 12,
  },
  splashLogo: {
    fontSize: 100,
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
  lottieAnimation: {
    width: 350,
    height: 350,
  },
});
