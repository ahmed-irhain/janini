import { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { formatHijriDateAr, gestationalAge, gregorianToHijri } from "@janini/shared";
import { usePregnancyData } from "../../context/PregnancyDataContext";
import { Screen } from "../../components/Screen";
import { ScreenTitle } from "../../components/ScreenTitle";
import { OnboardingStepIndicator } from "../../components/OnboardingStepIndicator";
import { Button } from "../../components/Button";
import { IconButton } from "../../components/IconButton";
import { FONTS } from "../../theme/fonts";
import { COLORS } from "../../theme/colors";
import { RADIUS } from "../../theme/radius";
import { SPACING } from "../../theme/spacing";

export function OnboardingConfirmationScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { lmp, due } = useLocalSearchParams<{ lmp: string; due: string }>();
  const { savePregnancy } = usePregnancyData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const lmpDate = useMemo(() => new Date(lmp), [lmp]);
  const dueDate = useMemo(() => new Date(due), [due]);
  const { weeks } = useMemo(() => gestationalAge(lmpDate), [lmpDate]);

  const dueDatePrimary = dueDate.toLocaleDateString("ar", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dueDateHijri = formatHijriDateAr(gregorianToHijri(dueDate));

  const onConfirm = async () => {
    setSaveError(null);
    setIsSubmitting(true);
    try {
      await savePregnancy({
        lastMenstrualPeriod: lmpDate.toISOString(),
        dueDateGregorian: dueDate.toISOString(),
      });
    } catch {
      setSaveError(t("validation.saveFailed"));
      setIsSubmitting(false);
    }
  };

  return (
    <Screen center style={styles.content}>
      <View style={styles.topRow}>
        <IconButton icon="chevron-back" onPress={() => router.back()} accessibilityLabel={t("common.back")} />
        <OnboardingStepIndicator currentStep={3} totalSteps={3} />
        <View style={styles.skipSpacer} />
      </View>

      <Ionicons name="sparkles-outline" size={48} color={COLORS.accent} style={styles.icon} />

      <ScreenTitle align="center">
        {t("onboarding.confirmationLeadIn")} {t("home.weekLabel", { week: weeks })}
      </ScreenTitle>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>{t("home.dueDateLabel")}</Text>
        <Text style={styles.cardPrimary}>{dueDatePrimary}</Text>
        <Text style={styles.cardSecondary}>{dueDateHijri}</Text>
      </View>

      {saveError ? <Text style={styles.error}>{saveError}</Text> : null}

      <Button
        label={t("onboarding.confirmationCta")}
        onPress={onConfirm}
        loading={isSubmitting}
        style={styles.button}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: SPACING.lg,
    alignItems: "center",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.lg,
    width: "100%",
    marginBottom: SPACING.sm,
  },
  skipSpacer: {
    width: 44,
  },
  icon: {
    marginTop: SPACING.sm,
  },
  card: {
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md + 2,
    gap: 4,
    alignItems: "center",
  },
  cardLabel: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.inkMuted,
  },
  cardPrimary: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    lineHeight: 23,
    color: COLORS.ink,
    writingDirection: "rtl",
  },
  cardSecondary: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.inkMuted,
    writingDirection: "rtl",
  },
  error: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.error,
    textAlign: "center",
    paddingVertical: 4,
  },
  button: {
    marginTop: SPACING.sm,
  },
});
