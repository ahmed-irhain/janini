import { StyleSheet, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { WEEKLY_CONTENT_SEED } from "../data/weeklyContentSeed";
import { getBabySizeEmoji } from "../data/babySizeEmoji";
import { Screen } from "../components/Screen";
import { ErrorState } from "../components/ErrorState";
import { FONTS } from "../theme/fonts";
import { COLORS, withAlpha } from "../theme/colors";
import { RADIUS } from "../theme/radius";
import { SPACING } from "../theme/spacing";
import { TYPE } from "../theme/typography";

export function WeeklyContentDetailScreen() {
  const { t } = useTranslation();
  const { week } = useLocalSearchParams<{ week: string }>();
  const weekNumber = Number(week);
  const content = WEEKLY_CONTENT_SEED.find((item) => item.weekNumber === weekNumber);

  if (!content) return <ErrorState message={t("discover.contentNotFound")} />;

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
    fontSize: 11,
    lineHeight: 16,
    textAlign: "right",
    color: COLORS.warning,
    backgroundColor: withAlpha(COLORS.warning, 0.15),
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.sm,
  },
  weekLabel: {
    ...TYPE.bodySmall,
    fontFamily: FONTS.medium,
    color: COLORS.inkMuted,
    paddingVertical: 4,
    textAlign: "right",
  },
  title: {
    ...TYPE.h1,
    fontSize: 20,
    lineHeight: 27,
    color: COLORS.ink,
    paddingVertical: 6,
    textAlign: "right",
  },
  babySize: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.primary,
    paddingVertical: 4,
    textAlign: "right",
  },
  body: {
    ...TYPE.body,
    fontSize: 15,
    lineHeight: 23,
    color: COLORS.ink,
    paddingVertical: 4,
    textAlign: "right",
  },
});
