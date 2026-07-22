---
version: alpha
name: Janini
description: Warm, editorial design system for Janini, an Arabic-first pregnancy tracking app for Saudi Arabia and the Gulf.

colors:
  primary: "#8C7FDB"
  on-primary: "#FFFFFF"
  accent: "#F2A79A"
  on-accent: "#241A1E"
  background: "#F7F2E9"
  surface: "#FFFFFF"
  surface-alt: "#F0EBFB"
  ink: "#1C1A22"
  ink-muted: "#6E6A78"
  border: "#E7E1F2"
  success: "#3FA66B"
  warning: "#E0A63C"
  error: "#D8574F"
  info: "#5B8DEF"

gradients:
  auroraWash: "linear-gradient(160deg, #E3D9FA 0%, #FDEFE0 55%, #FBF7F0 100%)"
  plumPanel: "linear-gradient(180deg, #C9BEF2 0%, #8C7FDB 55%, #5B4BAE 100%)"

typography:
  display:
    fontFamily: ThmanyahSans-Black
    fontSize: 30px
    fontWeight: 900
    lineHeight: 1.17
  h1:
    fontFamily: ThmanyahSans-Bold
    fontSize: 23px
    fontWeight: 700
    lineHeight: 1.22
  h2:
    fontFamily: ThmanyahSans-Bold
    fontSize: 18px
    fontWeight: 700
    lineHeight: 1.28
  body:
    fontFamily: ThmanyahSans-Regular
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.47
  bodySmall:
    fontFamily: ThmanyahSans-Medium
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.4
  caption:
    fontFamily: ThmanyahSans-Medium
    fontSize: 11px
    fontWeight: 500
    lineHeight: 1.36

rounded:
  sm: 8px
  md: 16px
  lg: 24px
  xl: 28px
  full: 999px

spacing:
  1: 4px
  2: 8px
  3: 12px
  4: 16px
  6: 24px
  8: 32px
  12: 48px
  16: 64px

components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-primary}"
    typography: "{typography.h2}"
    rounded: "{rounded.full}"
    padding: "{spacing.4} {spacing.6}"
    height: 56px
  button-primary-disabled:
    backgroundColor: "{colors.border}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.h2}"
    rounded: "{rounded.full}"
    padding: "{spacing.4} {spacing.6}"
    height: 56px
  text-link:
    backgroundColor: transparent
    textColor: "{colors.ink-muted}"
    typography: "{typography.bodySmall}"
    padding: "{spacing.2}"
  card-content:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.h1}"
    rounded: "{rounded.xl}"
    padding: "{spacing.6}"
  chip-tag:
    backgroundColor: "{colors.surface-alt}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: "{spacing.2} {spacing.4}"
  chip-select:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.bodySmall}"
    rounded: "{rounded.full}"
    padding: "{spacing.2} {spacing.4}"
  chip-select-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.bodySmall}"
    rounded: "{rounded.full}"
    padding: "{spacing.2} {spacing.4}"
  icon-button-circular:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    size: 44px
  tab-bar-item-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    size: 40px
  hero-panel:
    backgroundColor: "{gradients.plumPanel}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.xl}"
    padding: "{spacing.8}"
---

# Janini Design System

## Overview

Janini is an Arabic-first pregnancy tracking app for women across Saudi Arabia and the Gulf, used daily in short, low-friction check-ins — logging symptoms, reading weekly content, tracking appointments — often one-handed, sometimes at a clinic. The system translates a warm, editorial mood-app reference into a maternal-care register: reassuring rather than clinical, personal rather than institutional. It should never read as a mental-health or mood-tracking product (no diagnostic framing, no therapy-app tone), and it must never compromise on RTL correctness or Arabic legibility to chase a visual effect. Two anti-patterns to hold in mind everywhere: don't let warmth curdle into cutesiness that undermines trust in medical content, and don't let editorial flourish (gradients, display type) leak into dense data screens where clarity matters most.

## Colors

