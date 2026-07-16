import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Screen } from "./Screen";
import { FONTS } from "../theme/fonts";
import { COLORS } from "../theme/colors";

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
        <Pressable style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryButtonText}>{retryLabel ?? t("common.retry")}</Text>
        </Pressable>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.errorSoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  message: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.mutedText,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: COLORS.accent,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 12,
    alignItems: "center",
  },
  retryButtonText: {
    color: "#fff",
    fontFamily: FONTS.medium,
    fontSize: 15,
  },
});
