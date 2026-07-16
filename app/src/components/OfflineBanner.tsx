import { StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useNetworkStatus } from "../context/NetworkContext";
import { FONTS } from "../theme/fonts";
import { COLORS } from "../theme/colors";

export function OfflineBanner() {
  const { t } = useTranslation();
  const { isOffline } = useNetworkStatus();

  if (!isOffline) return null;

  return (
    <View style={styles.banner}>
      <Text style={styles.text}>{t("network.offlineBanner")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: COLORS.bannerBackground,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  text: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.bannerText,
    textAlign: "right",
  },
});
