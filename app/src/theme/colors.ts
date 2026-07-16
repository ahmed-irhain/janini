/**
 * Jewel-tone Janini palette. Deep emerald primary (culturally safe, health-associated,
 * given real tonal depth instead of one flat hex) on a warm cream base instead of stark
 * white, with a gold secondary accent for premium/celebratory moments. Neutrals are
 * warm-tinted (not cool gray) so they harmonize with the cream background.
 *
 * Legacy keys (accent, accentSoft, mutedText, border, bannerText, bannerBackground,
 * progressTrack, cardBackground) are kept as aliases onto the new tokens so existing
 * screens pick up the new palette without every call site needing to change at once.
 */
export const COLORS = {
  // Primary — jewel emerald tonal ramp
  primary900: "#0B3D33",
  primary700: "#0F5C4C",
  primary500: "#1C7C67",
  primary300: "#7FB8A8",
  primary100: "#E1EFE9",
  primary50: "#F1F7F4",

  // Base surfaces
  background: "#FBF7F0",
  surface: "#FFFFFF",

  // Text & structure
  ink: "#201C18",
  mutedText: "#6F6459",
  border: "#E6DFD3",
  progressTrack: "#E9E2D6",

  // Secondary warm accent
  gold: "#B8873A",
  goldSoft: "#FBF0DE",

  // Semantic
  warningText: "#7A5A22",
  warningBg: "#FCEFD1",
  errorText: "#B3382B",
  errorBg: "#FBE4E0",

  // Legacy aliases — remove once all call sites migrate to the tokens above directly
  accent: "#0F5C4C",
  accentSoft: "#E1EFE9",
  cardBackground: "#FFFFFF",
  bannerText: "#7A5A22",
  bannerBackground: "#FCEFD1",
} as const;
