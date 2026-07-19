import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { parseMarkdown, type MarkdownBlock, type MarkdownSpan } from "../lib/markdown";
import { COLORS, withAlpha } from "../theme/colors";
import { FONTS } from "../theme/fonts";
import { RADIUS } from "../theme/radius";
import { SPACING } from "../theme/spacing";
import { TYPE } from "../theme/typography";

interface ArticleBodyProps {
  markdown: string;
}

/** Renders an article's markdown body (see app/src/lib/markdown.ts) as native
 * RTL-safe elements styled from the app's design tokens. */
export function ArticleBody({ markdown }: ArticleBodyProps) {
  const blocks = parseMarkdown(markdown);
  return (
    <View style={styles.container}>
      {blocks.map((block, index) => (
        <ArticleBlock key={index} block={block} />
      ))}
    </View>
  );
}

function ArticleBlock({ block }: { block: MarkdownBlock }) {
  switch (block.type) {
    case "heading":
      return <Text style={styles.heading}>{renderSpans(block.spans)}</Text>;
    case "paragraph":
      return <Text style={styles.paragraph}>{renderSpans(block.spans)}</Text>;
    case "quote":
      return (
        <View style={styles.quote}>
          <Text style={styles.quoteText}>{renderSpans(block.spans)}</Text>
        </View>
      );
    case "list":
      return (
        <View style={styles.list}>
          {block.items.map((item, index) => (
            <View key={index} style={styles.listItemRow}>
              <Text style={styles.listMarker}>{block.ordered ? `${index + 1}.` : "•"}</Text>
              <Text style={styles.listItemText}>{renderSpans(item)}</Text>
            </View>
          ))}
        </View>
      );
  }
}

function renderSpans(spans: MarkdownSpan[]): ReactNode {
  return spans.map((span, index) => (
    <Text key={index} style={[span.bold && styles.bold, span.italic && styles.italic]}>
      {span.text}
    </Text>
  ));
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.sm,
  },
  heading: {
    ...TYPE.h2,
    color: COLORS.ink,
    textAlign: "right",
    paddingVertical: SPACING.sm,
  },
  paragraph: {
    ...TYPE.body,
    fontSize: 16,
    lineHeight: 26,
    color: COLORS.ink,
    textAlign: "right",
  },
  bold: {
    fontFamily: FONTS.bold,
  },
  italic: {
    fontStyle: "italic",
  },
  quote: {
    backgroundColor: withAlpha(COLORS.warning, 0.12),
    borderRadius: RADIUS.sm,
    borderRightWidth: 3,
    borderRightColor: COLORS.warning,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  quoteText: {
    ...TYPE.body,
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.ink,
    textAlign: "right",
  },
  list: {
    gap: SPACING.xs,
  },
  listItemRow: {
    flexDirection: "row-reverse",
    alignItems: "flex-start",
    gap: SPACING.sm,
  },
  listMarker: {
    ...TYPE.body,
    fontSize: 16,
    lineHeight: 26,
    color: COLORS.primary,
  },
  listItemText: {
    ...TYPE.body,
    flex: 1,
    fontSize: 16,
    lineHeight: 26,
    color: COLORS.ink,
    textAlign: "right",
  },
});
