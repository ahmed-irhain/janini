import { Pressable, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Screen } from "../../components/Screen";
import { FONTS } from "../../theme/fonts";

export function WelcomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Screen center style={styles.content}>
      <Text style={styles.title}>{t("common.appName")}</Text>
      <Text style={styles.subtitle}>{t("auth.welcomeSubtitle")}</Text>

      <Pressable style={styles.primaryButton} onPress={() => router.push("/sign-up")}>
        <Text style={styles.primaryButtonText}>{t("auth.signUpCta")}</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={() => router.push("/sign-in")}>
        <Text style={styles.secondaryButtonText}>{t("auth.signInCta")}</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontFamily: FONTS.bold,
    lineHeight: 38,
    paddingVertical: 6,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    lineHeight: 24,
    textAlign: "center",
    paddingVertical: 4,
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: "#2E7D5B",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: "100%",
  },
  primaryButtonText: {
    color: "#fff",
    fontFamily: FONTS.medium,
    fontSize: 16,
    textAlign: "center",
  },
  secondaryButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    width: "100%",
  },
  secondaryButtonText: {
    color: "#2E7D5B",
    fontFamily: FONTS.medium,
    fontSize: 16,
    textAlign: "center",
  },
});
