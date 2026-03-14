import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { COLORS, SPACING } from "../theme";

interface LoaderProps {
  size?: number;
  color?: string;
  message?: string;
}

export function Loader({
  size = 40,
  color = COLORS.primary,
  message = "Loading...",
}: LoaderProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.base,
  },
  message: {
    marginTop: SPACING.base,
    fontSize: 14,
    color: COLORS.gray600,
    textAlign: "center",
  },
});
