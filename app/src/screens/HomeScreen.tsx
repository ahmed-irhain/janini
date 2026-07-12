import { StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { formatHijriDateAr, gestationalAge, gregorianToHijri } from "@janini/shared";
import { FONTS } from "../theme/fonts";

export function HomeScreen() {
  const { t } = useTranslation();

  // Placeholder LMP until pregnancy onboarding/data layer exists.
  const lastMenstrualPeriod = new Date();
  const { weeks } = gestationalAge(lastMenstrualPeriod);
  const hijriToday = gregorianToHijri(new Date());

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("common.appName")}</Text>
      <Text style={styles.subtitle}>{t("home.welcome")}</Text>
      <Text>{t("home.weekLabel", { week: weeks })}</Text>
      <Text>{formatHijriDateAr(hijriToday)}</Text>
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
    padding: 15,
    fontFamily: FONTS.bold,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: FONTS.regular,
  },
});
