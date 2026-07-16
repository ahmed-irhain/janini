import type { WeeklyContent } from "@janini/shared";

/**
 * PROTOTYPE-ONLY placeholder content for UI development. Content here is
 * general, widely-known pregnancy/wellness information framed for a Gulf
 * Arabic-speaking audience (no diagnostic or treatment language), meant to
 * stand in for content that will eventually be authored and cited against
 * trusted authorities (WHO, Saudi MOH/SFDA, ACOG, Mayo Clinic, etc.) per
 * docs/plan.md Section 6.2. Never copy this into the real `weekly_content`
 * table as-is — author and cite real content there instead.
 */

const SOURCE_CITATIONS = ["منظمة الصحة العالمية (WHO)", "الكلية الأمريكية لأطباء النساء والتوليد (ACOG)"];
const UPDATED_AT = "2026-01-01T00:00:00.000Z";

interface WeekData {
  weekNumber: number;
  titleAr: string;
  babyChangesAr: string;
  momChangesAr: string;
  babySizeComparisonAr: string | null;
  babyWeightApproxGrams: number | null;
}

const WEEK_DATA: WeekData[] = [
  {
    weekNumber: 1,
    titleAr: "بداية الرحلة",
    babyChangesAr:
      "يُحسب الحمل تقليديًا من أول يوم لآخر دورة شهرية، لذا لا يوجد جنين بعد في هذا الأسبوع. هذا وقت جيد للاهتمام بالتغذية والعادات الصحية العامة استعدادًا للحمل.",
    momChangesAr:
      "قد لا تلاحظين أي تغيّر بعد. إذا كنتِ تخططين للحمل، يُنصح بمراجعة طبيبك المختص للاطمئنان على صحتك العامة.",
    babySizeComparisonAr: null,
    babyWeightApproxGrams: null,
  },
  {
    weekNumber: 2,
    titleAr: "التحضير للحمل",
    babyChangesAr:
      "يقترب موعد الإباضة خلال هذا الأسبوع لدى كثير من النساء، وهو ما يسبق التخصيب الفعلي. لا يوجد جنين لمقارنة حجمه بعد.",
    momChangesAr:
      "قد تلاحظين علامات الإباضة المعتادة لديكِ. الاستمرار في نمط حياة صحي في هذه الفترة مفيد بشكل عام.",
    babySizeComparisonAr: null,
    babyWeightApproxGrams: null,
  },
  {
    weekNumber: 3,
    titleAr: "بداية الانغراس",
    babyChangesAr:
      "قد يحدث التخصيب والانغراس الأولي في بطانة الرحم خلال هذا الأسبوع لدى بعض النساء. الخلايا في هذه المرحلة مجهرية للغاية ولا تُقارن بحجم معروف بعد.",
    momChangesAr:
      "من الطبيعي جدًا ألا تشعري بأي عرض مختلف الآن. تظهر معظم علامات الحمل المبكرة لاحقًا.",
    babySizeComparisonAr: null,
    babyWeightApproxGrams: null,
  },
  {
    weekNumber: 4,
    titleAr: "بداية رحلة التكوّن",
    babyChangesAr:
      "في هذا الأسبوع تبدأ الخلايا الأولى بالانقسام والتشكل. من الطبيعي ألا تظهر أي أعراض واضحة بعد. يُنصح بمتابعة نمط حياة صحي والتواصل مع طبيبك المختص لتحديد موعد أول زيارة.",
    momChangesAr:
      "قد تلاحظين غياب الدورة الشهرية كأول إشارة للحمل، وربما بعض التعب الخفيف أو تغيّر طفيف في الحساسية تجاه الروائح.",
    babySizeComparisonAr: "بحجم حبة الخشخاش تقريبًا",
    babyWeightApproxGrams: null,
  },
  {
    weekNumber: 5,
    titleAr: "تكوّن الأنبوب العصبي",
    babyChangesAr:
      "يبدأ الأنبوب العصبي الذي سيتطور لاحقًا إلى الدماغ والحبل الشوكي بالتكوّن خلال هذا الأسبوع، إلى جانب البدايات الأولى للقلب.",
    momChangesAr:
      "قد تبدأ بعض النساء بالشعور بالغثيان الصباحي والتعب وتغيّرات في الحساسية تجاه بعض الأطعمة والروائح.",
    babySizeComparisonAr: "بحجم بذرة السمسم تقريبًا",
    babyWeightApproxGrams: null,
  },
  {
    weekNumber: 6,
    titleAr: "أول نبضات القلب",
    babyChangesAr:
      "يبدأ القلب الصغير بالنبض خلال هذه الفترة، وتتشكل ملامح أولية للرأس والوجه. هذه واحدة من أهم المراحل المبكرة في التكوّن.",
    momChangesAr:
      "قد تزداد أعراض الغثيان والتعب لدى بعض النساء، وقد تلاحظين حساسية أكبر في الثدي. استشيري طبيبك المختص إن كانت الأعراض شديدة.",
    babySizeComparisonAr: "بحجم حبة العدس تقريبًا",
    babyWeightApproxGrams: null,
  },
  {
    weekNumber: 7,
    titleAr: "تكوّن ملامح الوجه",
    babyChangesAr:
      "تبدأ ملامح الوجه بالتشكل تدريجيًا، وتظهر البدايات الأولى لليدين والقدمين على شكل براعم صغيرة.",
    momChangesAr:
      "قد تستمر أعراض الغثيان الصباحي، وقد تحتاجين للتبول بشكل أكثر تكرارًا من المعتاد.",
    babySizeComparisonAr: "بحجم حبة التوت الأزرق تقريبًا",
    babyWeightApproxGrams: 1,
  },
  {
    weekNumber: 8,
    titleAr: "تكوّن الملامح الأولى",
    babyChangesAr:
      "تبدأ الأعضاء الأساسية بالتكوّن تدريجيًا خلال هذه الفترة. قد تشعرين ببعض الأعراض المعتادة في بداية الحمل. تابعي مع طبيبك المختص أي استفسار حول ما تشعرين به.",
    momChangesAr:
      "قد يظهر تعب ملحوظ وتقلبات مزاجية نتيجة التغيرات الهرمونية، وهذا أمر شائع في هذه المرحلة.",
    babySizeComparisonAr: "بحجم حبة التوت تقريبًا",
    babyWeightApproxGrams: 1,
  },
  {
    weekNumber: 9,
    titleAr: "اكتمال المرحلة الجنينية المبكرة",
    babyChangesAr:
      "تكتمل تقريبًا أهم مراحل تكوّن الأعضاء الأساسية، وتبدأ العضلات الصغيرة بالتكوّن مما يسمح ببعض الحركات غير المحسوسة بعد.",
    momChangesAr:
      "قد تلاحظين تغيّرات في شكل الثدي وزيادة طفيفة في محيط الخصر لدى بعض النساء.",
    babySizeComparisonAr: "بحجم حبة الكرز تقريبًا",
    babyWeightApproxGrams: 2,
  },
  {
    weekNumber: 10,
    titleAr: "بداية مرحلة الجنين",
    babyChangesAr:
      "تنتقل التسمية الطبية من «الجنين المضغي» إلى «الجنين» في هذه المرحلة، إذ تكتمل الأعضاء الرئيسية وتستمر في النمو والنضج.",
    momChangesAr:
      "قد تبدأ أعراض الغثيان بالتراجع تدريجيًا لدى بعض النساء، بينما تستمر لدى أخريات لفترة أطول — وكلا الأمرين طبيعي.",
    babySizeComparisonAr: "بحجم حبة الفراولة تقريبًا",
    babyWeightApproxGrams: 4,
  },
  {
    weekNumber: 11,
    titleAr: "نمو الأصابع",
    babyChangesAr:
      "تتشكل أصابع اليدين والقدمين بوضوح أكبر، ويبدأ الجلد بالتكوّن رغم أنه لا يزال شفافًا جدًا في هذه المرحلة.",
    momChangesAr:
      "قد يبدأ محيط البطن بالتغيّر بشكل طفيف، وقد تشعرين بزيادة في مستوى الطاقة مقارنة بالأسابيع السابقة.",
    babySizeComparisonAr: "بحجم الليمون الأخضر الصغير (الحساوي)",
    babyWeightApproxGrams: 7,
  },
  {
    weekNumber: 12,
    titleAr: "نهاية الثلث الأول",
    babyChangesAr:
      "مع اقتراب نهاية الثلث الأول من الحمل، تكتمل معظم الأعضاء الأساسية وتبدأ في العمل بشكل بدائي، وتصبح المنعكسات الأولى ممكنة.",
    momChangesAr:
      "تقل لدى الكثيرات بعض الأعراض المبكرة تدريجيًا. هذا وقت جيد لمراجعة طبيبك المختص لمتابعة سير الحمل بشكل عام.",
    babySizeComparisonAr: "بحجم حبة ليمون صغيرة",
    babyWeightApproxGrams: 14,
  },
  {
    weekNumber: 13,
    titleAr: "بداية الثلث الثاني",
    babyChangesAr:
      "تبدأ البصمات الأولى بالتكوّن على أطراف الأصابع، وتستمر العظام والغضاريف في التصلب تدريجيًا.",
    momChangesAr:
      "يبدأ الثلث الثاني عادة بتحسّن ملحوظ في مستوى الطاقة وتراجع الغثيان لدى كثير من النساء.",
    babySizeComparisonAr: "بحجم قرن الفول تقريبًا",
    babyWeightApproxGrams: 23,
  },
  {
    weekNumber: 14,
    titleAr: "نمو الشعر الزغبي",
    babyChangesAr:
      "يبدأ شعر ناعم رقيق (يُعرف بالزغب) بتغطية الجسم مؤقتًا، وتصبح حركات الوجه مثل التجهّم ممكنة رغم عدم الشعور بها من الأم بعد.",
    momChangesAr:
      "قد يبدأ محيط البطن بالبروز بشكل أوضح قليلًا، وقد تشعرين براحة أكبر مقارنة بالثلث الأول.",
    babySizeComparisonAr: "بحجم حبة الرمان الصغيرة",
    babyWeightApproxGrams: 43,
  },
  {
    weekNumber: 15,
    titleAr: "تحديد ملامح الوجه",
    babyChangesAr:
      "تصبح ملامح الوجه أكثر وضوحًا، وتستمر العظام في التصلب، وتبدأ حاسة السمع الأولية بالتكوّن تدريجيًا.",
    momChangesAr:
      "قد تلاحظين زيادة تدريجية في الوزن، وهو أمر متوقع مع نمو الحمل في هذه المرحلة.",
    babySizeComparisonAr: "بحجم ثمرة التفاح الصغيرة",
    babyWeightApproxGrams: 70,
  },
  {
    weekNumber: 16,
    titleAr: "بداية الشعور بالحركة",
    babyChangesAr:
      "قد تبدأ بعض الحوامل بالشعور بحركات خفيفة خلال هذه الفترة، وقد يختلف ذلك من حمل لآخر. تستمر العضلات والعظام في التقوّي تدريجيًا.",
    momChangesAr:
      "استمري بمتابعة مواعيدك الدورية مع طبيبك المختص، وقد تلاحظين بريقًا في البشرة لدى البعض بسبب التغيّرات الهرمونية.",
    babySizeComparisonAr: "بحجم ثمرة أفوكادو",
    babyWeightApproxGrams: 100,
  },
  {
    weekNumber: 17,
    titleAr: "تكوّن الدهون تحت الجلد",
    babyChangesAr:
      "تبدأ طبقة رقيقة من الدهون بالتكوّن تحت الجلد، وهي ستساعد لاحقًا في تنظيم حرارة الجسم بعد الولادة.",
    momChangesAr:
      "قد تشعرين بألم خفيف في جانبي أسفل البطن نتيجة تمدد الأربطة الداعمة للرحم، وهو أمر شائع في هذه المرحلة.",
    babySizeComparisonAr: "بحجم حبة البصل الكبيرة",
    babyWeightApproxGrams: 140,
  },
  {
    weekNumber: 18,
    titleAr: "تطور حاسة السمع",
    babyChangesAr:
      "تتطور حاسة السمع بشكل ملحوظ، وقد يبدأ الجنين بالاستجابة للأصوات العالية من حوله.",
    momChangesAr:
      "قد يبدأ محيط البطن بالظهور بوضوح أكبر للآخرين، وقد تشعرين بحركات الجنين الأولى إن لم تكوني قد شعرتِ بها بعد.",
    babySizeComparisonAr: "بحجم ثمرة الفلفل الحلو",
    babyWeightApproxGrams: 190,
  },
  {
    weekNumber: 19,
    titleAr: "تكوّن الطبقة الواقية للجلد",
    babyChangesAr:
      "تتكوّن طبقة بيضاء شمعية على الجلد تُعرف بالطلاء الجبني، وتساعد على حماية الجلد داخل السائل الأمنيوسي.",
    momChangesAr:
      "قد تشعرين بحركة الجنين بوضوح أكبر الآن، وهذا وقت جيد لملاحظة نمطها بشكل عام دون قلق.",
    babySizeComparisonAr: "بحجم ثمرة المانجو",
    babyWeightApproxGrams: 240,
  },
  {
    weekNumber: 20,
    titleAr: "منتصف رحلة الحمل تقريبًا",
    babyChangesAr:
      "وصلتِ إلى منتصف رحلة الحمل تقريبًا، وقد يتضح نوع الجنين خلال فحص الموجات فوق الصوتية الروتيني في هذه الفترة.",
    momChangesAr:
      "عادة ما تتضمن هذه المرحلة فحوصات متابعة روتينية، فاحرصي على عدم تفويت موعدك مع طبيبك المختص.",
    babySizeComparisonAr: "بحجم موزة",
    babyWeightApproxGrams: 300,
  },
  {
    weekNumber: 21,
    titleAr: "تحسّن حاسة التذوق",
    babyChangesAr:
      "تستمر براعم التذوق في التطور، وقد يبدأ الجنين بابتلاع كميات صغيرة من السائل الأمنيوسي كجزء من نموه الطبيعي.",
    momChangesAr:
      "قد تلاحظين زيادة في الشهية، ومن المفيد التركيز على تغذية متوازنة بالتنسيق مع طبيبك المختص.",
    babySizeComparisonAr: "بحجم الجزرة الكبيرة",
    babyWeightApproxGrams: 360,
  },
  {
    weekNumber: 22,
    titleAr: "نمو الحواجب والرموش",
    babyChangesAr:
      "تصبح الحواجب والرموش أكثر وضوحًا، وتستمر ملامح الوجه في اكتساب شكلها النهائي تدريجيًا.",
    momChangesAr:
      "قد تلاحظين ظهور خط داكن خفيف في منتصف البطن (المعروف بخط الحمل)، وهو تغيّر جلدي شائع ومؤقت.",
    babySizeComparisonAr: "بحجم ثمرة الكوسة",
    babyWeightApproxGrams: 430,
  },
  {
    weekNumber: 23,
    titleAr: "تطور الرئتين",
    babyChangesAr:
      "تستمر الرئتان في التطور استعدادًا لمرحلة لاحقة من النمو، وتزداد حركة الجنين وضوحًا للأم.",
    momChangesAr:
      "قد تشعرين ببعض تقلصات براكستون هيكس الخفيفة وغير المنتظمة، وهي طبيعية في هذه المرحلة ما لم تكن مؤلمة أو متكررة.",
    babySizeComparisonAr: "بحجم ثمرة الجريب فروت",
    babyWeightApproxGrams: 500,
  },
  {
    weekNumber: 24,
    titleAr: "استمرار النمو والتطور",
    babyChangesAr:
      "يستمر النمو والتطور تدريجيًا خلال هذه الفترة، وتزداد فرص بقاء الجنين حال الولادة المبكرة جدًا مع الرعاية الطبية المناسبة.",
    momChangesAr:
      "إذا لاحظتِ أي تغيّر يثير قلقك، فأفضل خطوة دائمًا هي استشارة طبيبك المختص مباشرة.",
    babySizeComparisonAr: "بحجم كوز ذرة",
    babyWeightApproxGrams: 600,
  },
  {
    weekNumber: 25,
    titleAr: "زيادة كثافة الشعر",
    babyChangesAr:
      "يزداد شعر الرأس كثافة ولونًا لدى بعض الأجنة، ويستمر الجلد في اكتساب سمك أكبر مع تراكم الدهون تحته.",
    momChangesAr:
      "قد تلاحظين تعبًا أكبر مع زيادة وزن الحمل، فالراحة الكافية مهمة في هذه المرحلة.",
    babySizeComparisonAr: "بحجم رأس القرنبيط",
    babyWeightApproxGrams: 660,
  },
  {
    weekNumber: 26,
    titleAr: "فتح العينين تدريجيًا",
    babyChangesAr:
      "تبدأ العينان بالفتح تدريجيًا بعد أن كانتا مغلقتين، وتستمر الرئتان في التطور استعدادًا لمراحل لاحقة.",
    momChangesAr:
      "قد تشعرين ببعض ضيق التنفس الخفيف مع تمدد الرحم، وهذا شائع ويتحسن عادة بتغيير وضعية الجلوس أو النوم.",
    babySizeComparisonAr: "بحجم رأس الخس",
    babyWeightApproxGrams: 760,
  },
  {
    weekNumber: 27,
    titleAr: "نهاية الثلث الثاني",
    babyChangesAr:
      "مع اقتراب نهاية الثلث الثاني، يستمر الدماغ في النمو بشكل نشط، وتزداد فترات النوم والاستيقاظ وضوحًا.",
    momChangesAr:
      "قد تحتاجين لمراجعة طبيبك المختص لإجراء بعض الفحوصات الروتينية المرتبطة بهذه المرحلة من الحمل.",
    babySizeComparisonAr: "بحجم رأس البروكلي",
    babyWeightApproxGrams: 875,
  },
  {
    weekNumber: 28,
    titleAr: "بداية الثلث الثالث",
    babyChangesAr:
      "مع دخولك الثلث الثالث من الحمل، تفتح العينان بشكل كامل تقريبًا، وتزداد قدرة الجنين على الاستجابة للضوء والصوت.",
    momChangesAr:
      "قد تزداد بعض الأعراض المرتبطة بهذه المرحلة كآلام الظهر. يُنصح بمتابعة مواعيدك بانتظام أكبر بحسب توجيه طبيبك المختص.",
    babySizeComparisonAr: "بحجم حبة باذنجان",
    babyWeightApproxGrams: 1005,
  },
  {
    weekNumber: 29,
    titleAr: "نمو العضلات والرئتين",
    babyChangesAr:
      "تستمر العضلات والرئتان في التقوّي والنضج استعدادًا للأسابيع القادمة، وتصبح حركات الجنين أقوى وأكثر تنظيمًا.",
    momChangesAr:
      "قد تشعرين بضيق تنفس أوضح مع اقتراب الرحم من الحجاب الحاجز، وهذا شائع في الثلث الثالث.",
    babySizeComparisonAr: "بحجم ثمرة القرع العسلي",
    babyWeightApproxGrams: 1153,
  },
  {
    weekNumber: 30,
    titleAr: "زيادة الوزن بمعدل أسرع",
    babyChangesAr:
      "يزداد وزن الجنين بمعدل أسرع خلال هذه الفترة مع تراكم مزيد من الدهون تحت الجلد.",
    momChangesAr:
      "قد تلاحظين تورمًا خفيفًا في القدمين أو الكاحلين، وغالبًا ما يخف بالراحة ورفع القدمين — تحدثي مع طبيبك المختص إن كان شديدًا أو مفاجئًا.",
    babySizeComparisonAr: "بحجم رأس الملفوف",
    babyWeightApproxGrams: 1319,
  },
  {
    weekNumber: 31,
    titleAr: "تطور الجهاز العصبي",
    babyChangesAr:
      "يستمر الجهاز العصبي في التطور بسرعة، وتصبح استجابة الجنين للمؤثرات الخارجية أكثر تناسقًا.",
    momChangesAr:
      "قد يزداد الشعور بالتعب وصعوبة النوم مع كبر حجم البطن، وتجربة أوضاع نوم مختلفة قد تساعد على الراحة.",
    babySizeComparisonAr: "بحجم ثمرة الأناناس الصغيرة",
    babyWeightApproxGrams: 1502,
  },
  {
    weekNumber: 32,
    titleAr: "زيادة ملحوظة في الحجم",
    babyChangesAr:
      "خلال هذه الفترة يستمر الجنين في اكتساب وزن وحجم ملحوظين استعدادًا للأسابيع الأخيرة من الحمل.",
    momChangesAr:
      "قد تلاحظين تغيّرات أكبر في جسمك مع كبر حجم البطن. الراحة الكافية والمتابعة الدورية مع طبيبك المختص أمران مهمّان في هذه المرحلة.",
    babySizeComparisonAr: "بحجم جوز الهند",
    babyWeightApproxGrams: 1702,
  },
  {
    weekNumber: 33,
    titleAr: "تقوّي جهاز المناعة",
    babyChangesAr:
      "يستمر جهاز المناعة في التقوّي تدريجيًا عبر الأجسام المضادة المنتقلة من الأم، وتضيق المساحة داخل الرحم مع كبر حجم الجنين.",
    momChangesAr:
      "قد تشعرين بحركة الجنين بشكل مختلف قليلًا مع ضيق المساحة، وهذا طبيعي — لكن يُنصح دائمًا بملاحظة أي انخفاض واضح في الحركة ومراجعة طبيبك المختص عند الشك.",
    babySizeComparisonAr: "بحجم ثمرة الشمام",
    babyWeightApproxGrams: 1918,
  },
  {
    weekNumber: 34,
    titleAr: "اكتمال نمو الرئتين تقريبًا",
    babyChangesAr:
      "تقترب الرئتان من الاكتمال، ويستمر الجلد في التنعم مع تراجع الطبقة الشمعية الواقية تدريجيًا.",
    momChangesAr:
      "قد تزداد تقلصات براكستون هيكس تكرارًا، وهذا جزء طبيعي من استعداد الجسم للولادة.",
    babySizeComparisonAr: "بحجم بطيخ العسل الصغير",
    babyWeightApproxGrams: 2146,
  },
  {
    weekNumber: 35,
    titleAr: "استعداد الكلى للعمل الكامل",
    babyChangesAr:
      "تكتمل معظم الأعضاء الرئيسية لوظائفها تقريبًا، وتستمر الكليتان والكبد في التطور نحو جاهزيتهما الكاملة.",
    momChangesAr:
      "قد تشعرين بضغط أكبر أسفل الحوض مع نزول الجنين تدريجيًا استعدادًا للولادة لدى بعض الحوامل.",
    babySizeComparisonAr: "بحجم ثمرة القرع الكبيرة",
    babyWeightApproxGrams: 2383,
  },
  {
    weekNumber: 36,
    titleAr: "اقتراب موعد الولادة",
    babyChangesAr:
      "مع اقتراب موعد الولادة المتوقع، يكتسب الجنين مزيدًا من الوزن ويأخذ عادة وضعية الرأس لأسفل استعدادًا للولادة.",
    momChangesAr:
      "تكثر عادة زيارات المتابعة في هذه المرحلة. تحدثي مع طبيبك المختص حول خطة الولادة والأمور التي تحتاجين الاستعداد لها.",
    babySizeComparisonAr: "بحجم خس روماني كبير",
    babyWeightApproxGrams: 2622,
  },
  {
    weekNumber: 37,
    titleAr: "اكتمال المدة تقريبًا",
    babyChangesAr:
      "يُعتبر الحمل مكتمل المدة تقريبًا من هذا الأسبوع، وتستمر الرئتان في آخر مراحل النضج.",
    momChangesAr:
      "قد تلاحظين علامات مبكرة تسبق المخاض لدى بعض النساء. تواصلي مع طبيبك المختص لمعرفة العلامات التي تستدعي التوجه للمستشفى.",
    babySizeComparisonAr: "بحجم ثمرة اليقطين الصغيرة",
    babyWeightApproxGrams: 2859,
  },
  {
    weekNumber: 38,
    titleAr: "استعداد الجسم للولادة",
    babyChangesAr:
      "يواصل الجنين اكتساب الوزن، وتتراجع الطبقة الشمعية الواقية على الجلد بشكل شبه كامل.",
    momChangesAr:
      "قد يزداد الشعور بالثقل والتعب مع اقتراب الموعد. حافظي على راحتك وتابعي أي تعليمات من طبيبك المختص حول علامات المخاض.",
    babySizeComparisonAr: "بحجم كراث كبير",
    babyWeightApproxGrams: 3083,
  },
  {
    weekNumber: 39,
    titleAr: "انتظار علامات المخاض",
    babyChangesAr:
      "يُعتبر الجنين مكتمل النمو تقريبًا، وتستمر الأعضاء في آخر خطوات الاستعداد للحياة خارج الرحم.",
    momChangesAr:
      "قد تشعرين بترقب وتوتر طبيعيين مع اقتراب موعد الولادة. تحدثي مع طبيبك المختص أو من حولك إن احتجتِ للدعم النفسي في هذه المرحلة.",
    babySizeComparisonAr: "بحجم ثمرة اليقطين المتوسطة",
    babyWeightApproxGrams: 3288,
  },
  {
    weekNumber: 40,
    titleAr: "الأسبوع المتوقع للولادة",
    babyChangesAr:
      "هذا هو الأسبوع المتوقع للولادة وفق حساباتك، وقد تأتي الولادة قبله أو بعده بأيام. تواصلي مع طبيبك المختص فور ملاحظة أي علامات مخاض.",
    momChangesAr:
      "من الطبيعي أن تشعري بفارغ صبر أو قلق مع اقتراب الموعد. متابعتك الدورية مع طبيبك المختص هي أفضل مصدر لطمأنتك في هذه المرحلة.",
    babySizeComparisonAr: "بحجم بطيخة صغيرة",
    babyWeightApproxGrams: 3462,
  },
  {
    weekNumber: 41,
    titleAr: "تجاوز الموعد المتوقع",
    babyChangesAr:
      "تجاوز الحمل الموعد المتوقع للولادة أمر شائع نسبيًا وليس مدعاة للقلق بحد ذاته، لكنه يستدعي متابعة أقرب مع طبيبك المختص.",
    momChangesAr:
      "قد يطلب طبيبك المختص فحوصات إضافية للاطمئنان على وضعك ووضع الجنين خلال هذه الفترة.",
    babySizeComparisonAr: "بحجم بطيخة متوسطة الحجم",
    babyWeightApproxGrams: 3600,
  },
  {
    weekNumber: 42,
    titleAr: "المتابعة الدقيقة مع الطبيب",
    babyChangesAr:
      "في حال استمرار الحمل إلى هذا الأسبوع، يستمر الجنين في النمو ببطء أكبر، وتصبح المتابعة الطبية الدقيقة أكثر أهمية.",
    momChangesAr:
      "من الضروري في هذه المرحلة الالتزام الكامل بتوجيهات طبيبك المختص، الذي قد يناقش معك خيارات تحفيز المخاض إذا لزم الأمر.",
    babySizeComparisonAr: "بحجم بطيخة كبيرة",
    babyWeightApproxGrams: 3700,
  },
];

export const WEEKLY_CONTENT_SEED: WeeklyContent[] = WEEK_DATA.map((week) => ({
  id: `seed-week-${week.weekNumber}`,
  weekNumber: week.weekNumber,
  titleAr: week.titleAr,
  babyChangesAr: week.babyChangesAr,
  momChangesAr: week.momChangesAr,
  babySizeComparisonAr: week.babySizeComparisonAr,
  babyWeightApproxGrams: week.babyWeightApproxGrams,
  sourceCitations: SOURCE_CITATIONS,
  updatedAt: UPDATED_AT,
}));
