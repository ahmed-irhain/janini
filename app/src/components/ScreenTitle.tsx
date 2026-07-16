import type { ReactNode } from "react";
import { StyleSheet, Text, type StyleProp, type TextStyle } from "react-native";
import { FONTS } from "../theme/fonts";

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
    fontSize: 24,
    fontFamily: FONTS.bold,
    lineHeight: 32,
    marginBottom: 16,
    textAlign: "right",
  },
  center: {
    textAlign: "center",
  },
});
