import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq } from "drizzle-orm";
import { articles } from "./schema.js";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const sql = postgres(connectionString, { max: 1 });
const db = drizzle(sql);

// General wellness articles not tied to a specific week, cited to trusted
// authorities per docs/plan.md Section 6.2. Ported from the former
// app/src/data/articlesSeed.ts prototype fixture now that the app fetches
// from this table instead of hardcoding it.
const SEED_ARTICLES = [
  {
    titleAr: "التغذية السليمة خلال الحمل",
    summaryAr:
      "نظام غذائي متوازن غني بالفواكه والخضروات والحبوب الكاملة ومصادر البروتين يدعم صحتك وصحة جنينك. احرصي على استشارة طبيبك المختص بخصوص أي مكملات غذائية.",
    sourceName: "منظمة الصحة العالمية (WHO)",
    sourceUrl: "https://www.who.int/health-topics/nutrition",
  },
  {
    titleAr: "أهمية فيتامينات ما قبل الولادة",
    summaryAr:
      "حمض الفوليك والحديد والكالسيوم من العناصر التي تحتاجينها بكميات أكبر أثناء الحمل. ناقشي مع طبيبك المختص الجرعات والمكملات المناسبة لحالتك.",
    sourceName: "الكلية الأمريكية لأطباء النساء والتوليد (ACOG)",
    sourceUrl: "https://www.acog.org/womens-health/faqs/nutrition-during-pregnancy",
  },
  {
    titleAr: "ممارسة الرياضة الآمنة أثناء الحمل",
    summaryAr:
      "النشاط الخفيف مثل المشي والسباحة ورياضة الحمل يساعد عادة على تحسين المزاج والنوم. استشيري طبيبك المختص قبل البدء بأي نشاط رياضي جديد.",
    sourceName: "الكلية الأمريكية لأطباء النساء والتوليد (ACOG)",
    sourceUrl: "https://www.acog.org/womens-health/faqs/exercise-during-pregnancy",
  },
  {
    titleAr: "نصائح للنوم المريح خلال الحمل",
    summaryAr:
      "قد يصبح النوم أصعب مع تقدّم الحمل. النوم على الجانب الأيسر واستخدام الوسائد الداعمة قد يساعدان على الراحة. تحدثي مع طبيبك المختص إن استمرت صعوبة النوم.",
    sourceName: "مايو كلينك (Mayo Clinic)",
    sourceUrl:
      "https://www.mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/pregnancy/art-20046832",
  },
  {
    titleAr: "علامات تستدعي التواصل الفوري مع طبيبك",
    summaryAr:
      "نزيف مهاجم، ألم شديد، صداع مستمر، أو انخفاض واضح في حركة الجنين علامات يجب عدم تجاهلها. تواصلي مع طبيبك المختص أو توجهي للطوارئ فور ملاحظتها.",
    sourceName: "وزارة الصحة السعودية",
    sourceUrl: "https://www.moh.gov.sa",
  },
  {
    titleAr: "الصحة النفسية خلال الحمل",
    summaryAr:
      "من الطبيعي أن تمرّي بتقلبات مزاجية أثناء الحمل، لكن الشعور المستمر بالحزن أو القلق يستحق الحديث عنه. لا تترددي في مراجعة طبيبك المختص إن احتجتِ للدعم.",
    sourceName: "منظمة الصحة العالمية (WHO)",
    sourceUrl: "https://www.who.int/news-room/fact-sheets/detail/maternal-mental-health",
  },
  {
    titleAr: "السفر أثناء الحمل",
    summaryAr:
      "السفر عادة ما يكون آمنًا في معظم مراحل الحمل غير المعقد، مع بعض الاحتياطات مثل الحركة الدورية أثناء الرحلات الطويلة. استشيري طبيبك المختص قبل التخطيط لأي سفر.",
    sourceName: "الكلية الأمريكية لأطباء النساء والتوليد (ACOG)",
    sourceUrl: "https://www.acog.org/womens-health/faqs/travel-during-pregnancy",
  },
  {
    titleAr: "شرب الماء بكميات كافية",
    summaryAr:
      "تزداد حاجة الجسم للسوائل أثناء الحمل لدعم زيادة حجم الدم والسائل الأمنيوسي. حاولي شرب الماء بانتظام على مدار اليوم.",
    sourceName: "مايو كلينك (Mayo Clinic)",
    sourceUrl:
      "https://www.mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/pregnancy-nutrition/art-20045082",
  },
];

let inserted = 0;
for (const article of SEED_ARTICLES) {
  const [existing] = await db
    .select()
    .from(articles)
    .where(eq(articles.titleAr, article.titleAr));
  if (existing) continue;

  await db.insert(articles).values({
    weekNumber: null,
    titleAr: article.titleAr,
    summaryAr: article.summaryAr,
    sourceName: article.sourceName,
    sourceUrl: article.sourceUrl,
    publishedAt: new Date(),
  });
  inserted++;
}

await sql.end();
console.log(`Seeded ${inserted} new article(s), skipped ${SEED_ARTICLES.length - inserted} existing.`);
