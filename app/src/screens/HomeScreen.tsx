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
import { useAuth } from "../context/AuthContext";
import { usePregnancyData } from "../context/PregnancyDataContext";
import { WEEKLY_CONTENT_SEED } from "../data/weeklyContentSeed";
import { RECOMMENDATIONS_SEED } from "../data/recommendationsSeed";
import { getBabySizeEmoji } from "../data/babySizeEmoji";
import { Screen } from "../components/Screen";
import { FONTS } from "../theme/fonts";
import { COLORS } from "../theme/colors";

export function HomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useAuth();
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
      <Text style={styles.welcomeText}>
        {user?.displayName
          ? t("home.welcomeWithName", { name: user.displayName })
          : t("home.welcome")}
      </Text>

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
            {content.babySizeComparisonAr ? (
              <Text style={styles.babySize}>
                {getBabySizeEmoji(currentWeek) ? `${getBabySizeEmoji(currentWeek)} ` : ""}
                {content.babySizeComparisonAr}
              </Text>
            ) : null}
            {content.babyWeightApproxGrams ? (
              <Text style={styles.bodyText}>
                {t("home.weightLabel", { grams: content.babyWeightApproxGrams })}
              </Text>
            ) : null}
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
  content: {
    gap: 16,
  },
  welcomeText: {
    fontSize: 30,
    fontFamily: FONTS.bold,
    lineHeight: 40,
    textAlign: "right",
    paddingVertical: 6,
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
