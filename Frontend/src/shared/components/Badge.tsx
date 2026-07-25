import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SPACING } from "../theme";

type BadgeVariant = "primary" | "secondary" | "success" | "error" | "warning";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  backgroundColor?: string;
  textColor?: string;
}

export function Badge({ label, variant = "primary", backgroundColor, textColor }: BadgeProps) {
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

  const bgColor = backgroundColor || variantStyles[variant].backgroundColor;
  const color = textColor || textColors[variant];

  return (
    <View style={[styles.badge, { backgroundColor: bgColor }]}>
      <Text style={[styles.text, { color }]}>
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
