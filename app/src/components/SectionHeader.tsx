import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../theme/colors";
import { FONTS } from "../theme/fonts";
import { SPACING } from "../theme/spacing";
import { TYPE } from "../theme/typography";

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
}

/** Title + optional trailing action link — the sectionHeader pattern repeated in
 * SettingsScreen (edit link) and TrackScreen (add link). */
export function SectionHeader({ title, actionLabel, onActionPress }: SectionHeaderProps) {
  return (
    <View style={styles.row}>
      {actionLabel && onActionPress ? (
        <Pressable onPress={onActionPress} hitSlop={8}>
          <Text style={[TYPE.bodySmall, styles.action]}>{actionLabel}</Text>
        </Pressable>
      ) : null}
      <Text style={[TYPE.h2, styles.title]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SPACING.xs,
  },
  title: {
    color: COLORS.ink,
    textAlign: "right",
    paddingVertical: SPACING.xs,
  },
  action: {
    color: COLORS.primary,
    fontFamily: FONTS.medium,
    paddingVertical: SPACING.xs,
  },
});
