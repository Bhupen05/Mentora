import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "../theme";

interface HeaderProps {
  title: string;
  subtitle?: string;
  style?: ViewStyle;
  titleStyle?: TextStyle;
}

export function Header({
  title,
  subtitle,
  style,
  titleStyle,
}: HeaderProps) {
  return (
    <View style={[styles.header, style]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: SPACING.base,
    paddingHorizontal: SPACING.base,
    backgroundColor: COLORS.dark,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.white,
  },
  subtitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.gray300,
    marginTop: SPACING.xs,
  },
});