`background` (`#F7F2E9`) is a warm cream — matching the existing splash screen — used for the base canvas everywhere; `surface` is plain white for cards that need to pop slightly off it, with `surface-alt` (a pale lavender tint) reserved for secondary card states and chip backgrounds. `primary` (`#8C7FDB`, a soft plum-lavender) carries interactive emphasis — active states, selected chips, primary illustration panels — while `accent` (`#F2A79A`, a warm coral) is used sparingly for small warm touches (a highlighted badge, a mascot/illustration detail) and must never be used for primary actions, to keep it distinct from `primary`. `ink` (`#1C1A22`) and `ink-muted` (`#6E6A78`) are warm near-blacks and grays rather than true neutrals, keeping text from feeling cold against the cream background. All `ink`-on-`background` and `on-primary`-on-`primary` pairings meet WCAG AA for body text; `accent` is never used as a text color on `background` since its contrast ratio falls short — only as a fill behind `on-accent` dark text or as a small graphic detail. Semantic colors (`success`, `warning`, `error`, `info`) are conventional in hue but slightly desaturated to sit quietly within the warm palette rather than reading as generic system alerts.

Two `gradients` tokens capture the reference's two distinct uses of color-in-motion, and both are treated as first-class tokens alongside flat colors, referenced by `backgroundColor` on components exactly like a solid: `auroraWash` is a soft, diffuse lavender-to-peach-to-cream wash (`linear-gradient(160deg, #E3D9FA 0%, #FDEFE0 55%, #FBF7F0 100%)`) for decorative backdrops behind onboarding/welcome card stacks — never behind body text, only behind illustration or card-stack compositions where legibility isn't at stake. `plumPanel` is a bolder, more saturated lavender-to-deep-plum gradient (`linear-gradient(180deg, #C9BEF2 0%, #8C7FDB 55%, #5B4BAE 100%)`) used as a solid panel background for a single hero illustration or feature moment per screen (see `hero-panel`) — it carries `on-primary` white text/icons on top, and is deliberately rationed to one occurrence per screen so it keeps its impact.

## Typography

Arabic body and UI text uses ThmanyahSans (already loaded via `expo-font` in the app), a warm humanist Arabic sans; Latin numerals and any embedded English strings substitute Manrope at the matching weight, following the app's existing `LATIN_FONTS` pairing convention — this system doesn't introduce a second full type scale for Latin, just a per-weight substitution. The reference's serif-display-versus-sans-UI contrast doesn't translate directly to Arabic (there's no mature, broadly legible Arabic serif face loaded in the app, and introducing one for a religiously observant, precision-sensitive audience is a legibility risk not worth the visual gain). Instead, the same editorial weight is recreated through extremes within ThmanyahSans itself: `display` uses the Black weight at a large size for hero moments and question-style headlines (mirroring the reference's serif headline weight), while `h1`/`h2` step down through Bold, and `body`/`bodySmall`/`caption` sit in Regular/Medium — so the contrast is weight-driven rather than family-driven. `caption` and `bodySmall` share a family but differ in size to distinguish metadata (view counts, timestamps) from primary supporting copy. No token carries `letterSpacing`: on iOS, any non-zero kerning on `<Text>` disables Arabic contextual glyph shaping, so joined letters render broken/isolated — see the Don't below.

## Layout

Spacing follows a generous scale (`4/8/12/16/24/32/48/64`) matching the reference's roomy card padding — this is a daily-use utility app, not a dense dashboard, so breathing room over density is the right default. Cards use `spacing.6` (24px) internal padding as the baseline, stepping up to `spacing.8` (32px) for hero/illustration panels. There's no rigid column grid; layout is single-column, full-width cards stacked vertically, which suits both the RTL reading direction and one-handed mobile use. Screen-edge margins default to `spacing.4` (16px); component-internal gaps default to `spacing.2`–`spacing.3`.

## Elevation & Depth

