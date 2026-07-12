import { Tabs, TabList, TabSlot, TabTrigger, TabTriggerSlotProps } from "expo-router/ui";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FONTS } from "../theme/fonts";

const ACTIVE_TINT = "#007AFF";
const INACTIVE_TINT = "#8E8E93";

/**
 * Web fallback tab bar — Native Tabs (used on iOS/Android, see AppTabs.tsx)
 * has no web renderer, so web gets a floating pill built on expo-router/ui's
 * headless Tabs primitives instead.
 */
export function AppTabs() {
  const { t } = useTranslation();

  return (
    <Tabs>
      <TabSlot style={styles.slot} />
      <View style={styles.dock}>
        <TabList asChild>
          <View style={styles.pill}>
            <TabTrigger name="index" href="/" asChild>
              <TabButton>{t("navigation.home")}</TabButton>
            </TabTrigger>
            <TabTrigger name="discover" href="/discover" asChild>
              <TabButton>{t("navigation.discover")}</TabButton>
            </TabTrigger>
            <TabTrigger name="settings" href="/settings" asChild>
              <TabButton>{t("navigation.settings")}</TabButton>
            </TabTrigger>
          </View>
        </TabList>
      </View>
    </Tabs>
  );
}

function TabButton({ children, isFocused, ...props }: TabTriggerSlotProps) {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [styles.tabButton, pressed && styles.pressed]}
    >
      <Text
        style={[
          styles.tabLabel,
          { color: isFocused ? ACTIVE_TINT : INACTIVE_TINT },
        ]}
      >
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  slot: {
    flex: 1,
  },
  dock: {
    position: "absolute",
    bottom: 24,
    width: "100%",
    alignItems: "center",
  },
  pill: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 32,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 4,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  tabLabel: {
    fontSize: 13,
    fontFamily: FONTS.medium,
  },
  pressed: {
    opacity: 0.7,
  },
});
