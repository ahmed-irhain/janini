import { Image, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { COLORS } from "../theme/colors";
import { TYPE } from "../theme/typography";

interface LogoMarkProps {
  size?: number;
  /** Shows the "جنيني" wordmark beside the mark — off for tight spaces (nav headers). */
  withWordmark?: boolean;
}

/** Brand mark (crescent/arc) + optional wordmark, for hero/branding screens
 * (Welcome, onboarding welcome). Wordmark uses the `display` type token — the
 * Black-weight, tight-tracking hero style design.md reserves for brand moments. */
export function LogoMark({ size = 64, withWordmark = true }: LogoMarkProps) {
  const { t } = useTranslation();
  return (
    <View style={styles.row}>
      <Image
        source={require("../../assets/logo-mark.png")}
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
      {withWordmark ? <Text style={styles.wordmark}>{t("common.appName")}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    gap: 12,
  },
  wordmark: {
    ...TYPE.display,
    color: COLORS.primary,
    textAlign: "center",
  },
});
