import type { TextStyle } from "react-native";
import { FONTS } from "./fonts";

/**
 * design.md type scale. Weight-driven hierarchy within ThmanyahSans (no second
 * Arabic family): `display` uses the Black weight for hero/question-style
 * headlines, `h1`/`h2` step down through Bold, `body`/`bodySmall`/`caption`
 * sit in Regular/Medium.
 */
export const TYPE: Record<
  "display" | "h1" | "h2" | "body" | "bodySmall" | "caption",
  TextStyle
> = {
  display: { fontFamily: FONTS.black, fontSize: 34, lineHeight: 39, letterSpacing: -0.34 },
  h1: { fontFamily: FONTS.bold, fontSize: 26, lineHeight: 31 },
  h2: { fontFamily: FONTS.bold, fontSize: 20, lineHeight: 25 },
  body: { fontFamily: FONTS.regular, fontSize: 16, lineHeight: 24 },
  bodySmall: { fontFamily: FONTS.medium, fontSize: 14, lineHeight: 20 },
  caption: { fontFamily: FONTS.medium, fontSize: 12, lineHeight: 17, letterSpacing: 0.12 },
};

/** Companion Latin face for numerals/English strings (emails, version numbers, EN copy). */
export const LATIN_FONTS = {
  regular: "Manrope-Regular",
  medium: "Manrope-Medium",
  bold: "Manrope-Bold",
} as const;
