import { StyleSheet, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { WEEKLY_CONTENT_SEED } from "../data/weeklyContentSeed";
import { getBabySizeEmoji } from "../data/babySizeEmoji";
import { Screen } from "../components/Screen";
import { FONTS } from "../theme/fonts";

export function WeeklyContentDetailScreen() {
  const { t } = useTranslation();
  const { week } = useLocalSearchParams<{ week: string }>();
  const weekNumber = Number(week);
  const content = WEEKLY_CONTENT_SEED.find((item) => item.weekNumber === weekNumber);

  if (!content) return null;

  return (
    <Screen style={styles.content}>
      <Text style={styles.disclaimer}>{t("discover.disclaimerBanner")}</Text>
      <Text style={styles.weekLabel}>{t("discover.weekRowLabel", { week: content.weekNumber })}</Text>
      <Text style={styles.title}>{content.titleAr}</Text>
      {content.babySizeComparisonAr ? (
        <Text style={styles.babySize}>
          {t("discover.babySizeLabel")}:{" "}
          {getBabySizeEmoji(content.weekNumber) ? `${getBabySizeEmoji(content.weekNumber)} ` : ""}
          {content.babySizeComparisonAr}
        </Text>
      ) : null}
      <Text style={styles.body}>{content.babyChangesAr}</Text>
      {content.momChangesAr ? <Text style={styles.body}>{content.momChangesAr}</Text> : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 12,
  },
  disclaimer: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "right",
    color: "#8A6D3B",
    backgroundColor: "#FFF3CD",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  weekLabel: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    lineHeight: 20,
    color: "#6B7570",
    paddingVertical: 4,
    textAlign: "right",
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    lineHeight: 30,
    paddingVertical: 6,
    textAlign: "right",
  },
  babySize: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    lineHeight: 22,
    color: "#2E7D5B",
    paddingVertical: 4,
    textAlign: "right",
  },
  body: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    lineHeight: 26,
    paddingVertical: 4,
    textAlign: "right",
  },
});
