import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { useDeviceIdentity } from "../context/DeviceIdentityContext";
import { usePregnancyData } from "../context/PregnancyDataContext";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";

/**
 * Two-way route-group switch: no pregnancy yet -> (onboarding), pregnancy
 * exists -> (app). There is no sign-in gate — DeviceIdentityContext
 * identifies the install invisibly. Returning null keeps the native splash
 * screen up while the device id is still loading (that gap is normally
 * sub-frame); the pregnancy-data hydration gap happens after the splash is
 * already gone, so it gets a real spinner (or an error state with retry if
 * it fails).
 */
export function RootNavigator() {
  const { t } = useTranslation();
  const { isLoaded } = useDeviceIdentity();
  const { isHydrated, pregnancy, loadError, retryLoad } = usePregnancyData();

  if (!isLoaded) return null;
  if (loadError) return <ErrorState message={t("common.loadFailed")} onRetry={retryLoad} />;
  if (!isHydrated) return <LoadingState />;

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
