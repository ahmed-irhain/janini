import { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { estimateDueDate, estimateLmpFromDueDate } from "@janini/shared";
import { DateField } from "../../components/DateField";
import { Screen } from "../../components/Screen";
import { ScreenTitle } from "../../components/ScreenTitle";
import { OnboardingStepIndicator } from "../../components/OnboardingStepIndicator";
import { Button } from "../../components/Button";
import { Chip } from "../../components/Chip";
import { IconButton } from "../../components/IconButton";
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
        <IconButton icon="chevron-back" onPress={() => router.back()} accessibilityLabel={t("common.back")} />
        <OnboardingStepIndicator currentStep={2} totalSteps={3} />
        <View style={styles.skipSpacer} />
      </View>

      <ScreenTitle align="center">{t("onboarding.title")}</ScreenTitle>

      <View style={styles.toggleRow}>
        <Chip
          label={t("onboarding.lmpModeLabel")}
          selected={mode === "lmp"}
          onPress={() => onModeChange("lmp")}
        />
        <Chip
          label={t("onboarding.dueDateModeLabel")}
          selected={mode === "dueDate"}
          onPress={() => onModeChange("dueDate")}
        />
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
    gap: SPACING.lg,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  skipSpacer: {
    width: 44,
  },
  toggleRow: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  privacyNote: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.inkMuted,
    textAlign: "center",
    paddingVertical: 4,
  },
  button: {
    marginTop: SPACING.lg,
  },
});
