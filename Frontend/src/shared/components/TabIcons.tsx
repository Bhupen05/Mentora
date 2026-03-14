/**
 * Tab Icons
 * Reusable tab icon components
 */

import React from "react";
import { Text, StyleSheet } from "react-native";

interface TabIconProps {
  focused: boolean;
  size?: number;
}

export const HomeIcon = ({ focused, size = 24 }: TabIconProps) => (
  <Text style={[styles.icon, { fontSize: size }]}>
    {focused ? "🏠" : "🏡"}
  </Text>
);

export const SearchIcon = ({ focused, size = 24 }: TabIconProps) => (
  <Text style={[styles.icon, { fontSize: size }]}>
    {focused ? "🔍" : "🔎"}
  </Text>
);

export const LessonsIcon = ({ focused, size = 24 }: TabIconProps) => (
  <Text style={[styles.icon, { fontSize: size }]}>
    {focused ? "📚" : "📖"}
  </Text>
);

export const QuizzesIcon = ({ focused, size = 24 }: TabIconProps) => (
  <Text style={[styles.icon, { fontSize: size }]}>
    {focused ? "✅" : "❓"}
  </Text>
);

export const ProfileIcon = ({ focused, size = 24 }: TabIconProps) => (
  <Text style={[styles.icon, { fontSize: size }]}>
    {focused ? "👤" : "👥"}
  </Text>
);

export const EarningsIcon = ({ focused, size = 24 }: TabIconProps) => (
  <Text style={[styles.icon, { fontSize: size }]}>
    {focused ? "💰" : "💵"}
  </Text>
);

export const WalletIcon = ({ focused, size = 24 }: TabIconProps) => (
  <Text style={[styles.icon, { fontSize: size }]}>
    {focused ? "👛" : "💳"}
  </Text>
);

const styles = StyleSheet.create({
  icon: {
    textAlign: "center",
  },
});

/**
 * NOTE: To replace with vector icons later, install:
 * npm install react-native-vector-icons set-value
 * Recommended packages:
 * - @react-native-vector-icons/ionicons
 * - react-native-vector-icons
 * - @expo/vector-icons
 */
