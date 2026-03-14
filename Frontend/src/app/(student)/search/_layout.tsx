/**
 * Student Search Feature Routes
 * Nested screens for mentor search
 */

import { Stack } from "expo-router";

export default function SearchLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[mentorId]" />
      <Stack.Screen name="booking/[mentorId]" />
    </Stack>
  );
}
