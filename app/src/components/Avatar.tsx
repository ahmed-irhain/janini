import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../theme/colors";
import { FONTS } from "../theme/fonts";

interface AvatarProps {
  name?: string;
  size?: number;
}

/** Initials-based avatar for the Settings account section, which previously showed
 * no visual identity for the signed-in user at all. */
export function Avatar({ name, size = 48 }: AvatarProps) {
  const initial = name?.trim()?.charAt(0)?.toUpperCase() ?? "؟";
  return (
    <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.initial, { fontSize: size * 0.4 }]}>{initial}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    backgroundColor: COLORS.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
  },
  initial: {
    fontFamily: FONTS.bold,
    color: COLORS.primary,
  },
});
