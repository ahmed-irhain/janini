import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../theme/colors";
import { TYPE } from "../theme/typography";

interface ListRowProps {
  label: string;
  value: string;
}

/** Label/value row — the pattern repeated for Settings' account rows (name, email). */
export function ListRow({ label, value }: ListRowProps) {
  return (
    <View style={styles.row}>
      <Text style={[TYPE.body, styles.value]} numberOfLines={1}>
        {value}
      </Text>
      <Text style={[TYPE.caption, styles.label]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: 2,
  },
  label: {
    color: COLORS.inkMuted,
    textAlign: "right",
  },
  value: {
    color: COLORS.ink,
    textAlign: "right",
    writingDirection: "rtl",
  },
});
