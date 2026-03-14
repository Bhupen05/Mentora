/**
 * Auth Stack Navigation
 * Handles Splash, Login, Register screens
 * Entry point: splash → login/register → authenticated screens
 */

import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="splash"
    >
      {/* Splash Screen - First screen user sees */}
      <Stack.Screen
        name="splash"
        options={{
          gestureEnabled: false,
        }}
      />

      {/* Login Screen */}
      <Stack.Screen
        name="login"
        options={{
          gestureEnabled: true,
        }}
      />

      {/* Registration Screen */}
      <Stack.Screen
        name="register"
        options={{
          gestureEnabled: true,
        }}
      />
    </Stack>
  );
}
