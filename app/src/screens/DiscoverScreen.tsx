import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import type { Article } from "@janini/shared";
import { apiArticleRepository } from "../data/articleRepository";
import { Screen } from "../components/Screen";
import { ScreenTitle } from "../components/ScreenTitle";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { FONTS } from "../theme/fonts";
import { COLORS } from "../theme/colors";
import { SPACING } from "../theme/spacing";
import { TYPE } from "../theme/typography";

export function DiscoverScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setLoadError(false);
    apiArticleRepository
      .listGeneral()
      .then((rows) => {
        if (!cancelled) setArticles(rows);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Screen scroll={false} keyboardAvoiding={false}>
      <ScreenTitle style={styles.title}>{t("discover.title")}</ScreenTitle>
      <Text style={styles.disclaimer}>{t("discover.disclaimerBanner")}</Text>

      {isLoading ? (
        <Text style={styles.statusText}>{t("common.loading")}</Text>
      ) : loadError ? (
        <Text style={styles.statusText}>{t("discover.loadError")}</Text>
      ) : articles.length === 0 ? (
        <Text style={styles.statusText}>{t("discover.emptyArticles")}</Text>
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <Pressable onPress={() => router.push(`/articles/${item.id}`)}>
              <Card>
                <Text style={styles.cardTitle}>{item.titleAr}</Text>
                <Text style={styles.cardSummary}>{item.summaryAr}</Text>
                {item.sourceName ? (
                  <Badge
                    icon="shield-checkmark"
                    tone="neutral"
                    label={t("discover.sourceLabel", { source: item.sourceName })}
                  />
                ) : null}
              </Card>
            </Pressable>
          )}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  disclaimer: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "right",
    color: COLORS.warningText,
    backgroundColor: COLORS.warningBg,
    marginBottom: SPACING.sm,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 8,
  },
  title: {
    padding: 15,
  },
  listContent: {
    gap: SPACING.md,
    paddingBottom: SPACING.sm,
  },
  cardTitle: {
    ...TYPE.heading,
    color: COLORS.ink,
    textAlign: "right",
  },
  cardSummary: {
    ...TYPE.body,
    fontSize: 14,
    color: COLORS.ink,
    textAlign: "right",
  },
  statusText: {
    ...TYPE.body,
    fontSize: 14,
    color: COLORS.mutedText,
    textAlign: "right",
    paddingHorizontal: SPACING.md,
  },
});
