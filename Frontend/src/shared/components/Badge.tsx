import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SPACING } from "../theme";

type BadgeVariant = "primary" | "secondary" | "success" | "error" | "warning";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}

export function Badge({ label, variant = "primary" }: BadgeProps) {
  const variantStyles = {
    primary: styles.variantPrimary,
    secondary: styles.variantSecondary,
    success: styles.variantSuccess,
    error: styles.variantError,
    warning: styles.variantWarning,
  };

  const textColors = {
    primary: COLORS.primary,
    secondary: COLORS.secondary,
    success: COLORS.success,
    error: COLORS.error,
    warning: COLORS.warning,
  };

  return (
    <View style={[styles.badge, variantStyles[variant]]}>
      <Text style={[styles.text, { color: textColors[variant] }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.xs,
    borderRadius: 999,
    alignSelf: "flex-start",
  },
  variantPrimary: {
    backgroundColor: "#e0e7ff",
  },
  variantSecondary: {
    backgroundColor: "#fce7f3",
  },
  variantSuccess: {
    backgroundColor: "#d1fae5",
  },
  variantError: {
    backgroundColor: "#fee2e2",
  },
  variantWarning: {
    backgroundColor: "#fef3c7",
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
  },
});
