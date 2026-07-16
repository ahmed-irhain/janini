import "../i18n";
import { useEffect } from "react";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context";
import { DeviceIdentityProvider } from "../context/DeviceIdentityContext";
import { PregnancyDataProvider } from "../context/PregnancyDataContext";
import { PreferencesProvider } from "../context/PreferencesContext";
import { RootNavigator } from "../components/RootNavigator";
import { FONTS } from "../theme/fonts";
import { LATIN_FONTS } from "../theme/typography";

SplashScreen.preventAutoHideAsync();

if (!process.env.EXPO_PUBLIC_API_URL) {
  throw new Error(
    "Missing EXPO_PUBLIC_API_URL — copy app/.env.example to app/.env and set it to your dev " +
      "machine's LAN IP (e.g. http://192.168.1.23:3000). 'localhost' will not work from a " +
      "physical iPhone running Expo Go."
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    [FONTS.light]: require("../../assets/fonts/ThmanyahSans-Light.otf"),
    [FONTS.regular]: require("../../assets/fonts/ThmanyahSans-Regular.otf"),
    [FONTS.medium]: require("../../assets/fonts/ThmanyahSans-Medium.otf"),
    [FONTS.bold]: require("../../assets/fonts/ThmanyahSans-Bold.otf"),
    [FONTS.black]: require("../../assets/fonts/ThmanyahSans-Black.otf"),
    [LATIN_FONTS.regular]: require("../../assets/fonts/Manrope-Regular.ttf"),
    [LATIN_FONTS.medium]: require("../../assets/fonts/Manrope-Medium.ttf"),
    [LATIN_FONTS.bold]: require("../../assets/fonts/Manrope-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <DeviceIdentityProvider>
        <ThemeProvider value={DefaultTheme}>
          <PregnancyDataProvider>
            <PreferencesProvider>
              <RootNavigator />
            </PreferencesProvider>
          </PregnancyDataProvider>
        </ThemeProvider>
      </DeviceIdentityProvider>
    </SafeAreaProvider>
  );
}
