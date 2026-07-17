/**
 * design.md gradient tokens, translated into expo-linear-gradient props.
 * `start`/`end` approximate the CSS gradient angle (0deg = to top, clockwise)
 * as a direction vector through the unit square.
 */
export const GRADIENTS = {
  /** `linear-gradient(160deg, #E3D9FA 0%, #FDEFE0 55%, #FBF7F0 100%)` — soft,
   * diffuse backdrop behind onboarding/welcome card stacks. Never behind body text. */
  auroraWash: {
    colors: ["#E3D9FA", "#FDEFE0", "#FBF7F0"] as const,
    locations: [0, 0.55, 1] as const,
    start: { x: 0.33, y: 0.03 },
    end: { x: 0.67, y: 0.97 },
  },
  /** `linear-gradient(180deg, #C9BEF2 0%, #8C7FDB 55%, #5B4BAE 100%)` — one
   * hero illustration/feature moment per screen. Carries onPrimary text/icons. */
  plumPanel: {
    colors: ["#C9BEF2", "#8C7FDB", "#5B4BAE"] as const,
    locations: [0, 0.55, 1] as const,
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
} as const;