Depth comes primarily from soft, diffuse shadows rather than borders or flat design — matching the reference's stacked-card look. A single soft shadow (`0 8px 24px rgba(28,26,34,0.08)`) is the default for any card sitting on `background`; a slightly stronger shadow (`0 12px 32px rgba(28,26,34,0.14)`) marks a card as interactive/elevated (e.g. the topmost card in a stack, a modal). A thin `border` hairline is used only where two `surface` elements sit directly adjacent with no shadow to separate them (e.g. a list row), never as the primary depth strategy. There is no dark mode currently (`userInterfaceStyle: light` in `app.json`), so no elevation-on-dark treatment is defined yet.

## Shapes

Corner radius is uniformly generous — nothing in this system is sharp. Cards use `rounded.xl` (28px), smaller surfaces like input fields or secondary cards use `rounded.lg` (24px) or `rounded.md` (16px), and anything interactive and pill-shaped (buttons, chips, tab-bar active states) uses `rounded.full`. Icon buttons and avatars are always fully circular. This softness signals approachability and comfort — appropriate for a moment in someone's life that can carry real anxiety — without tipping into the "cutesy mascot app" territory the anti-patterns warn against.

## Components

`button-primary` is a solid `ink`-filled pill (not `primary`-filled — a near-black CTA reads as more confident and print-editorial than a tinted one, matching the reference's black "Get Started" button) with `on-primary` white text; `button-primary-disabled` swaps to a flat `border`-colored fill with muted text. `text-link` is the transparent, low-emphasis counterpart for secondary actions like "Skip" or "Later." `card-content` is the core content card — used for weekly-content articles and reflection-style prompts — white surface, `rounded.xl`, generous padding, headline set in `h1`. `chip-tag` is a static, non-interactive label (topic tags on a content card) in `surface-alt`; `chip-select`/`chip-select-active` is the interactive counterpart — a single-choice picker (e.g. symptom severity, trimester selector) that fills solid `primary` with `on-primary` text only when selected, staying outlined/neutral otherwise. `icon-button-circular` covers back buttons, favorites, and notification bells — circular, `surface`-filled, `ink` icon color. `tab-bar-item-active` marks the current bottom-nav destination with a filled `primary` circle behind the icon; inactive tab items render icon-only in `ink-muted` with no separate token needed. `hero-panel` is the one component that carries a `gradients` token as its background — a single illustration/feature moment per screen, using `plumPanel`, `rounded.xl`, and generous `spacing.8` padding, reserved for onboarding heroes or a single standout feature callout, never for routine content cards.

## Do's and Don'ts

**Do:**
- Do keep `background` cream and `ink` warm-near-black everywhere — the warmth is load-bearing for the "reassuring, not clinical" tone.
- Do ration `gradients.plumPanel` and `gradients.auroraWash` to one decorative use per screen — they lose their impact (and start looking like a mood-tracker skin) if applied everywhere.
- Do set `textAlign: right` explicitly on Arabic content text rather than relying on layout defaults, per the app's existing RTL convention.
- Do use weight (Black/Bold vs. Regular/Medium) within ThmanyahSans to create hierarchy, instead of reaching for a second Arabic font family.
- Do keep at least one visible source citation on any screen using `card-content` for medical/weekly content.

**Don't:**
- Don't use `accent` (coral) for primary buttons or navigation — it's a sparing detail color, not a second primary.
- Don't introduce diagnostic-sounding language or a mood-tracking mascot/avatar metaphor — this is a tracking-and-information app, not a mental-health app, per the product's non-negotiable copy rules.
- Don't mirror or re-flow layout logic that assumes LTR reading order (icon direction, swipe direction, card-stack offset direction) — everything must hold up in RTL.
- Don't apply `rounded: full` pill styling to dense data tables or list rows — that softness is for cards and controls, not for information-dense layouts.
- Don't add a dark-mode palette speculatively — there's no dark mode requirement yet; wait until it's actually scoped.
- Don't set `letterSpacing` on any `TextStyle` carrying Arabic text — non-zero kerning breaks iOS's Arabic letter-joining shaping and renders text incorrectly (disconnected/wrong glyph forms), regardless of how good it looks in a web mockup.
