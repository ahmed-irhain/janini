import type { ReactNode } from "react";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { COLORS } from "../theme/colors";
import { RADIUS } from "../theme/radius";
import { SHADOWS } from "../theme/shadows";
import { SPACING } from "../theme/spacing";

interface CardProps {
  children: ReactNode;
  /** "elevated" marks a card as interactive/topmost (e.g. the lead card in a
   * stack, a modal) per design.md Elevation & Depth; "card" (default) is the
   * baseline shadow for any card sitting on `background`. */
  elevation?: "card" | "elevated";
  style?: StyleProp<ViewStyle>;
}

/** `card-content` — the core content surface repeated across Home/Discover/Settings/Track:
 * white surface, generous rounding, soft shadow lifted off the cream background. */
export function Card({ children, elevation = "card", style }: CardProps) {
  return <View style={[styles.card, SHADOWS[elevation], style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    gap: SPACING.sm,
  },
});
