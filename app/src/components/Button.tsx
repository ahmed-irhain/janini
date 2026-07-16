import { ActivityIndicator, Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from "react-native";
import { COLORS } from "../theme/colors";
import { RADIUS } from "../theme/radius";
import { SPACING } from "../theme/spacing";
import { TYPE } from "../theme/typography";

type ButtonVariant = "primary" | "tonal" | "outline" | "destructive";

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

const VARIANT_STYLES: Record<ButtonVariant, { bg: string; text: string; border?: string }> = {
  primary: { bg: COLORS.primary700, text: COLORS.surface },
  tonal: { bg: COLORS.primary100, text: COLORS.primary700 },
  outline: { bg: "transparent", text: COLORS.mutedText, border: COLORS.border },
  destructive: { bg: "transparent", text: COLORS.errorText, border: COLORS.errorText },
};

/** Shared button primitive — replaces the ad hoc primaryButton/secondaryButton/
 * resetButton styles previously duplicated per screen. */
export function Button({
  label,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  fullWidth = true,
  style,
  accessibilityLabel,
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const v = VARIANT_STYLES[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: isDisabled }}
      hitSlop={4}
      style={({ pressed }) => [
        styles.base,
        fullWidth && styles.fullWidth,
        {
          backgroundColor: v.bg,
          borderColor: v.border ?? "transparent",
          borderWidth: v.border ? 1 : 0,
          opacity: isDisabled ? 0.4 : pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={v.text} />
      ) : (
        <Text style={[styles.label, TYPE.heading, { color: v.text }]}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: SPACING.md + 2,
    paddingHorizontal: SPACING.xxxl,
    borderRadius: RADIUS.pill,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },
  fullWidth: {
    width: "100%",
  },
  label: {
    textAlign: "center",
  },
});
