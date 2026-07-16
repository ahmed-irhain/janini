import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { estimateDueDate, estimateLmpFromDueDate } from "@janini/shared";
import { DateField } from "../../components/DateField";
import { Screen } from "../../components/Screen";
import { ScreenTitle } from "../../components/ScreenTitle";
import { OnboardingStepIndicator } from "../../components/OnboardingStepIndicator";
import { Button } from "../../components/Button";
import { FONTS } from "../../theme/fonts";
import { COLORS } from "../../theme/colors";
import { SPACING } from "../../theme/spacing";

type EntryMode = "lmp" | "dueDate";

const BOUND_DAYS_MS = 300 * 24 * 60 * 60 * 1000;

export function LmpEntryScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [mode, setMode] = useState<EntryMode>("lmp");
  const [date, setDate] = useState(new Date());

  const today = useMemo(() => new Date(), []);
  const earliestLmp = useMemo(() => new Date(today.getTime() - BOUND_DAYS_MS), [today]);
  const latestDueDate = useMemo(() => new Date(today.getTime() + BOUND_DAYS_MS), [today]);

  const onModeChange = (nextMode: EntryMode) => {
    setMode(nextMode);
    setDate(today);
  };

  const onSubmit = () => {
    const lastMenstrualPeriod = mode === "lmp" ? date : estimateLmpFromDueDate(date);
    const dueDateGregorian = mode === "lmp" ? estimateDueDate(date) : date;
    router.push({
      pathname: "/confirmation",
      params: {
        lmp: lastMenstrualPeriod.toISOString(),
        due: dueDateGregorian.toISOString(),
      },
    });
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
          <Ionicons name="chevron-back" size={24} color={COLORS.ink} />
        </Pressable>
        <OnboardingStepIndicator currentStep={2} totalSteps={3} />
        <View style={styles.skipSpacer} />
      </View>

      <ScreenTitle align="center">{t("onboarding.title")}</ScreenTitle>

      <View style={styles.toggleRow}>
        <Pressable
          style={[styles.toggleButton, mode === "lmp" && styles.toggleButtonActive]}
          onPress={() => onModeChange("lmp")}
        >
          <Text style={[styles.toggleLabel, mode === "lmp" && styles.toggleLabelActive]}>
            {t("onboarding.lmpModeLabel")}
          </Text>
        </Pressable>
        <Pressable
          style={[styles.toggleButton, mode === "dueDate" && styles.toggleButtonActive]}
          onPress={() => onModeChange("dueDate")}
        >
          <Text style={[styles.toggleLabel, mode === "dueDate" && styles.toggleLabelActive]}>
            {t("onboarding.dueDateModeLabel")}
          </Text>
        </Pressable>
      </View>

      <DateField
        label={t("onboarding.datePickerLabel")}
        value={date}
        mode="date"
        minimumDate={mode === "lmp" ? earliestLmp : today}
        maximumDate={mode === "lmp" ? today : latestDueDate}
        onChange={setDate}
      />

      <Text style={styles.privacyNote}>{t("onboarding.dataPrivacyNote")}</Text>

      <Button label={t("onboarding.continueButton")} onPress={onSubmit} style={styles.button} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 16,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 8,
  },
  skipSpacer: {
    width: 24,
  },
  toggleRow: {
    flexDirection: "row",
    gap: 8,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.accent,
    alignItems: "center",
  },
  toggleButtonActive: {
    backgroundColor: COLORS.accent,
  },
  toggleLabel: {
    fontFamily: FONTS.medium,
    lineHeight: 20,
    color: COLORS.accent,
  },
  toggleLabelActive: {
    color: "#fff",
  },
  privacyNote: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.mutedText,
    textAlign: "center",
    paddingVertical: 4,
  },
  button: {
    marginTop: SPACING.lg,
  },
});
