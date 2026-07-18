import { useCallback, useEffect, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import type { Article } from "@janini/shared";
import { apiArticleRepository } from "../data/articleRepository";
import { Screen } from "../components/Screen";
import { ScreenTitle } from "../components/ScreenTitle";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { ErrorState } from "../components/ErrorState";
import { Skeleton } from "../components/Skeleton";
import { FONTS } from "../theme/fonts";
import { COLORS, withAlpha } from "../theme/colors";
import { RADIUS } from "../theme/radius";
import { SPACING } from "../theme/spacing";
import { TYPE } from "../theme/typography";

const SKELETON_ROWS = [0, 1, 2, 3];

function ArticleCardSkeleton() {
  return (
    <Card style={styles.skeletonCard}>
      <Skeleton width="70%" height={18} radius={RADIUS.sm} />
      <Skeleton height={13} radius={RADIUS.sm} />
      <Skeleton width="90%" height={13} radius={RADIUS.sm} />
      <Skeleton width={96} height={24} radius={RADIUS.full} />
    </Card>
  );
}

export function DiscoverScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const loadArticles = useCallback(() => {
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

  useEffect(() => loadArticles(), [loadArticles]);

  if (loadError) {
    return <ErrorState message={t("discover.loadError")} onRetry={loadArticles} />;
  }

  return (
    <Screen scroll={false} keyboardAvoiding={false} insetsBottomTabBar>
      <Image
        source={require("../../assets/illustrations/illu-mother-child.png")}
        style={styles.heroBanner}
        resizeMode="cover"
      />
      <ScreenTitle style={styles.title}>{t("discover.title")}</ScreenTitle>
      <Text style={styles.disclaimer}>{t("discover.disclaimerBanner")}</Text>

      {isLoading ? (
        <View style={styles.listContent}>
          {SKELETON_ROWS.map((row) => (
            <ArticleCardSkeleton key={row} />
          ))}
        </View>
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
  title:{
    padding: 10,
  },
  heroBanner: {
    width: "100%",
    //aspectRatio: 115/100,
    borderRadius: RADIUS.lg + 2,
    alignSelf: "center",
    height:"25%",
    marginBottom: SPACING.md,
  },
  disclaimer: {
    fontFamily: FONTS.regular,
    fontSize: 11,
    lineHeight: 16,
    textAlign: "right",
    color: COLORS.warning,
    backgroundColor: withAlpha(COLORS.warning, 0.15),
    marginBottom: SPACING.sm,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.sm,
  },
  listContent: {
    gap: SPACING.md,
    paddingBottom: SPACING.sm,
  },
  skeletonCard: {
    alignItems: "flex-end",
  },
  cardTitle: {
    ...TYPE.h2,
    color: COLORS.ink,
    textAlign: "right",
    paddingVertical: SPACING.xs,
  },
  cardSummary: {
    ...TYPE.body,
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.ink,
    textAlign: "right",
    paddingVertical: SPACING.xs,
  },
  statusText: {
    ...TYPE.body,
    fontSize: 14,
    color: COLORS.inkMuted,
    textAlign: "right",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
});
