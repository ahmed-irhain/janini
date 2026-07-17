import { Stack, useRouter } from "expo-router";
import { IconButton } from "../../components/IconButton";

function ModalCloseButton() {
  const router = useRouter();
  return (
    <IconButton icon="close" onPress={() => router.back()} accessibilityLabel="إغلاق" size={36} />
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
