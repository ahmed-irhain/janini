import { StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { FONTS } from "../theme/fonts";

export function DiscoverScreen() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("discover.title")}</Text>
      <Text style={styles.subtitle}>{t("discover.comingSoon")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontFamily: FONTS.bold,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: FONTS.regular,
  },
});
