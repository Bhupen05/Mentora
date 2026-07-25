import { Stack } from "expo-router";
import { COLORS } from "@/shared/theme";

export default function LessonDetailLayout() {
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
    </Stack>
  );
}
