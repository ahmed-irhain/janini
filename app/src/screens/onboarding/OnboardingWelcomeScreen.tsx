import { Pressable, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Screen } from "../../components/Screen";
import { FONTS } from "../../theme/fonts";
import { COLORS } from "../../theme/colors";

export function OnboardingWelcomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Screen center style={styles.content}>
      <Text style={styles.title}>{t("common.appName")}</Text>
      <Text style={styles.subtitle}>{t("onboarding.introSubtitle")}</Text>

      <Pressable style={styles.button} onPress={() => router.push("/features")}>
        <Text style={styles.buttonText}>{t("onboarding.startButton")}</Text>
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
  button: {
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontFamily: FONTS.medium,
    fontSize: 16,
    textAlign: "center",
  },
});
