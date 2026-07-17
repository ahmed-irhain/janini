import Ionicons from "@expo/vector-icons/Ionicons";
import { Icon, Label, NativeTabs, VectorIcon } from "expo-router/unstable-native-tabs";
import { useTranslation } from "react-i18next";
import { FONTS } from "../theme/fonts";
import { COLORS } from "../theme/colors";

/**
 * Native tab bar (iOS/Android) via Expo Router's Native Tabs — a real
 * UITabBarController/Android bottom nav, not a JS-rendered bar. `tintColor`
 * is the closest native-chrome analogue to design.md's `tab-bar-item-active`
 * token (a custom filled circle isn't achievable through this API).
 * `AppTabs.web.tsx` is the web-only fallback, since Native Tabs has no web renderer.
 */
export function AppTabs() {
  const { t } = useTranslation();

  return (
    <NativeTabs tintColor={COLORS.primary} labelStyle={{ fontFamily: FONTS.medium }}>
      <NativeTabs.Trigger name="index">
        <Icon sf="house.fill" androidSrc={<VectorIcon family={Ionicons} name="home" />} />
        <Label>{t("navigation.home")}</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="discover">
        <Icon sf="safari.fill" androidSrc={<VectorIcon family={Ionicons} name="compass" />} />
        <Label>{t("navigation.discover")}</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="track">
        <Icon sf="heart.text.square.fill" androidSrc={<VectorIcon family={Ionicons} name="pulse" />} />
        <Label>{t("navigation.track")}</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="settings">
        <Icon sf="gearshape.fill" androidSrc={<VectorIcon family={Ionicons} name="settings" />} />
        <Label>{t("navigation.settings")}</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
