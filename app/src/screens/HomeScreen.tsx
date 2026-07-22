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
import { Card } from "../components/Card";
import { HeroPanel } from "../components/HeroPanel";
import { ProgressBar } from "../components/ProgressBar";
import { LoadingState } from "../components/LoadingState";
import { FONTS } from "../theme/fonts";
import { COLORS } from "../theme/colors";
import { SPACING } from "../theme/spacing";
import { TYPE } from "../theme/typography";

export function HomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { pregnancy } = usePregnancyData();

  // Home only renders inside the (app) route group, which RootNavigator only
  // allows once a pregnancy exists — this is a defensive fallback for the
  // brief window between that guard flipping and this screen's re-render.
  if (!pregnancy) return <LoadingState />;

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
    <Screen style={styles.content} insetsBottomTabBar>
      <ScreenTitle>{t("home.welcome")}</ScreenTitle>

      {/* One hero-panel per screen (design.md) — the single standout feature
          moment: this week/month + due-date progress. */}
      <HeroPanel>
        <Text style={styles.weekMonthLabel}>
          {t("home.weekLabel", { week: currentWeek })} · {t("home.monthLabel", { month: currentMonth })}
        </Text>

        <ProgressBar percent={percent} tone="onPrimary" />
        <Text style={styles.progressCaption}>
          {t("home.dueInDaysLabel", { days: daysRemaining })}
        </Text>

        <Text style={styles.dueDateLabel}>{t("home.dueDateLabel")}</Text>
        <Text style={styles.heroBodyText}>
          {dueDate.toLocaleDateString("ar")} · {formatHijriDateAr(hijriDueDate)}
        </Text>
      </HeroPanel>

      {content ? (
        <>
          <Card>
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
          </Card>

          <Card>
            <Text style={styles.sectionTitle}>{t("home.babyChangesTitle")}</Text>
            <Text style={styles.bodyText}>{content.babyChangesAr}</Text>
          </Card>

          {content.momChangesAr ? (
            <Card>
              <Text style={styles.sectionTitle}>{t("home.momChangesTitle")}</Text>
              <Text style={styles.bodyText}>{content.momChangesAr}</Text>
            </Card>
          ) : null}

          {recommendations.length > 0 ? (
            <Card>
              <Text style={styles.sectionTitle}>{t("home.recommendationsTitle")}</Text>
              {recommendations.map((tip) => (
                <Text key={tip.id} style={styles.tip}>
                  {"• "}
                  {tip.textAr}
                </Text>
              ))}
              <Pressable onPress={() => router.push(`/weekly-content/${currentWeek}`)} hitSlop={4}>
                <Text style={styles.linkButton}>{t("home.viewFullWeekButton")}</Text>
              </Pressable>
            </Card>
          ) : null}
        </>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: SPACING.lg,
  },
  weekMonthLabel: {
    ...TYPE.h2,
    fontSize: 16,
    lineHeight: 23,
    color: COLORS.onPrimary,
    textAlign: "right",
    paddingVertical: SPACING.xs,
  },
  progressCaption: {
    ...TYPE.bodySmall,
    color: COLORS.onPrimary,
    opacity: 0.85,
    textAlign: "right",
    paddingVertical: SPACING.xs,
  },
  dueDateLabel: {
    fontFamily: FONTS.medium,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xs,
    color: COLORS.onPrimary,
    textAlign: "right",
  },
  heroBodyText: {
    ...TYPE.body,
    color: COLORS.onPrimary,
    textAlign: "right",
    paddingVertical: SPACING.xs,
  },
  bodyText: {
    ...TYPE.body,
    color: COLORS.ink,
    textAlign: "right",
    paddingVertical: SPACING.xs,
  },
  sectionTitle: {
    ...TYPE.h2,
    color: COLORS.ink,
    textAlign: "right",
    paddingVertical: SPACING.xs,
  },
  babySizeRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: SPACING.md,
  },
  babySizeEmojiWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
  },
  babySizeEmoji: {
    fontSize: 32,
  },
  babySizeTextContainer: {
    flex: 1,
    gap: SPACING.xs,
  },
  babySize: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.primary,
    textAlign: "right",
    paddingVertical: SPACING.xs,
  },
  tip: {
    ...TYPE.bodySmall,
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.ink,
    textAlign: "right",
    paddingVertical: SPACING.xs,
  },
  linkButton: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.primary,
    paddingTop: SPACING.xs,
    paddingBottom: SPACING.xs,
    textAlign: "right",
  },
});
