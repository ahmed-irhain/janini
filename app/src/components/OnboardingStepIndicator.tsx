import { StyleSheet, View } from "react-native";
import { COLORS } from "../theme/colors";

interface OnboardingStepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function OnboardingStepIndicator({ currentStep, totalSteps }: OnboardingStepIndicatorProps) {
  return (
    <View style={styles.row}>
      {Array.from({ length: totalSteps }, (_, index) => (
        <View key={index} style={[styles.segment, index < currentStep && styles.segmentFilled]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flex: 1,
    gap: 6,
  },
  segment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.progressTrack,
  },
  segmentFilled: {
    backgroundColor: COLORS.accent,
  },
});
