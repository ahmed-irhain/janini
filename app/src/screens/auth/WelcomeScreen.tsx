import { StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Screen } from "../../components/Screen";
import { LogoMark } from "../../components/LogoMark";
import { Button } from "../../components/Button";
import { COLORS } from "../../theme/colors";
import { SPACING } from "../../theme/spacing";
import { TYPE } from "../../theme/typography";

export function WelcomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Screen center style={styles.content}>
      <LogoMark size={80} />
      <Text style={styles.subtitle}>{t("auth.welcomeSubtitle")}</Text>

      <Button label={t("auth.signUpCta")} onPress={() => router.push("/sign-up")} />
      <Button
        label={t("auth.signInCta")}
        variant="tonal"
        onPress={() => router.push("/sign-in")}
      />
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
    color: COLORS.mutedText,
    textAlign: "center",
    paddingVertical: SPACING.xs,
    marginBottom: SPACING.xxl,
  },
});
