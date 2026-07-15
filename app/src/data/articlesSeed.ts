import type { Article } from "@janini/shared";

/**
 * PROTOTYPE-ONLY placeholder articles for UI development — general pregnancy
 * wellness reading, not tied to a specific week (`weekNumber: null`), no
 * diagnostic or treatment language, consistent with CLAUDE.md's standing
 * rule. Never copy into the real `articles` table as-is; real rows should
 * cite a trusted source via `sourceName`/`sourceUrl` per docs/plan.md
 * Section 6.2.
 */

const CREATED_AT = "2026-01-01T00:00:00.000Z";

interface ArticleSeedData {
  id: string;
  titleAr: string;
  summaryAr: string;
  sourceName: string;
  sourceUrl: string;
}

const ARTICLE_DATA: ArticleSeedData[] = [
  {
    id: "seed-article-nutrition",
    titleAr: "التغذية السليمة خلال الحمل",
    summaryAr:
      "نظام غذائي متوازن غني بالفواكه والخضروات والحبوب الكاملة ومصادر البروتين يدعم صحتك وصحة جنينك. احرصي على استشارة طبيبك المختص بخصوص أي مكملات غذائية.",
    sourceName: "منظمة الصحة العالمية (WHO)",
    sourceUrl: "https://www.who.int/health-topics/nutrition",
  },
  {
    id: "seed-article-prenatal-vitamins",
    titleAr: "أهمية فيتامينات ما قبل الولادة",
    summaryAr:
      "حمض الفوليك والحديد والكالسيوم من العناصر التي تحتاجينها بكميات أكبر أثناء الحمل. ناقشي مع طبيبك المختص الجرعات والمكملات المناسبة لحالتك.",
    sourceName: "الكلية الأمريكية لأطباء النساء والتوليد (ACOG)",
    sourceUrl: "https://www.acog.org/womens-health/faqs/nutrition-during-pregnancy",
  },
  {
    id: "seed-article-safe-exercise",
    titleAr: "ممارسة الرياضة الآمنة أثناء الحمل",
    summaryAr:
      "النشاط الخفيف مثل المشي والسباحة ورياضة الحمل يساعد عادة على تحسين المزاج والنوم. استشيري طبيبك المختص قبل البدء بأي نشاط رياضي جديد.",
    sourceName: "الكلية الأمريكية لأطباء النساء والتوليد (ACOG)",
    sourceUrl: "https://www.acog.org/womens-health/faqs/exercise-during-pregnancy",
  },
  {
    id: "seed-article-sleep",
    titleAr: "نصائح للنوم المريح خلال الحمل",
    summaryAr:
      "قد يصبح النوم أصعب مع تقدّم الحمل. النوم على الجانب الأيسر واستخدام الوسائد الداعمة قد يساعدان على الراحة. تحدثي مع طبيبك المختص إن استمرت صعوبة النوم.",
    sourceName: "مايو كلينك (Mayo Clinic)",
    sourceUrl: "https://www.mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/pregnancy/art-20046832",
  },
  {
    id: "seed-article-warning-signs",
    titleAr: "علامات تستدعي التواصل الفوري مع طبيبك",
    summaryAr:
      "نزيف مهاجم، ألم شديد، صداع مستمر، أو انخفاض واضح في حركة الجنين علامات يجب عدم تجاهلها. تواصلي مع طبيبك المختص أو توجهي للطوارئ فور ملاحظتها.",
    sourceName: "وزارة الصحة السعودية",
    sourceUrl: "https://www.moh.gov.sa",
  },
  {
    id: "seed-article-mental-health",
    titleAr: "الصحة النفسية خلال الحمل",
    summaryAr:
      "من الطبيعي أن تمرّي بتقلبات مزاجية أثناء الحمل، لكن الشعور المستمر بالحزن أو القلق يستحق الحديث عنه. لا تترددي في مراجعة طبيبك المختص إن احتجتِ للدعم.",
    sourceName: "منظمة الصحة العالمية (WHO)",
    sourceUrl: "https://www.who.int/news-room/fact-sheets/detail/maternal-mental-health",
  },
  {
    id: "seed-article-travel",
    titleAr: "السفر أثناء الحمل",
    summaryAr:
      "السفر عادة ما يكون آمنًا في معظم مراحل الحمل غير المعقد، مع بعض الاحتياطات مثل الحركة الدورية أثناء الرحلات الطويلة. استشيري طبيبك المختص قبل التخطيط لأي سفر.",
    sourceName: "الكلية الأمريكية لأطباء النساء والتوليد (ACOG)",
    sourceUrl: "https://www.acog.org/womens-health/faqs/travel-during-pregnancy",
  },
  {
    id: "seed-article-hydration",
    titleAr: "شرب الماء بكميات كافية",
    summaryAr:
      "تزداد حاجة الجسم للسوائل أثناء الحمل لدعم زيادة حجم الدم والسائل الأمنيوسي. حاولي شرب الماء بانتظام على مدار اليوم.",
    sourceName: "مايو كلينك (Mayo Clinic)",
    sourceUrl: "https://www.mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/pregnancy-nutrition/art-20045082",
  },
];

export const ARTICLES_SEED: Article[] = ARTICLE_DATA.map((article) => ({
  id: article.id,
  weekNumber: null,
  titleAr: article.titleAr,
  summaryAr: article.summaryAr,
  bodyAr: null,
  sourceName: article.sourceName,
  sourceUrl: article.sourceUrl,
  publishedAt: CREATED_AT,
  createdAt: CREATED_AT,
}));
