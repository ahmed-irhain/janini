import type { ViewStyle } from "react-native";
import { COLORS } from "./colors";

/**
 * design.md Elevation & Depth: soft, diffuse shadows rather than borders.
 * `card` (`0 8px 24px rgba(28,26,34,0.08)`) is the default for any card on
 * `background`; `elevated` (`0 12px 32px rgba(28,26,34,0.14)`) marks a card as
 * interactive/elevated (e.g. the topmost card in a stack, a modal). iOS-only
 * shadow props; no Android `elevation` tuning per this project's platform priority.
 */
export const SHADOWS: Record<"card" | "elevated", ViewStyle> = {
  card: {
    shadowColor: COLORS.ink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  elevated: {
    shadowColor: COLORS.ink,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.14,
    shadowRadius: 16,
  },
};
