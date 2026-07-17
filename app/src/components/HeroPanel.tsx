import type { ReactNode } from "react";
import { StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { RADIUS } from "../theme/radius";
import { GRADIENTS } from "../theme/gradients";
import { SPACING } from "../theme/spacing";

interface HeroPanelProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

/** `hero-panel` — the one component carrying a `gradients` token as its
 * background. Reserved for a single illustration/feature moment per screen
 * (e.g. Home's due-date progress card); never for routine content cards. */
export function HeroPanel({ children, style }: HeroPanelProps) {
  const { colors, locations, start, end } = GRADIENTS.plumPanel;
  return (
    <LinearGradient
      colors={colors}
      locations={locations}
      start={start}
      end={end}
      style={[styles.panel, style]}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderRadius: RADIUS.xl,
    padding: SPACING.xxl,
    gap: SPACING.sm,
  },
});
