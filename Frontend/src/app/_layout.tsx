/**
 * Root Navigation Layout
 * Expo Router configuration for app navigation
 * Entry point: splash → auth → role-based dashboard
 * 
 * Navigation flow:
 * 1. App loads with AuthProvider
 * 2. AuthContext checks if user is authenticated
 * 3. If not authenticated: Show auth stack (splash → login/register)
 * 4. If authenticated: Show role-based stack (student/mentor/parent)
 * 5. User can logout from profile screen to return to auth stack
 */

import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "@/shared/context/AuthContext";

function RootLayoutContent() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // Splash screen will be shown while loading
    return (
      <Stack
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="auth"
      >
        <Stack.Screen name="auth" options={{ gestureEnabled: false }} />
      </Stack>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={isAuthenticated ? "authenticated" : "auth"}
    >
      {/* Auth Stack - For unauthenticated users */}
      {!isAuthenticated && (
        <Stack.Screen
          name="auth"
          options={{
            gestureEnabled: false, // Prevent swiping back from auth stack
          }}
        />
      )}

      {/* Role-based Stacks - For authenticated users */}
      {isAuthenticated && (
        <>
          <Stack.Screen
            name="(student)"
            options={{ gestureEnabled: true }}
          />
          <Stack.Screen
            name="(mentor)"
            options={{ gestureEnabled: true }}
          />
          <Stack.Screen
            name="(parent)"
            options={{ gestureEnabled: true }}
          />
          <Stack.Screen
            name="index"
            options={{ gestureEnabled: true }}
          />
        </>
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutContent />
    </AuthProvider>
  );
}
