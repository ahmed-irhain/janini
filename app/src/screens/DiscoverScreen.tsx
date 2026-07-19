import { useCallback, useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import type { Article, Topic } from "@janini/shared";
import { apiArticleRepository } from "../data/articleRepository";
import { apiTopicRepository } from "../data/topicRepository";
import { Screen } from "../components/Screen";
import { ScreenTitle } from "../components/ScreenTitle";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { ErrorState } from "../components/ErrorState";
import { Skeleton } from "../components/Skeleton";
import { FilterChips } from "../components/FilterChips";
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
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  useEffect(() => {
    apiTopicRepository.list().then(setTopics).catch(() => {});
  }, []);

  const loadArticles = useCallback(() => {
    let cancelled = false;
    setIsLoading(true);
    setLoadError(false);
    apiArticleRepository
      .listGeneral(selectedTopic)
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
  }, [selectedTopic]);

  useEffect(() => loadArticles(), [loadArticles]);

  if (loadError) {
    return <ErrorState message={t("discover.loadError")} onRetry={loadArticles} />;
  }

  // Only replace the list with skeleton placeholders on the very first load.
  // Switching topics re-fetches in the background while the current results
  // stay visible (dimmed) instead of flashing an empty skeleton every tap.
  const showSkeleton = isLoading && articles.length === 0;
  const showEmpty = !isLoading && articles.length === 0;

  return (
    <Screen keyboardAvoiding={false} insetsBottomTabBar>
      <Image
        source={require("../../assets/illustrations/illu-mother-child.png")}
        style={styles.heroBanner}
        resizeMode="cover"
      />
      <ScreenTitle>{t("discover.title")}</ScreenTitle>
      <Text style={styles.disclaimer}>{t("discover.disclaimerBanner")}</Text>

      <FilterChips
        topics={topics}
        selectedSlug={selectedTopic}
        onSelect={setSelectedTopic}
        allLabel={t("discover.filterAll")}
      />

      {showSkeleton ? (
        <View style={styles.listContent}>
          {SKELETON_ROWS.map((row) => (
            <ArticleCardSkeleton key={row} />
          ))}
        </View>
      ) : showEmpty ? (
        <Text style={styles.statusText}>{t("discover.emptyArticles")}</Text>
      ) : (
        <View style={[styles.listContent, isLoading && styles.listRefreshing]}>
          {articles.map((item) => (
            <Pressable key={item.id} onPress={() => router.push(`/articles/${item.id}`)}>
              <Card>
                <Text style={styles.cardTitle}>{item.titleAr}</Text>
                <Text style={styles.cardSummary}>{item.summaryAr}</Text>
                {item.sourceName || item.topic ? (
                  <View style={styles.badgeRow}>
                    {item.sourceName ? (
                      <Badge
                        icon="shield-checkmark"
                        tone="neutral"
                        label={t("discover.sourceLabel", { source: item.sourceName })}
                      />
                    ) : null}
                    {item.topic ? <Badge label={item.topic.labelAr} /> : null}
                  </View>
                ) : null}
              </Card>
            </Pressable>
          ))}
        </View>
      )}

      <View style={styles.bottomSpacer} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroBanner: {
    width: "100%",
   // aspectRatio: 864 / 315,
   height: "7%",
    borderRadius: RADIUS.lg + 2,
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
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.sm,
  },
  listRefreshing: {
    opacity: 0.5,
  },
  bottomSpacer: {
    height: SPACING.xxl,
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
  badgeRow: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    gap: SPACING.xs,
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
