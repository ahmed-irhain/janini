import { FlatList, StyleSheet, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { ARTICLES_SEED } from "../data/articlesSeed";
import { Screen } from "../components/Screen";
import { ScreenTitle } from "../components/ScreenTitle";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { FONTS } from "../theme/fonts";
import { COLORS, withAlpha } from "../theme/colors";
import { RADIUS } from "../theme/radius";
import { SPACING } from "../theme/spacing";
import { TYPE } from "../theme/typography";

export function DiscoverScreen() {
  const { t } = useTranslation();

  return (
    <Screen scroll={false} keyboardAvoiding={false} insetsBottomTabBar>
      <ScreenTitle>{t("discover.title")}</ScreenTitle>
      <Text style={styles.disclaimer}>{t("discover.disclaimerBanner")}</Text>

      <FlatList
        data={ARTICLES_SEED}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
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
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
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
  cardTitle: {
    ...TYPE.h2,
    color: COLORS.ink,
    textAlign: "right",
  },
  cardSummary: {
    ...TYPE.body,
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.ink,
    textAlign: "right",
  },
});
