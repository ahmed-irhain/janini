import { FlatList, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { ARTICLES_SEED } from "../data/articlesSeed";
import { Screen } from "../components/Screen";
import { ScreenTitle } from "../components/ScreenTitle";
import { FONTS } from "../theme/fonts";
import { COLORS } from "../theme/colors";

export function DiscoverScreen() {
  const { t } = useTranslation();

  return (
    <Screen scroll={false} keyboardAvoiding={false}>
      <ScreenTitle style={styles.title} >{t("discover.title")}</ScreenTitle>
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
  disclaimer: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "right",
    color: COLORS.bannerText,
    backgroundColor: COLORS.bannerBackground,
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  title:{
    padding: 15,
  },
  listContent: {
    gap: 12,
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
