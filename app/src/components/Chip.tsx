import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from "react-native";
import { COLORS } from "../theme/colors";
import { RADIUS } from "../theme/radius";
import { SPACING } from "../theme/spacing";
import { TYPE } from "../theme/typography";

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  /** Whether the chip grows to fill its row (equal-width siblings, e.g. a
   * fixed 2-3 item picker). Set false for a content-sized chip in a
   * variable-length scrollable row (e.g. a filter bar). Defaults to true to
   * preserve existing call sites' layout. */
  fill?: boolean;
  style?: StyleProp<ViewStyle>;
}

/** `chip-select` / `chip-select-active` — a single-choice picker (symptom
 * severity, LMP/due-date entry mode, trimester selector): outlined/neutral by
 * default, filling solid `primary` only when selected. */
export function Chip({ label, selected = false, onPress, fill = true, style }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={[
        styles.chip,
        fill && styles.chipFill,
        selected ? styles.chipSelected : styles.chipDefault,
        style,
      ]}
    >
      <Text
        numberOfLines={1}
        style={[TYPE.bodySmall, styles.label, selected && styles.labelSelected]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderRadius: RADIUS.full,
    borderWidth: 1,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  chipFill: {
    flex: 1,
  },
  chipDefault: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
  },
  chipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  label: {
    color: COLORS.inkMuted,
    textAlign: "center",
  },
  labelSelected: {
    color: COLORS.onPrimary,
  },
});
