/**
 * Janini design-system color tokens — mirrors docs/design.md exactly (source of truth).
 * Warm cream base, soft plum-lavender primary, sparing coral accent (never a primary
 * action color), warm near-black/gray text instead of true neutrals.
 */
export const COLORS = {
  primary: "#8C7FDB",
  onPrimary: "#FFFFFF",
  accent: "#F2A79A",
  onAccent: "#241A1E",
  background: "#F7F2E9",
  surface: "#FFFFFF",
  surfaceAlt: "#F0EBFB",
  ink: "#1C1A22",
  inkMuted: "#6E6A78",
  border: "#E7E1F2",
  success: "#3FA66B",
  warning: "#E0A63C",
  error: "#D8574F",
  info: "#5B8DEF",
} as const;

/** Adds an alpha channel to a `#rrggbb` token — used for tinted banner/icon
 * backgrounds derived from a semantic color, since design.md defines only a
 * single solid hex per semantic color (no separate soft/bg variant). */
export function withAlpha(hex: string, alpha: number): string {
  const a = Math.round(Math.max(0, Math.min(1, alpha)) * 255)
    .toString(16)
    .padStart(2, "0");
  return `${hex}${a}`;
}
