import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { useDeviceIdentity } from "../context/DeviceIdentityContext";
import { usePregnancyData } from "../context/PregnancyDataContext";
import { useEntitlement } from "../context/EntitlementContext";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";

/**
 * Three-way route-group switch: no pregnancy yet -> (onboarding) (the
 * due-date calculator stays free, unpaywalled); pregnancy exists but no
 * active subscription -> paywall; pregnancy exists and entitled -> (app).
 * There is no sign-in gate — DeviceIdentityContext identifies the install
 * invisibly. Returning null keeps the native splash screen up while the
 * device id is still loading (that gap is normally sub-frame); the
 * pregnancy-data hydration gap happens after the splash is already gone, so
 * it gets a real spinner (or an error state with retry if it fails).
 * Entitlement resolves from RevenueCat's local cache, which is fast enough
 * not to need its own loading state distinct from the spinner above.
 */
export function RootNavigator() {
  const { t } = useTranslation();
  const { isLoaded } = useDeviceIdentity();
  const { isHydrated, pregnancy, loadError, retryLoad } = usePregnancyData();
  const { isLoaded: entitlementLoaded, isEntitled } = useEntitlement();

  if (!isLoaded) return null;
  if (loadError) return <ErrorState message={t("common.loadFailed")} onRetry={retryLoad} />;
  if (!isHydrated || !entitlementLoaded) return <LoadingState />;

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
