import type { Recommendation } from "@janini/shared";

/**
 * PROTOTYPE-ONLY placeholder tips for UI development — general wellness
 * reminders only, no diagnostic or treatment language, consistent with
 * CLAUDE.md's standing rule. Never copy into the real `recommendations`
 * table as-is; real rows should cite a trusted source via `sourceUrl`.
 */

const CREATED_AT = "2026-01-01T00:00:00.000Z";

const TRIMESTER_1_TIPS = [
  "احرصي على تناول الفيتامينات المخصصة للحمل، وخاصة حمض الفوليك، بعد استشارة طبيبك المختص.",
  "اشربي كميات كافية من الماء يوميًا للمساعدة في تخفيف الشعور بالتعب والغثيان.",
  "تناولي وجبات صغيرة ومتكررة إن كنتِ تعانين من غثيان الحمل، فقد يكون ذلك أسهل على المعدة.",
  "احرصي على قسط كافٍ من الراحة والنوم، فالتعب في الأشهر الأولى أمر طبيعي جدًا.",
];

const TRIMESTER_2_TIPS = [
  "حاولي النوم على جانبك الأيسر تدريجيًا، فهو الوضع الأكثر راحة لتدفق الدم مع تقدّم الحمل.",
  "مارسي نشاطًا خفيفًا مثل المشي إن سمحت لكِ حالتك الصحية بذلك، بعد استشارة طبيبك المختص.",
  "احرصي على تضمين أطعمة غنية بالحديد والكالسيوم في نظامك الغذائي.",
  "ابدئي بملاحظة حركة الجنين تدريجيًا، فهذا وقت جيد للتعرف على نمطها المعتاد.",
];

const TRIMESTER_3_TIPS = [
  "تابعي حركة الجنين يوميًا، وتواصلي مع طبيبك المختص فورًا إن لاحظتِ انخفاضًا واضحًا فيها.",
  "ابدئي بتحضير حقيبة المستشفى مسبقًا لتكوني مستعدة عند اقتراب الموعد.",
  "خذي قسطًا كافيًا من الراحة، فرفع القدمين قد يساعد في تخفيف التورم في هذه المرحلة.",
  "ناقشي خطة الولادة مع طبيبك المختص، بما في ذلك العلامات التي تستدعي التوجه للمستشفى.",
];

const MILESTONE_TIPS: Partial<Record<number, string>> = {
  12: "قد يقترح طبيبك المختص إجراء فحوصات الثلث الأول الروتينية خلال هذه الفترة.",
  20: "هذا الأسبوع يتضمن غالبًا فحص الموجات فوق الصوتية التفصيلي لمتابعة نمو الجنين — تأكدي من حجز موعده مع طبيبك المختص.",
  24: "قد يتضمن هذا الأسبوع فحص سكري الحمل الروتيني — استفسري من طبيبك المختص عن موعده المناسب.",
  28: "مع بداية الثلث الثالث، ناقشي مع طبيبك المختص جدول الزيارات الأكثر تكرارًا في هذه المرحلة.",
  36: "قد يشمل هذا الأسبوع فحصًا روتينيًا للبكتيريا العقدية، بحسب توجيه طبيبك المختص.",
  40: "إذا لم تبدأ علامات المخاض بعد، ناقشي مع طبيبك المختص الخطوات التالية المناسبة لحالتك.",
};

function tipsForWeek(weekNumber: number): string[] {
  const pool =
    weekNumber <= 13 ? TRIMESTER_1_TIPS : weekNumber <= 27 ? TRIMESTER_2_TIPS : TRIMESTER_3_TIPS;
  const first = pool[weekNumber % pool.length];
  const second = pool[(weekNumber + 2) % pool.length];
  const milestone = MILESTONE_TIPS[weekNumber];
  return milestone ? [milestone, first, second] : [first, second];
}

export const RECOMMENDATIONS_SEED: Recommendation[] = Array.from({ length: 42 }, (_, i) => {
  const weekNumber = i + 1;
  return tipsForWeek(weekNumber).map((textAr, index) => ({
    id: `seed-recommendation-${weekNumber}-${index}`,
    weekNumber,
    textAr,
    sourceUrl: null,
    sortOrder: index,
    createdAt: CREATED_AT,
  }));
}).flat();
