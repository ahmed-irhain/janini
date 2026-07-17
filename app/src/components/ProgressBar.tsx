import { StyleSheet, View } from "react-native";
import { COLORS, withAlpha } from "../theme/colors";

interface ProgressBarProps {
  /** 0–100 */
  percent: number;
  /** "onLight" (default) for use on `background`/`surface`; "onPrimary" for use
   * inside a `hero-panel` gradient, where a border-colored track would vanish. */
  tone?: "onLight" | "onPrimary";
}

/** Extracted from HomeScreen's inline progress track/fill so any percent-complete
 * indicator (due-date progress, future onboarding/goal bars) shares one look. */
export function ProgressBar({ percent, tone = "onLight" }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, percent));
  const trackColor = tone === "onPrimary" ? withAlpha(COLORS.onPrimary, 0.28) : COLORS.border;
  const fillColor = tone === "onPrimary" ? COLORS.onPrimary : COLORS.primary;
  return (
    <View style={[styles.track, { backgroundColor: trackColor }]}>
      <View style={[styles.fill, { width: `${clamped}%`, backgroundColor: fillColor }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 5,
  },
});
