import type { TextStyle } from "react-native";
import { FONTS } from "./fonts";

/**
 * design.md type scale. Weight-driven hierarchy within ThmanyahSans (no second
 * Arabic family): `display` uses the Black weight for hero/question-style
 * headlines, `h1`/`h2` step down through Bold, `body`/`bodySmall`/`caption`
 * sit in Regular/Medium.
 *
 * No token sets `letterSpacing`: any non-zero kerning disables iOS's Arabic
 * contextual glyph shaping on <Text>, so joined letters render as broken/
 * isolated forms. design.md's -0.01em/0.01em tracking on display/caption is
 * a web-only affordance (design.html's HarfBuzz-based browser rendering
 * tolerates it); the app must stay at 0.
 */
export const TYPE: Record<
  "display" | "h1" | "h2" | "body" | "bodySmall" | "caption",
  TextStyle
> = {
  display: { fontFamily: FONTS.black, fontSize: 30, lineHeight: 35 },
  h1: { fontFamily: FONTS.bold, fontSize: 23, lineHeight: 28 },
  h2: { fontFamily: FONTS.bold, fontSize: 18, lineHeight: 23 },
  body: { fontFamily: FONTS.regular, fontSize: 15, lineHeight: 22 },
  bodySmall: { fontFamily: FONTS.medium, fontSize: 13, lineHeight: 18 },
  caption: { fontFamily: FONTS.medium, fontSize: 11, lineHeight: 15 },
};

/** Companion Latin face for numerals/English strings (emails, version numbers, EN copy). */
export const LATIN_FONTS = {
  regular: "Manrope-Regular",
  medium: "Manrope-Medium",
  bold: "Manrope-Bold",
} as const;
