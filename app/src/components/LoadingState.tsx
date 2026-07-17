import { ActivityIndicator, StyleSheet, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { Screen } from "./Screen";
import { FONTS } from "../theme/fonts";
import { COLORS } from "../theme/colors";

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message }: LoadingStateProps) {
  const { t } = useTranslation();

  return (
    <Screen center>
      <ActivityIndicator size="large" color={COLORS.primary} />
      <Text style={styles.message}>{message ?? t("common.loading")}</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  message: {
    marginTop: 12,
    fontFamily: FONTS.medium,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.inkMuted,
    textAlign: "center",
  },
});
