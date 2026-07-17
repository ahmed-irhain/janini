const ARTICLE_HERO_IMAGES = [
  require("../../assets/illustrations/illu-tracking.png"),
  require("../../assets/illustrations/illu-mother-hero.png"),
  require("../../assets/illustrations/illu-newborn.png"),
  require("../../assets/illustrations/illu-fetal.png"),
];

/** Decorative hero art for article/weekly-content detail screens — there's no
 * real per-article image field, so this cycles through the illustration set
 * by position to add visual variety (mirrors the design mockup's rotation). */
export function getArticleHeroImage(position: number) {
  return ARTICLE_HERO_IMAGES[position % ARTICLE_HERO_IMAGES.length];
}
