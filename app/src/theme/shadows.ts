import type { ViewStyle } from "react-native";
import { COLORS } from "./colors";

/**
 * Soft, warm-tinted elevation (shadow color derived from the brand ink, not flat black)
 * for the "soft & tactile" surface style — cards/sheets read as gently lifted off the
 * cream background rather than flat-bordered. iOS-only shadow props; no Android
 * `elevation` tuning per this project's platform priority.
 */
export const SHADOWS: Record<"sm" | "md" | "lg", ViewStyle> = {
  sm: {
    shadowColor: COLORS.primary900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  md: {
    shadowColor: COLORS.primary900,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  lg: {
    shadowColor: COLORS.primary900,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
  },
};
