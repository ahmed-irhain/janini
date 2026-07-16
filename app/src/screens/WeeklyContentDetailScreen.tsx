import { StyleSheet, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { WEEKLY_CONTENT_SEED } from "../data/weeklyContentSeed";
import { getBabySizeEmoji } from "../data/babySizeEmoji";
import { Screen } from "../components/Screen";
import { FONTS } from "../theme/fonts";
import { COLORS } from "../theme/colors";
import { SPACING } from "../theme/spacing";
import { TYPE } from "../theme/typography";

export function WeeklyContentDetailScreen() {
  const { t } = useTranslation();
  const { week } = useLocalSearchParams<{ week: string }>();
  const weekNumber = Number(week);
  const content = WEEKLY_CONTENT_SEED.find((item) => item.weekNumber === weekNumber);

  if (!content) return null;

  return (
    <Screen style={styles.content} hasNativeHeader>
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
    gap: SPACING.md,
  },
  disclaimer: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "right",
    color: COLORS.warningText,
    backgroundColor: COLORS.warningBg,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 8,
  },
  weekLabel: {
    ...TYPE.bodySmall,
    fontFamily: FONTS.medium,
    color: COLORS.mutedText,
    paddingVertical: 4,
    textAlign: "right",
  },
  title: {
    ...TYPE.title,
    fontSize: 22,
    lineHeight: 30,
    color: COLORS.ink,
    paddingVertical: 6,
    textAlign: "right",
  },
  babySize: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.primary700,
    paddingVertical: 4,
    textAlign: "right",
  },
  body: {
    ...TYPE.body,
    fontSize: 16,
    lineHeight: 26,
    color: COLORS.ink,
    paddingVertical: 4,
    textAlign: "right",
  },
});
