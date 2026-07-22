import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "../theme/colors";
import { RADIUS } from "../theme/radius";
import { SHADOWS } from "../theme/shadows";

interface IconButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  accessibilityLabel: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

/** `icon-button-circular` — back buttons, favorites, notification bells: a
 * circular `surface`-filled tap target with an `ink` icon. */
export function IconButton({ icon, onPress, accessibilityLabel, size = 44, style }: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [
        styles.circle,
        SHADOWS.card,
        { width: size, height: size, borderRadius: RADIUS.full, opacity: pressed ? 0.7 : 1 },
        style,
      ]}
    >
      <Ionicons name={icon} size={Math.round(size * 0.45)} color={COLORS.ink} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  circle: {
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },
});
