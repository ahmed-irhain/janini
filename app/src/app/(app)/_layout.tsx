import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="weekly-content/[week]" />
      <Stack.Screen name="articles/[id]" />
      <Stack.Screen name="symptom-log/add" options={{ presentation: "modal" }} />
      <Stack.Screen name="symptom-log/[id]" options={{ presentation: "modal" }} />
      <Stack.Screen name="appointments/add" options={{ presentation: "modal" }} />
      <Stack.Screen name="appointments/[id]" options={{ presentation: "modal" }} />
    </Stack>
  );
}
