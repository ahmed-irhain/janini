import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import { usePregnancyData } from "../context/PregnancyDataContext";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";

/**
 * Three-way route-group switch: signed-out -> (auth), signed-in-without-a-
 * pregnancy -> (onboarding), signed-in-with-a-pregnancy -> (app). While the
 * auth token check is in flight, this returns null to keep the native splash
 * screen up (that gap is normally sub-frame); the pregnancy-data hydration
 * gap happens after the splash is already gone, so it gets a real spinner.
 */
export function RootNavigator() {
  const { t } = useTranslation();
  const { isLoaded, isSignedIn } = useAuth();
  const { isHydrated, pregnancy, loadError, retryLoad } = usePregnancyData();

  if (isSignedIn && loadError) {
    return <ErrorState message={t("common.loadFailed")} onRetry={retryLoad} />;
  }

  if (!isLoaded) return null;
  if (isSignedIn && !isHydrated) return <LoadingState />;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
      <Stack.Protected guard={Boolean(isSignedIn) && pregnancy === null}>
        <Stack.Screen name="(onboarding)" />
      </Stack.Protected>
      <Stack.Protected guard={Boolean(isSignedIn) && pregnancy !== null}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
    </Stack>
  );
}
