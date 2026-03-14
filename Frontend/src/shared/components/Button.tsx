import React from "react";
import { Pressable, Text, StyleSheet, ViewStyle } from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "../theme";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export function Button({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  style,
}: ButtonProps) {
  const sizeStyles = {
    small: styles.sizeSmall,
    medium: styles.sizeMedium,
    large: styles.sizeLarge,
  };

  const variantStyles = {
    primary: styles.variantPrimary,
    secondary: styles.variantSecondary,
    outline: styles.variantOutline,
    danger: styles.variantDanger,
  };

  const textColors = {
    primary: COLORS.white,
    secondary: COLORS.white,
    outline: COLORS.primary,
    danger: COLORS.white,
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        sizeStyles[size],
        variantStyles[variant],
        disabled && styles.disabled,
        pressed && styles.pressed,
        style,
      ]}
    >
      <Text
        style={[styles.text, { color: textColors[variant] }]}
        numberOfLines={1}
      >
        {loading ? "Loading..." : title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  sizeSmall: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
  },
  sizeMedium: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.base,
  },
  sizeLarge: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
  },
  variantPrimary: {
    backgroundColor: COLORS.primary,
  },
  variantSecondary: {
    backgroundColor: COLORS.secondary,
  },
  variantOutline: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },
  variantDanger: {
    backgroundColor: COLORS.error,
  },
  text: {
    ...TYPOGRAPHY.label,
    fontWeight: "600",
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.8,
  },
});
