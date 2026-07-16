import { StyleSheet, View } from "react-native";
import { COLORS } from "../theme/colors";

interface ProgressBarProps {
  /** 0–100 */
  percent: number;
}

/** Extracted from HomeScreen's inline progress track/fill so any percent-complete
 * indicator (due-date progress, future onboarding/goal bars) shares one look. */
export function ProgressBar({ percent }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${clamped}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.progressTrack,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 5,
    backgroundColor: COLORS.primary700,
  },
});
