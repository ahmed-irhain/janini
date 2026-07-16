import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  formatHijriDateAr,
  gestationalAge,
  gestationalMonth,
  gregorianToHijri,
  pregnancyProgress,
} from "@janini/shared";
import { usePregnancyData } from "../context/PregnancyDataContext";
import { WEEKLY_CONTENT_SEED } from "../data/weeklyContentSeed";
import { RECOMMENDATIONS_SEED } from "../data/recommendationsSeed";
import { getBabySizeEmoji } from "../data/babySizeEmoji";
import { Screen } from "../components/Screen";
import { ScreenTitle } from "../components/ScreenTitle";
import { FONTS } from "../theme/fonts";
import { COLORS } from "../theme/colors";

export function HomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { pregnancy } = usePregnancyData();

  // Guaranteed non-null: Home only renders inside the (app) route group,
  // which RootNavigator only allows once a pregnancy exists.
  if (!pregnancy) return null;

  const { weeks: currentWeek } = gestationalAge(new Date(pregnancy.lastMenstrualPeriod));
  const currentMonth = gestationalMonth(Math.max(1, currentWeek));
  const dueDate = new Date(pregnancy.dueDateGregorian);
  const hijriDueDate = gregorianToHijri(dueDate);
  const { percent, daysRemaining } = pregnancyProgress(dueDate);

  const content = WEEKLY_CONTENT_SEED.find((item) => item.weekNumber === currentWeek);
  const recommendations = RECOMMENDATIONS_SEED.filter(
    (item) => item.weekNumber === currentWeek
  ).slice(0, 3);

  return (
    <Screen style={styles.content}>
      <ScreenTitle style={styles.title}>{t("home.welcome")}</ScreenTitle>

      <View style={styles.card}>
        <Text style={styles.weekMonthLabel}>
          {t("home.weekLabel", { week: currentWeek })} · {t("home.monthLabel", { month: currentMonth })}
        </Text>

        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${percent}%` }]} />
        </View>
        <Text style={styles.progressCaption}>
          {t("home.dueInDaysLabel", { days: daysRemaining })}
        </Text>

        <Text style={styles.dueDateLabel}>{t("home.dueDateLabel")}</Text>
        <Text style={styles.bodyText}>
          {dueDate.toLocaleDateString("ar")} · {formatHijriDateAr(hijriDueDate)}
        </Text>
      </View>

      {content ? (
        <>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>{t("home.babySizeSectionTitle")}</Text>
            <View style={styles.babySizeRow}>
              {getBabySizeEmoji(currentWeek) ? (
                <View style={styles.babySizeEmojiWrap}>
                  <Text style={styles.babySizeEmoji}>{getBabySizeEmoji(currentWeek)}</Text>
                </View>
              ) : null}
              <View style={styles.babySizeTextContainer}>
                {content.babySizeComparisonAr ? (
                  <Text style={styles.babySize}>{content.babySizeComparisonAr}</Text>
                ) : null}
                {content.babyWeightApproxGrams ? (
                  <Text style={styles.bodyText}>
                    {t("home.weightLabel", { grams: content.babyWeightApproxGrams })}
                  </Text>
                ) : null}
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>{t("home.babyChangesTitle")}</Text>
            <Text style={styles.bodyText}>{content.babyChangesAr}</Text>
          </View>

          {content.momChangesAr ? (
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>{t("home.momChangesTitle")}</Text>
              <Text style={styles.bodyText}>{content.momChangesAr}</Text>
            </View>
          ) : null}

          {recommendations.length > 0 ? (
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>{t("home.recommendationsTitle")}</Text>
              {recommendations.map((tip) => (
                <Text key={tip.id} style={styles.tip}>
                  {"• "}
                  {tip.textAr}
                </Text>
              ))}
              <Pressable onPress={() => router.push(`/weekly-content/${currentWeek}`)}>
                <Text style={styles.linkButton}>{t("home.viewFullWeekButton")}</Text>
              </Pressable>
            </View>
          ) : null}
        </>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    padding: 15,
  },
  content: {
    gap: 16,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 16,
    gap: 8,
  },
  weekMonthLabel: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    lineHeight: 26,
    textAlign: "right",
  },
  progressTrack: {
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.progressTrack,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 5,
    backgroundColor: COLORS.accent,
  },
  progressCaption: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.mutedText,
    textAlign: "right",
  },
  dueDateLabel: {
    fontFamily: FONTS.medium,
    paddingTop: 8,
    textAlign: "right",
  },
  bodyText: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    lineHeight: 22,
    textAlign: "right",
  },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    lineHeight: 22,
    textAlign: "right",
  },
  babySizeRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 12,
  },
  babySizeEmojiWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.accentSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  babySizeEmoji: {
    fontSize: 36,
  },
  babySizeTextContainer: {
    flex: 1,
    gap: 4,
  },
  babySize: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.accent,
    textAlign: "right",
  },
  tip: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    lineHeight: 22,
    textAlign: "right",
  },
  linkButton: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.accent,
    paddingTop: 4,
    textAlign: "right",
  },
});
