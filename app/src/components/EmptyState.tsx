import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "../theme/colors";
import { SPACING } from "../theme/spacing";
import { TYPE } from "../theme/typography";

interface EmptyStateProps {
  message: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

/** Friendlier stand-in for the plain gray "no data" caption text used today in
 * TrackScreen's empty-symptoms/empty-appointments states. */
export function EmptyState({ message, icon = "leaf-outline" }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={22} color={COLORS.primary300} />
      <Text style={[TYPE.bodySmall, styles.message]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: SPACING.sm,
    paddingVertical: SPACING.xl,
  },
  message: {
    color: COLORS.mutedText,
    textAlign: "center",
  },
});
