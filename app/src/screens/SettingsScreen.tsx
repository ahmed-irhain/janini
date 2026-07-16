import { useState } from "react";
import { Alert, Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import Constants from "expo-constants";
import { estimateLmpFromDueDate, formatHijriDateAr, gregorianToHijri } from "@janini/shared";
import { usePregnancyData } from "../context/PregnancyDataContext";
import { usePreferences } from "../context/PreferencesContext";
import { DateField } from "../components/DateField";
import { Screen } from "../components/Screen";
import { ScreenTitle } from "../components/ScreenTitle";
import { FONTS } from "../theme/fonts";
import { COLORS } from "../theme/colors";

export function SettingsScreen() {
  const { t } = useTranslation();
  const { pregnancy, savePregnancy, resetLocalData } = usePregnancyData();
  const { isPremium, notificationsEnabled, setIsPremium, setNotificationsEnabled } =
    usePreferences();
  const [isEditingDueDate, setIsEditingDueDate] = useState(false);

  const dueDate = pregnancy ? new Date(pregnancy.dueDateGregorian) : null;

  const onDueDateChange = (nextDueDate: Date) => {
    setIsEditingDueDate(false);
    savePregnancy({
      lastMenstrualPeriod: estimateLmpFromDueDate(nextDueDate).toISOString(),
      dueDateGregorian: nextDueDate.toISOString(),
    });
  };

  const onResetLocalData = () => {
    Alert.alert(t("settings.resetConfirmTitle"), t("settings.resetConfirmMessage"), [
      { text: t("common.cancel"), style: "cancel" },
      {
        text: t("settings.resetConfirmButton"),
        style: "destructive",
        onPress: () => resetLocalData(),
      },
    ]);
  };

  return (
    <Screen style={styles.content}>
      <ScreenTitle align="right">{t("settings.title")}</ScreenTitle>

      {dueDate ? (
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Pressable onPress={() => setIsEditingDueDate((prev) => !prev)}>
              <Text style={styles.editLink}>{t("settings.editDueDateButton")}</Text>
            </Pressable>
            <Text style={styles.sectionTitle}>{t("settings.dueDateSectionTitle")}</Text>
          </View>
          {isEditingDueDate ? (
            <DateField
              label={t("settings.dueDateSectionTitle")}
              value={dueDate}
              mode="date"
              minimumDate={new Date()}
              onChange={onDueDateChange}
            />
          ) : (
            <>
              <Text style={styles.bodyText}>
                {dueDate.toLocaleDateString("ar", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
              <Text style={styles.mutedText}>{formatHijriDateAr(gregorianToHijri(dueDate))}</Text>
            </>
          )}
        </View>
      ) : null}

      <View style={styles.card}>
        <View style={styles.switchRow}>
          <Switch
            value={isPremium}
            onValueChange={setIsPremium}
            trackColor={{ true: COLORS.accent }}
          />
          <Text style={styles.switchLabel}>{t("settings.premiumToggleLabel")}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.switchRow}>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ true: COLORS.accent }}
          />
          <Text style={styles.switchLabel}>{t("settings.notificationsToggleLabel")}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>{t("settings.aboutSectionTitle")}</Text>
        <Text style={styles.mutedText}>
          {t("settings.versionLabel", { version: Constants.expoConfig?.version ?? "—" })}
        </Text>
        <Text style={styles.bodyText}>{t("settings.disclaimerText")}</Text>
      </View>

      <Pressable style={styles.resetButton} onPress={onResetLocalData}>
        <Text style={styles.resetButtonText}>{t("settings.resetDataButton")}</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 16,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 16,
    gap: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    lineHeight: 22,
    textAlign: "right",
  },
  editLink: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.accent,
  },
  bodyText: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    lineHeight: 22,
    textAlign: "right",
  },
  mutedText: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.mutedText,
    textAlign: "right",
  },
  switchRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  switchLabel: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    lineHeight: 22,
    textAlign: "right",
  },
  resetButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
  },
  resetButtonText: {
    color: COLORS.mutedText,
    fontFamily: FONTS.medium,
    fontSize: 16,
  },
});
