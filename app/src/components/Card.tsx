import type { ReactNode } from "react";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { COLORS } from "../theme/colors";
import { RADIUS } from "../theme/radius";
import { SHADOWS } from "../theme/shadows";
import { SPACING } from "../theme/spacing";

interface CardProps {
  children: ReactNode;
  /** "sm" for compact list-style cards (Track), "md" (default) for content cards. */
  elevation?: "sm" | "md" | "lg";
  style?: StyleProp<ViewStyle>;
}

/** Shared surface for the card pattern repeated across Home/Discover/Settings/Track —
 * a white surface lifted off the cream screen background with soft, warm-tinted shadow. */
export function Card({ children, elevation = "md", style }: CardProps) {
  return <View style={[styles.card, SHADOWS[elevation], style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.lg,
    gap: SPACING.sm,
  },
});
