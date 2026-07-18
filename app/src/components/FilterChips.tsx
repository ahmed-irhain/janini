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
      style={styles.scrollView}
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

// A horizontal ScrollView with no explicit height sizes itself purely from
// content measurement, which can race with re-renders on selection changes
// and transiently collapse to near-zero, squashing every chip inside it.
// Pinning a fixed height (Chip's line-height 18 + paddingVertical sm*2 + a
// hair of slack) removes that ambiguity entirely.
const CHIP_ROW_HEIGHT = 44;

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 0,
    flexShrink: 0,
    height: CHIP_ROW_HEIGHT,
    marginBottom: SPACING.sm,
  },
  row: {
    alignItems: "center",
    gap: SPACING.sm,
  },
  chip: {
    alignSelf: "center",
  },
});
