import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Screen } from "./Screen";
import { Button } from "./Button";
import { FONTS } from "../theme/fonts";
import { COLORS, withAlpha } from "../theme/colors";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export function ErrorState({ message, onRetry, retryLabel }: ErrorStateProps) {
  const { t } = useTranslation();

  return (
    <Screen center>
      <View style={styles.iconWrap}>
        <Ionicons name="alert-circle-outline" size={32} color={COLORS.error} />
      </View>
      <Text style={styles.message}>{message}</Text>
      {onRetry ? (
        <Button
          label={retryLabel ?? t("common.retry")}
          onPress={onRetry}
          fullWidth={false}
          style={styles.retryButton}
        />
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: withAlpha(COLORS.error, 0.12),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  message: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.inkMuted,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 20,
    paddingHorizontal: 28,
  },
});
