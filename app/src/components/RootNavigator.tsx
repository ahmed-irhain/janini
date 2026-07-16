import { Stack } from "expo-router";
import { useDeviceIdentity } from "../context/DeviceIdentityContext";
import { usePregnancyData } from "../context/PregnancyDataContext";

/**
 * Two-way route-group switch: no pregnancy yet -> (onboarding), pregnancy
 * exists -> (app). There is no sign-in gate — DeviceIdentityContext
 * identifies the install invisibly. Returning null keeps the native splash
 * screen up while the device id/data are still loading.
 */
export function RootNavigator() {
  const { isLoaded } = useDeviceIdentity();
  const { isHydrated, pregnancy } = usePregnancyData();

  if (!isLoaded || !isHydrated) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={pregnancy === null}>
        <Stack.Screen name="(onboarding)" />
      </Stack.Protected>
      <Stack.Protected guard={pregnancy !== null}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
    </Stack>
  );
}
