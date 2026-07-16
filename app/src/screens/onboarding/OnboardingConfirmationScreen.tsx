import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { formatHijriDateAr, gestationalAge, gregorianToHijri } from "@janini/shared";
import { usePregnancyData } from "../../context/PregnancyDataContext";
import { Screen } from "../../components/Screen";
import { ScreenTitle } from "../../components/ScreenTitle";
import { OnboardingStepIndicator } from "../../components/OnboardingStepIndicator";
import { FONTS } from "../../theme/fonts";
import { COLORS } from "../../theme/colors";

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
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel={t("common.back")}
        >
          <Ionicons name="chevron-back" size={24} color="#1C2620" />
        </Pressable>
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

      <Pressable style={styles.button} onPress={onConfirm} disabled={isSubmitting}>
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>{t("onboarding.confirmationCta")}</Text>
        )}
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 16,
    alignItems: "center",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    width: "100%",
    marginBottom: 8,
  },
  skipSpacer: {
    width: 24,
  },
  icon: {
    marginTop: 8,
  },
  card: {
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 4,
    alignItems: "center",
  },
  cardLabel: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.mutedText,
  },
  cardPrimary: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    lineHeight: 26,
    writingDirection: "rtl",
  },
  cardSecondary: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.mutedText,
    writingDirection: "rtl",
  },
  error: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    lineHeight: 20,
    color: "#B3261E",
    textAlign: "center",
    paddingVertical: 4,
  },
  button: {
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontFamily: FONTS.medium,
    fontSize: 16,
  },
});
