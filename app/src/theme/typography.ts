import type { TextStyle } from "react-native";
import { FONTS } from "./fonts";

/**
 * Consolidated type scale — replaces the ad hoc per-screen font sizes (24, 18, 16, 15,
 * 14, 13, 12...) that had accumulated with no shared source of truth.
 */
export const TYPE: Record<
  "display" | "title" | "heading" | "body" | "bodySmall" | "caption",
  TextStyle
> = {
  display: { fontFamily: FONTS.bold, fontSize: 28, lineHeight: 36 },
  title: { fontFamily: FONTS.bold, fontSize: 22, lineHeight: 28 },
  heading: { fontFamily: FONTS.bold, fontSize: 17, lineHeight: 24 },
  body: { fontFamily: FONTS.regular, fontSize: 15, lineHeight: 22 },
  bodySmall: { fontFamily: FONTS.regular, fontSize: 13, lineHeight: 20 },
  caption: { fontFamily: FONTS.medium, fontSize: 12, lineHeight: 18 },
};

/** Companion Latin face for numerals/English strings (emails, version numbers, EN copy). */
export const LATIN_FONTS = {
  regular: "Manrope-Regular",
  medium: "Manrope-Medium",
  bold: "Manrope-Bold",
} as const;
