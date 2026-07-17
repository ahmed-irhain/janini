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

/** `button-primary` is ink-filled (not primary-filled) per design.md — a near-black
 * CTA reads as more confident/editorial than a tinted one. `tonal`/`outline` are
 * secondary variants not spec'd in design.md but kept for lower-emphasis actions
 * (e.g. Settings' reset button) using the surfaceAlt/border tokens. */
const VARIANT_STYLES: Record<ButtonVariant, { bg: string; text: string; border?: string }> = {
  primary: { bg: COLORS.ink, text: COLORS.onPrimary },
  tonal: { bg: COLORS.surfaceAlt, text: COLORS.primary },
  outline: { bg: "transparent", text: COLORS.inkMuted, border: COLORS.border },
  destructive: { bg: "transparent", text: COLORS.error, border: COLORS.error },
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
          backgroundColor: isDisabled && variant === "primary" ? COLORS.border : v.bg,
          borderColor: v.border ?? "transparent",
          borderWidth: v.border ? 1 : 0,
          opacity: isDisabled && variant !== "primary" ? 0.4 : pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isDisabled && variant === "primary" ? COLORS.inkMuted : v.text} />
      ) : (
        <Text
          style={[
            styles.label,
            TYPE.h2,
            { color: isDisabled && variant === "primary" ? COLORS.inkMuted : v.text },
          ]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    borderRadius: RADIUS.full,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 56,
  },
  fullWidth: {
    width: "100%",
  },
  label: {
    textAlign: "center",
  },
});
