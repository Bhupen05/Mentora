import { Stack } from "expo-router";
import { COLORS } from "@/shared/theme";

export default function LessonsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: COLORS.white,
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="[id]/index" />
    </Stack>
  );
}
