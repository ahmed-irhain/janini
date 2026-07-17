import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import type { Article } from "@janini/shared";
import { apiArticleRepository } from "../data/articleRepository";
import { Screen } from "../components/Screen";
import { IconButton } from "../components/IconButton";
import { Badge } from "../components/Badge";
import { FONTS } from "../theme/fonts";
import { COLORS, withAlpha } from "../theme/colors";
import { RADIUS } from "../theme/radius";
import { SPACING } from "../theme/spacing";
import { TYPE } from "../theme/typography";

export function ArticleDetailScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setLoadError(false);
    apiArticleRepository
      .getById(id)
      .then((row) => {
        if (!cancelled) setArticle(row);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const backButton = (
    <IconButton icon="chevron-back" onPress={() => router.back()} accessibilityLabel={t("common.back")} />
  );

  if (loadError) {
    return (
      <Screen style={styles.content}>
        {backButton}
        <Text style={styles.statusText}>{t("discover.loadError")}</Text>
      </Screen>
    );
  }

  if (!article) {
    return (
      <Screen style={styles.content}>
        {backButton}
        <Text style={styles.statusText}>{t("common.loading")}</Text>
      </Screen>
    );
  }

  return (
    <Screen style={styles.content}>
      {backButton}
      <Text style={styles.disclaimer}>{t("discover.disclaimerBanner")}</Text>
      {article.weekNumber ? <Badge label={t("discover.weekRowLabel", { week: article.weekNumber })} /> : null}
      <Text style={styles.title}>{article.titleAr}</Text>
      <Text style={styles.body}>{article.bodyAr ?? article.summaryAr}</Text>
      {article.sourceName ? (
        <View style={styles.sourceRow}>
          <View style={styles.sourceCheck}>
            <Text style={styles.sourceCheckMark}>✓</Text>
          </View>
          <Text style={styles.sourceText}>
            {t("discover.sourceLabel", { source: article.sourceName })}
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
  disclaimer: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "right",
    color: COLORS.warning,
    backgroundColor: withAlpha(COLORS.warning, 0.15),
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.sm,
  },
  title: {
    ...TYPE.h1,
    fontSize: 22,
    lineHeight: 30,
    color: COLORS.ink,
    paddingVertical: 6,
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
  statusText: {
    ...TYPE.body,
    fontSize: 14,
    color: COLORS.inkMuted,
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
