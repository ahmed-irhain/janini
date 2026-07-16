import type { ReactNode } from "react";
import { StyleSheet, Text, type StyleProp, type TextStyle } from "react-native";
import { COLORS } from "../theme/colors";
import { SPACING } from "../theme/spacing";
import { TYPE } from "../theme/typography";

interface ScreenTitleProps {
  children: ReactNode;
  /** Text alignment — "right" matches the app's RTL default; "center" is for hero/branding screens. */
  align?: "right" | "center";
  style?: StyleProp<TextStyle>;
}

export function ScreenTitle({ children, align = "right", style }: ScreenTitleProps) {
  return <Text style={[styles.title, align === "center" && styles.center, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    ...TYPE.title,
    color: COLORS.ink,
    marginBottom: SPACING.lg,
    textAlign: "right",
  },
  center: {
    textAlign: "center",
  },
});
