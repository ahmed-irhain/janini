import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { COLORS } from "../../theme/colors";

function ModalCloseButton() {
  const router = useRouter();
  return (
    <Pressable onPress={() => router.back()} hitSlop={8} accessibilityRole="button">
      <Ionicons name="close" size={24} color={COLORS.accent} />
    </Pressable>
  );
}

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="weekly-content/[week]" options={{ headerShown: true, headerTitle: "" }} />
      <Stack.Screen
        name="symptom-log/add"
        options={{
          headerShown: true,
          headerTitle: "",
          presentation: "modal",
          headerLeft: () => <ModalCloseButton />,
        }}
      />
      <Stack.Screen
        name="appointments/add"
        options={{
          headerShown: true,
          headerTitle: "",
          presentation: "modal",
          headerLeft: () => <ModalCloseButton />,
        }}
      />
    </Stack>
  );
}
