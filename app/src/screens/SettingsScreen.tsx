import { useState } from "react";
import { Alert, StyleSheet, Switch, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import Constants from "expo-constants";
import { estimateLmpFromDueDate, formatHijriDateAr, gregorianToHijri } from "@janini/shared";
import { useAuth } from "../context/AuthContext";
import { usePregnancyData } from "../context/PregnancyDataContext";
import { usePreferences } from "../context/PreferencesContext";
import { DateField } from "../components/DateField";
import { Screen } from "../components/Screen";
import { ScreenTitle } from "../components/ScreenTitle";
import { Card } from "../components/Card";
import { SectionHeader } from "../components/SectionHeader";
import { ListRow } from "../components/ListRow";
import { Avatar } from "../components/Avatar";
import { Button } from "../components/Button";
import { FONTS } from "../theme/fonts";
import { COLORS } from "../theme/colors";
import { SPACING } from "../theme/spacing";
import { TYPE } from "../theme/typography";

export function SettingsScreen() {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
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

      <Card style={styles.accountCard}>
        <View style={styles.accountHeader}>
          <Avatar name={user?.displayName ?? user?.email} />
          <View style={styles.accountRows}>
            <ListRow
              label={t("settings.nameLabel")}
              value={user?.displayName ?? t("settings.namePlaceholder")}
            />
            <ListRow label={t("settings.emailLabel")} value={user?.email ?? ""} />
          </View>
        </View>
      </Card>

      {dueDate ? (
        <Card>
          <SectionHeader
            title={t("settings.dueDateSectionTitle")}
            actionLabel={t("settings.editDueDateButton")}
            onActionPress={() => setIsEditingDueDate((prev) => !prev)}
          />
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
        </Card>
      ) : null}

      <Card>
        <View style={styles.switchRow}>
          <Switch
            value={isPremium}
            onValueChange={setIsPremium}
            trackColor={{ true: COLORS.primary700 }}
          />
          <Text style={styles.switchLabel}>{t("settings.premiumToggleLabel")}</Text>
        </View>
      </Card>

      <Card>
        <View style={styles.switchRow}>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ true: COLORS.primary700 }}
          />
          <Text style={styles.switchLabel}>{t("settings.notificationsToggleLabel")}</Text>
        </View>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>{t("settings.aboutSectionTitle")}</Text>
        <Text style={styles.mutedText}>
          {t("settings.versionLabel", { version: Constants.expoConfig?.version ?? "—" })}
        </Text>
        <Text style={styles.bodyText}>{t("settings.disclaimerText")}</Text>
      </Card>

      <Button label={t("settings.resetDataButton")} variant="outline" onPress={onResetLocalData} />

      <Button label={t("settings.signOutButton")} variant="destructive" onPress={() => signOut()} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: SPACING.lg,
  },
  accountCard: {
    gap: 0,
  },
  accountHeader: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: SPACING.md,
  },
  accountRows: {
    flex: 1,
    gap: SPACING.sm + 2,
  },
  sectionTitle: {
    ...TYPE.heading,
    color: COLORS.ink,
    textAlign: "right",
  },
  bodyText: {
    ...TYPE.body,
    color: COLORS.ink,
    textAlign: "right",
  },
  mutedText: {
    ...TYPE.bodySmall,
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
    color: COLORS.ink,
    textAlign: "right",
  },
});
