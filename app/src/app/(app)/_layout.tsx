import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { COLORS } from "../../theme/colors";

function ModalCloseButton() {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.back()}
      hitSlop={8}
      accessibilityRole="button"
      style={styles.closeButton}
    >
      <Ionicons name="close" size={20} color={COLORS.accent} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.accentSoft,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="weekly-content/[week]" options={{ headerShown: true, headerTitle: "" }} />
      <Stack.Screen name="articles/[id]" options={{ headerShown: true, headerTitle: "" }} />
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
        name="symptom-log/[id]"
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
      <Stack.Screen
        name="appointments/[id]"
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
