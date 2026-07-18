import { Image, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { WEEKLY_CONTENT_SEED } from "../data/weeklyContentSeed";
import { getBabySizeEmoji } from "../data/babySizeEmoji";
import { getArticleHeroImage } from "../data/articleHeroImages";
import { Screen } from "../components/Screen";
import { IconButton } from "../components/IconButton";
import { Badge } from "../components/Badge";
import { ErrorState } from "../components/ErrorState";
import { FONTS } from "../theme/fonts";
import { COLORS, withAlpha } from "../theme/colors";
import { RADIUS } from "../theme/radius";
import { SPACING } from "../theme/spacing";
import { TYPE } from "../theme/typography";

export function WeeklyContentDetailScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { week } = useLocalSearchParams<{ week: string }>();
  const weekNumber = Number(week);
  const content = WEEKLY_CONTENT_SEED.find((item) => item.weekNumber === weekNumber);

  if (!content) return <ErrorState message={t("discover.contentNotFound")} />;

  return (
    <Screen style={styles.content}>
      <IconButton icon="chevron-back" onPress={() => router.back()} accessibilityLabel={t("common.back")} />

      <Image source={getArticleHeroImage(content.weekNumber)} style={styles.heroImage} resizeMode="cover" />

      <Text style={styles.disclaimer}>{t("discover.disclaimerBanner")}</Text>
      <Badge label={t("discover.weekRowLabel", { week: content.weekNumber })} />
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

      {content.sourceCitations.length > 0 ? (
        <View style={styles.sourceRow}>
          <View style={styles.sourceCheck}>
            <Text style={styles.sourceCheckMark}>✓</Text>
          </View>
          <Text style={styles.sourceText}>
            {t("discover.sourceLabel", { source: content.sourceCitations.join("، ") })}
          </Text>
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: SPACING.md,
  },
  heroImage: {
    width: "100%",
    aspectRatio: 612 / 454,
    borderRadius: RADIUS.lg - 4,
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
  title: {
    ...TYPE.h1,
    fontSize: 20,
    lineHeight: 27,
    color: COLORS.ink,
    paddingVertical: SPACING.sm,
    textAlign: "right",
  },
  babySize: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.primary,
    paddingVertical: SPACING.sm,
    textAlign: "right",
  },
  body: {
    ...TYPE.body,
    fontSize: 15,
    lineHeight: 23,
    color: COLORS.ink,
    paddingVertical: SPACING.sm,
    textAlign: "right",
  },
  sourceRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.sm + 4,
    paddingVertical: SPACING.sm + 2,
    paddingHorizontal: SPACING.md,
    marginTop: SPACING.sm,
  },
  sourceCheck: {
    width: 26,
    height: 26,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
  },
  sourceCheckMark: {
    fontSize: 12,
    color: COLORS.primary,
  },
  sourceText: {
    ...TYPE.bodySmall,
    color: COLORS.inkMuted,
    textAlign: "right",
  },
});
