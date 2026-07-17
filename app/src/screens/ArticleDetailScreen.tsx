import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import type { Article } from "@janini/shared";
import { apiArticleRepository } from "../data/articleRepository";
import { Screen } from "../components/Screen";
import { Badge } from "../components/Badge";
import { FONTS } from "../theme/fonts";
import { COLORS } from "../theme/colors";
import { SPACING } from "../theme/spacing";
import { TYPE } from "../theme/typography";

export function ArticleDetailScreen() {
  const { t } = useTranslation();
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

  if (loadError) {
    return (
      <Screen hasNativeHeader>
        <Text style={styles.statusText}>{t("discover.loadError")}</Text>
      </Screen>
    );
  }

  if (!article) {
    return (
      <Screen hasNativeHeader>
        <Text style={styles.statusText}>{t("common.loading")}</Text>
      </Screen>
    );
  }

  return (
    <Screen style={styles.content} hasNativeHeader>
      <Text style={styles.disclaimer}>{t("discover.disclaimerBanner")}</Text>
      <Text style={styles.title}>{article.titleAr}</Text>
      <Text style={styles.body}>{article.bodyAr ?? article.summaryAr}</Text>
      {article.sourceName ? (
        <Badge
          icon="shield-checkmark"
          tone="neutral"
          label={t("discover.sourceLabel", { source: article.sourceName })}
        />
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
    color: COLORS.warningText,
    backgroundColor: COLORS.warningBg,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 8,
  },
  title: {
    ...TYPE.title,
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
    color: COLORS.mutedText,
    textAlign: "right",
  },
});
