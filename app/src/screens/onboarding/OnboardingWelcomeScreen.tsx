import { StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Screen } from "../../components/Screen";
import { LogoMark } from "../../components/LogoMark";
import { Button } from "../../components/Button";
import { COLORS } from "../../theme/colors";
import { SPACING } from "../../theme/spacing";
import { TYPE } from "../../theme/typography";

export function OnboardingWelcomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Screen center backgroundGradient style={styles.content}>
      <LogoMark size={72} />
      <Text style={styles.subtitle}>{t("onboarding.introSubtitle")}</Text>

      <Button label={t("onboarding.startButton")} onPress={() => router.push("/features")} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    gap: SPACING.md,
  },
  subtitle: {
    ...TYPE.body,
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.inkMuted,
    textAlign: "center",
    paddingVertical: SPACING.xs,
    marginBottom: SPACING.xxl,
  },
});
