import { Stack } from "expo-router";
import { useDeviceIdentity } from "../context/DeviceIdentityContext";
import { usePregnancyData } from "../context/PregnancyDataContext";
import { useEntitlement } from "../context/EntitlementContext";

/**
 * Three-way route-group switch: no pregnancy yet -> (onboarding) (the
 * due-date calculator stays free, unpaywalled); pregnancy exists but no
 * active subscription -> paywall; pregnancy exists and entitled -> (app).
 * There is no sign-in gate — DeviceIdentityContext identifies the install
 * invisibly. Returning null keeps the native splash screen up while the
 * device id/pregnancy data/entitlement are still loading.
 */
export function RootNavigator() {
  const { isLoaded } = useDeviceIdentity();
  const { isHydrated, pregnancy } = usePregnancyData();
  const { isLoaded: entitlementLoaded, isEntitled } = useEntitlement();

  if (!isLoaded || !isHydrated || !entitlementLoaded) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={pregnancy === null}>
        <Stack.Screen name="(onboarding)" />
      </Stack.Protected>
      <Stack.Protected guard={pregnancy !== null && !isEntitled}>
        <Stack.Screen name="paywall" />
      </Stack.Protected>
      <Stack.Protected guard={pregnancy !== null && isEntitled}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
    </Stack>
  );
}
