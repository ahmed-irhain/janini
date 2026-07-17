/** design.md spacing scale (4/8/12/16/24/32/48/64), keyed by the same semantic
 * names used throughout the app. */
export const SPACING = {
  xs: 4, // spacing.1
  sm: 8, // spacing.2
  md: 12, // spacing.3
  lg: 16, // spacing.4 — default screen-edge margin
  xl: 24, // spacing.6 — card internal padding baseline
  xxl: 32, // spacing.8 — hero/illustration panel padding
  xxxl: 48, // spacing.12
  huge: 64, // spacing.16
} as const;
