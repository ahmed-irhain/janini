import { ScrollView, StyleSheet } from "react-native";
import type { Topic } from "@janini/shared";
import { Chip } from "./Chip";
import { SPACING } from "../theme/spacing";

interface FilterChipsProps {
  topics: Topic[];
  selectedSlug: string | null;
  onSelect: (slug: string | null) => void;
  allLabel: string;
}

/** Single-select horizontal filter bar built on `Chip`'s `chip-select` /
 * `chip-select-active` styling, with an "All" chip that resets the filter. */
export function FilterChips({ topics, selectedSlug, onSelect, allLabel }: FilterChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      <Chip
        label={allLabel}
        selected={selectedSlug === null}
        onPress={() => onSelect(null)}
        fill={false}
        style={styles.chip}
      />
      {topics.map((topic) => (
        <Chip
          key={topic.id}
          label={topic.labelAr}
          selected={selectedSlug === topic.slug}
          onPress={() => onSelect(topic.slug)}
          fill={false}
          style={styles.chip}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: SPACING.sm,
    paddingBottom: SPACING.sm,
  },
  chip: {
    alignSelf: "flex-start",
  },
});
