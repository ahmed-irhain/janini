import { Stack } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { usePregnancyData } from "../context/PregnancyDataContext";

/**
 * Three-way route-group switch: signed-out -> (auth), signed-in-without-a-
 * pregnancy -> (onboarding), signed-in-with-a-pregnancy -> (app). Returning
 * null keeps the native splash screen up while auth/data are still loading.
 */
export function RootNavigator() {
  const { isLoaded, isSignedIn } = useAuth();
  const { isHydrated, pregnancy } = usePregnancyData();

  if (!isLoaded || (isSignedIn && !isHydrated)) return null;

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
