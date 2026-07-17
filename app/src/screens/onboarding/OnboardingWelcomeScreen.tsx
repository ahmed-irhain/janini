import { Image, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Screen } from "../../components/Screen";
import { LogoMark } from "../../components/LogoMark";
import { Button } from "../../components/Button";
import { COLORS } from "../../theme/colors";
import { RADIUS } from "../../theme/radius";
import { SPACING } from "../../theme/spacing";
import { TYPE } from "../../theme/typography";

export function OnboardingWelcomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Screen center backgroundGradient style={styles.content}>
      <Image
        source={require("../../../assets/illustrations/illu-mother-hero.png")}
        style={styles.heroImage}
        resizeMode="cover"
      />
      <LogoMark size={175} />
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
  heroImage: {
    width: "100%",
    aspectRatio: 620 / 465,
    borderRadius: RADIUS.xl,
    marginBottom: SPACING.md,
  },
  subtitle: {
    ...TYPE.body,
    color: COLORS.inkMuted,
    textAlign: "center",
    paddingVertical: SPACING.xs,
    marginBottom: SPACING.xxl,
  },
});
