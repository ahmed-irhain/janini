/**
 * Emoji standing in for each week's `babySizeComparisonAr` text in
 * weeklyContentSeed.ts (e.g. week 10 "بحجم حبة الفراولة تقريبًا" → 🍓).
 * Weeks 1-3 have no entry, matching their `null` babySizeComparisonAr.
 * Some weeks reuse a close visual stand-in where unicode has no exact
 * match for the referenced fruit/vegetable (e.g. no poppy seed or
 * pomegranate emoji).
 */
const BABY_SIZE_EMOJI: Partial<Record<number, string>> = {
  4: "🌱", // poppy seed
  5: "🌾", // sesame seed
  6: "🫘", // lentil
  7: "🫐", // blueberry
  8: "🍇", // raspberry (no exact emoji, grapes as closest cluster-berry)
  9: "🍒", // cherry
  10: "🍓", // strawberry
  11: "🍋", // small lime
  12: "🍋", // small lemon
  13: "🫛", // fava bean pod
  14: "🔴", // small pomegranate (no exact emoji)
  15: "🍎", // apple
  16: "🥑", // avocado
  17: "🧅", // onion
  18: "🫑", // bell pepper
  19: "🥭", // mango
  20: "🍌", // banana
  21: "🥕", // carrot
  22: "🥒", // zucchini (no exact emoji, cucumber as closest)
  23: "🍊", // grapefruit (no exact emoji, tangerine as closest)
  24: "🌽", // corn
  25: "🥔", // cauliflower (no exact emoji, potato as closest)
  26: "🥬", // lettuce
  27: "🥦", // broccoli
  28: "🍆", // eggplant
  29: "🍠", // butternut squash (no exact emoji, sweet potato as closest)
  30: "🥬", // cabbage
  31: "🍍", // pineapple
  32: "🥥", // coconut
  33: "🍈", // cantaloupe
  34: "🍈", // honeydew melon
  35: "🎃", // large pumpkin/squash
  36: "🥬", // large romaine lettuce
  37: "🎃", // small pumpkin
  38: "🧅", // large leek (no exact emoji, onion as closest)
  39: "🎃", // medium pumpkin
  40: "🍉", // small watermelon
  41: "🍉", // medium watermelon
  42: "🍉", // large watermelon
};

export function getBabySizeEmoji(weekNumber: number): string | undefined {
  return BABY_SIZE_EMOJI[weekNumber];
}
