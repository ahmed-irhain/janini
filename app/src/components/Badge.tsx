import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS, withAlpha } from "../theme/colors";
import { RADIUS } from "../theme/radius";
import { SPACING } from "../theme/spacing";
import { TYPE } from "../theme/typography";

type BadgeTone = "neutral" | "warning";

interface BadgeProps {
  label: string;
  tone?: BadgeTone;
  /** Ionicons name, e.g. "shield-checkmark" for source citations. */
  icon?: keyof typeof Ionicons.glyphMap;
}

const TONE_STYLES: Record<BadgeTone, { bg: string; text: string }> = {
  neutral: { bg: COLORS.surfaceAlt, text: COLORS.inkMuted },
  warning: { bg: withAlpha(COLORS.warning, 0.15), text: COLORS.warning },
};

/** `chip-tag` — static, non-interactive label. Used for source citations
 * (medical-trust signal per project rules) and premium/status tags. */
export function Badge({ label, tone = "neutral", icon }: BadgeProps) {
  const t = TONE_STYLES[tone];
  return (
    <View style={[styles.badge, { backgroundColor: t.bg }]}>
      {icon ? <Ionicons name={icon} size={13} color={t.text} /> : null}
      <Text style={[TYPE.caption, styles.label, { color: t.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row-reverse",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: SPACING.xs,
    borderRadius: RADIUS.full,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
  },
  label: {
    textAlign: "right",
  },
});
