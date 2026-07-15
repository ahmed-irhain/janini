import { Pressable, StyleSheet, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import { Screen } from "../components/Screen";
import { FONTS } from "../theme/fonts";

export function SettingsScreen() {
  const { t } = useTranslation();
  const { signOut } = useAuth();

  return (
    <Screen center style={styles.content}>
      <Text style={styles.title}>{t("settings.title")}</Text>

      <Pressable style={styles.signOutButton} onPress={() => signOut()}>
        <Text style={styles.signOutButtonText}>{t("settings.signOutButton")}</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    lineHeight: 32,
    paddingVertical: 6,
  },
  signOutButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#B3261E",
  },
  signOutButtonText: {
    color: "#B3261E",
    fontFamily: FONTS.medium,
    fontSize: 16,
  },
});
