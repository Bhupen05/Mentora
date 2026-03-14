/**
 * Student Dashboard Feature Routes
 * Nested screens within student tab navigation
 */

import { Stack } from "expo-router";

export default function DashboardLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
