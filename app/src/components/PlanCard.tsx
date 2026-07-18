import { Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { COLORS } from "../theme/colors";
import { RADIUS } from "../theme/radius";
import { SPACING } from "../theme/spacing";
import { TYPE, LATIN_FONTS } from "../theme/typography";

interface PlanCardProps {
  title: string;
  description: string;
  priceValue: string;
  priceSuffix: string;
  badgeLabel?: string;
  selected: boolean;
  onPress: () => void;
}

/** Selectable pricing tile for the paywall's plan picker — composed from
 * `Card`/`Badge` rather than a dedicated design.md token (none exists for
 * pricing cards). */
export function PlanCard({
  title,
  description,
  priceValue,
  priceSuffix,
  badgeLabel,
  selected,
  onPress,
}: PlanCardProps) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityState={{ selected }}>
      <Card
        elevation={selected ? "elevated" : "card"}
        style={[styles.card, { borderColor: selected ? COLORS.primary : COLORS.border }]}
      >
        <View style={styles.headerRow}>
          <Ionicons
            name={selected ? "checkmark-circle" : "ellipse-outline"}
            size={24}
            color={selected ? COLORS.primary : COLORS.border}
          />
          {badgeLabel ? <Badge label={badgeLabel} /> : <View />}
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.priceValue}>{priceValue}</Text>
          <Text style={styles.priceSuffix}>{priceSuffix}</Text>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderRadius: RADIUS.xl,
  },
  headerRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    ...TYPE.h2,
    color: COLORS.ink,
    textAlign: "right",
  },
  description: {
    ...TYPE.bodySmall,
    color: COLORS.inkMuted,
    textAlign: "right",
  },
  priceRow: {
    flexDirection: "row-reverse",
    alignItems: "baseline",
    gap: SPACING.xs,
    paddingTop: SPACING.xs,
  },
  priceValue: {
    fontFamily: LATIN_FONTS.bold,
    fontSize: 24,
    color: COLORS.ink,
  },
  priceSuffix: {
    ...TYPE.bodySmall,
    color: COLORS.inkMuted,
    textAlign: "right",
  },
});
