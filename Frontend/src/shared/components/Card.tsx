import React from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Text as RNText,
} from "react-native";
import { COLORS, SPACING } from "../theme";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
  shadow?: boolean;
}

export function Card({
  children,
  style,
  padding = SPACING.base,
  shadow = true,
}: CardProps) {
  return (
    <View
      style={[
        styles.card,
        shadow && styles.shadow,
        { padding },
        style,
      ]}
    >
      {children}
    </View>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  style?: TextStyle;
}

export function CardHeader({ title, subtitle, style }: CardHeaderProps) {
  return (
    <View style={styles.header}>
      <RNText
        style={[styles.headerTitle, style]}
        numberOfLines={2}
      >
        {title}
      </RNText>
      {subtitle && (
        <RNText style={styles.headerSubtitle}>{subtitle}</RNText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginVertical: SPACING.sm,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    marginBottom: SPACING.base,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.dark,
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    fontSize: 12,
    color: COLORS.gray500,
  },
});
