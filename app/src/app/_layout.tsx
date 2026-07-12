import "../i18n";
import { useEffect } from "react";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AppTabs } from "../components/AppTabs";
import { FONTS } from "../theme/fonts";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    [FONTS.light]: require("../../assets/fonts/ThmanyahSans-Light.otf"),
    [FONTS.regular]: require("../../assets/fonts/ThmanyahSans-Regular.otf"),
    [FONTS.medium]: require("../../assets/fonts/ThmanyahSans-Medium.otf"),
    [FONTS.bold]: require("../../assets/fonts/ThmanyahSans-Bold.otf"),
    [FONTS.black]: require("../../assets/fonts/ThmanyahSans-Black.otf"),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider value={DefaultTheme}>
      <AppTabs />
    </ThemeProvider>
  );
}
