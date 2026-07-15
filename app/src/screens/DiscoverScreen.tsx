import { FlatList, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { ARTICLES_SEED } from "../data/articlesSeed";
import { Screen } from "../components/Screen";
import { FONTS } from "../theme/fonts";
import { COLORS } from "../theme/colors";

export function DiscoverScreen() {
  const { t } = useTranslation();

  return (
    <Screen scroll={false} horizontalPadding={0} keyboardAvoiding={false}>
      <Text style={styles.title}>{t("discover.title")}</Text>
      <Text style={styles.disclaimer}>{t("discover.disclaimerBanner")}</Text>

      <FlatList
        data={ARTICLES_SEED}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.titleAr}</Text>
            <Text style={styles.cardSummary}>{item.summaryAr}</Text>
            {item.sourceName ? (
              <Text style={styles.cardSource}>
                {t("discover.sourceLabel", { source: item.sourceName })}
              </Text>
            ) : null}
          </View>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    lineHeight: 32,
    textAlign: "right",
    paddingVertical: 6,
    marginBottom: 8,
    marginHorizontal: 16,
  },
  disclaimer: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "right",
    color: COLORS.bannerText,
    backgroundColor: COLORS.bannerBackground,
    marginHorizontal: 16,
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  listContent: {
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 16,
    gap: 6,
  },
  cardTitle: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    lineHeight: 22,
    textAlign: "right",
  },
  cardSummary: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    lineHeight: 22,
    textAlign: "right",
  },
  cardSource: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.accent,
    textAlign: "right",
    paddingTop: 2,
  },
});
