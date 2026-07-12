# Business & Product Plan: Arabic-First Pregnancy Tracking App for Saudi Arabia and the Gulf


## 1. Market and Competitive Analysis

### 1.1 Who you're competing with today

**Arabic-native apps (already in the market):**

- **Mammy.app** — the most established Arabic pregnancy app in the region, with over 100,000 users. It offers week-by-week fetal development content, Hijri (the Islamic lunar calendar) and Gregorian calendar support, daily medically-reviewed articles, and — its main revenue driver — an in-app shop for maternity and baby products. Reviews repeatedly praise the content but complain about a laggy shopping interface. This tells you its core tracking experience is not the differentiator; the shop is.
- **Generic "pregnancy calculator" apps** (multiple near-duplicate apps from small Gulf-based developers) — thin, calculator-first tools: due-date math, week counter, some with Hijri support. They have very little original content, are ad-heavy, and read as SEO/keyword-capture products rather than daily-use companions. They are easy to outbuild but also easy for anyone else to clone, since they aren't defensible on content or community.
- No Arabic-native app in the current landscape combines **deep week-by-week content, symptom/appointment tracking, and privacy-respecting monetization** in one product — that gap is real.

**International apps used by Arabic speakers (translated, not localized):**

- **Flo** — the largest global player, free with a paid tier around $50–120/year depending on the market and offer. It has Arabic language support but was built for a global audience; no Hijri calendar, and it settled a 2021 U.S. Federal Trade Commission case over sharing health data with Facebook and Google, which is a genuine trust liability in a values-conscious Gulf market.
- **BabyCenter** — free, ad- and data-monetized, strong in "Birth Club" community groups organized by due month. It was named in a 2024 U.S. Senate Commerce Committee investigation into data-broker practices around fertility and pregnancy apps. No Hijri support, community content is in English/other languages by default.
- **Ovia** — was a standalone pregnancy app, now folded into a consolidated women's-health app priced around $150/year with no free tier, owned by the lab-testing company Labcorp. Its employer-sponsored versions can share de-identified data with insurers, which is a red flag for privacy-sensitive users.
- **Pregnancy+** — known mainly for its 3D fetal visualizations, kick counter, and contraction timer; solid on visuals, thin on localized medical guidance.
- **amma** — free, unlocks premium content via short video views rather than a hard paywall; has Arabic as one of many supported languages, but again, no Hijri calendar and no Gulf-specific medical or lifestyle content.

**The pattern across every international app:** Arabic is treated as a translation layer, not a design starting point. None of them handle the Hijri calendar (which matters for religious milestones during pregnancy, such as guidance around fasting in the month of Ramadan while pregnant), none write content that reflects Gulf postpartum customs (for example, the traditional 40-day postpartum recovery and confinement period), and none address halal/permissible-medication concerns that Gulf mothers commonly ask about.

### 1.2 The localization gap, and how defensible it is

The real gap is **three things bundled together, not one feature**: (1) native Hijri-calendar-aware tracking, (2) medically accurate content written *for* a Gulf/Saudi cultural context rather than translated into it, and (3) a monetization and privacy model that doesn't repeat Flo's and BabyCenter's data-sharing controversies.

Be realistic about defensibility: **none of these are individually hard to copy.** Hijri calendar math is a solved technical problem (open-source libraries exist). Any well-funded competitor — including Mammy.app itself, or a new entrant with real capital — could replicate the concept in a few months. Your actual moat, if you build one, will come from three slower-to-copy things: (a) content depth and OB-GYN-reviewed accuracy that compounds over time, (b) community trust and word-of-mouth within a tight-knit, culturally specific user base, and (c) being first to combine all three gaps well, so you accumulate reviews, brand recognition, and organic search ranking before a copycat arrives. Plan for competitors to follow you, not to be permanently blocked.

---

## 2. Monetization Strategy

### 2.1 Recommended pricing model

The category has converged on **freemium subscription** as the dominant model — free tracking with a paid tier unlocking deeper content, ranging from about $50/year (Flo) to $150/year (Ovia's consolidated app) internationally, with free-to-paid conversion typically in the 3–8% range.

However, a straight monthly subscription is a poor cultural fit for two reasons specific to your market and category:

1. **Regional payment habits lean toward one-time and installment purchases over open-ended recurring billing.** The Gulf's fastest-growing payment behavior is "buy now, pay later" (BNPL) services like Tamara and Tabby — structured, bounded commitments — rather than indefinite auto-renewing subscriptions. App reviews for pregnancy apps globally repeatedly complain about being charged after they stopped needing the app.
2. **Pregnancy itself is a bounded, roughly 9-month relationship**, not an ongoing habit like a fitness app. A recurring subscription that auto-renews past delivery is exactly the complaint you see in reviews of Ovia and HiMommy ("why am I still being charged").

**Recommendation:** offer a **one-time "full pregnancy pass"** (for example, priced around SAR 60–150, roughly $16–40, covering the full pregnancy plus a postpartum period) as the primary paid product, with a lighter free tier (due-date calculator, basic weekly content) to build the funnel. This maps onto proven regional purchase psychology (a single bounded purchase, like a BNPL plan, rather than an indefinite subscription) while still monetizing at a level comparable to what Flo charges per year. You can add an optional low-cost monthly plan for users who prefer to pay as they go, but make the one-time pass the default, prominently priced option. Accept Mada (Saudi Arabia's national debit network, used in the large majority of domestic card transactions), Apple Pay, and STC Pay (Saudi Telecom's digital wallet) at a minimum — together these three cover the overwhelming majority of how Saudi consumers actually prefer to pay online.

## 3. Feature Scope by Phase

| Feature                                  | Phase                                                                                      | Rough build complexity                                                                                                                                                                                                                       |
| ---------------------------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Due-date calculation (Gregorian + Hijri) | MVP (minimum viable product — the smallest version that's genuinely useful to a real user) | Low. Date math plus one open-source Hijri conversion library.                                                                                                                                                                                |
| Week-by-week baby development content    | MVP                                                                                        | Medium — not technically hard, but content-production-heavy; this is where your real work goes (see Section 6).                                                                                                                              |
| Symptom and appointment logging          | MVP                                                                                        | Low-medium. Standard CRUD (create/read/update/delete) data screens against your PostgreSQL backend.                                                                                                                                          |
| Kick counter                             | Phase 2                                                                                    | Low. Simple tap-and-timestamp interaction.                                                                                                                                                                                                   |
| Contraction timer                        | Phase 2                                                                                    | Low-medium. Timer logic plus pattern detection (interval, duration) to flag "call your doctor" thresholds.                                                                                                                                   |
| Weight tracking                          | Phase 2                                                                                    | Low. Simple chart over logged data points.                                                                                                                                                                                                   |
| Postpartum tracking                      | Phase 3                                                                                    | Medium. New content track and data model for the fourth trimester (the period just after birth).                                                                                                                                             |
| AI chat for questions                    | Phase 3                                                                                    | Medium-high. Requires careful prompt design, medical-content grounding, strong disclaimers, and probably a human-in-the-loop safety review before launch — this is also the feature most likely to draw regulatory scrutiny (see Section 7). |
| Partner-sharing                          | Phase 3                                                                                    | Medium. Needs a second user role, permissions, and a share/invite flow — also doubles as a referral mechanism (see Section 8.7).                                                                                                             |

---

## 4. Localization Requirements

- **Hijri calendar support:** implement using an established open-source library (for example, an "Umm al-Qura" calendar calculation library — Umm al-Qura is the official Hijri calendar system used by Saudi Arabia) rather than approximating it yourself; Hijri date boundaries can shift by a day depending on moon-sighting conventions, and getting this subtly wrong will damage trust fast with a religiously observant audience.
- **Full right-to-left (RTL) layout:** this needs to be a day-one architectural decision, not a retrofit. Every screen, icon direction (back arrows, progress bars, timeline visuals), date picker, and number format needs RTL testing — mixed number formats (Arabic-Indic digits vs. Western Arabic numerals) are a common source of user confusion and should be tested with real users, not assumed.
- **Dialect decision — Modern Standard Arabic (MSA, the formal register taught in schools and used in news media across the Arab world) versus Gulf dialect:**
  - MSA is the safer choice for medical content: it reads as authoritative, is understood by every literate Arabic speaker regardless of country, and is what OB-GYN reviewers will expect for accuracy sign-off.
  - A Gulf-inflected, conversational register works well for notifications, tips, and community-facing copy, where warmth and relatability matter more than formality.
  - **Recommendation:** MSA for all medical/weekly content (credibility and reviewer sign-off matter most here); a light Gulf-conversational tone for push notifications, onboarding, and community copy. Avoid a hard commitment to a single country's dialect (e.g., Saudi-specific slang) if you want the wider Gulf market later — it can read as foreign to Kuwaiti, Qatari, or Emirati users.

---

## 5. Technical Plan

### 5.1 Recommended stack

Given that you're building primarily by prompting an AI coding assistant rather than hand-writing everything, favor a stack with strong existing conventions and abundant training data/documentation, so the assistant has the most to work from:

- **Frontend:** React Native 
- **Backend:** Node.js and PostgreSQL
- **Content/CMS layer:** keep week-by-week content in structured database tables (not hardcoded in the app) so an OB-GYN reviewer or you can update medical content without an app-store release cycle.

### 5.2 Offline support

Symptom and appointment logging needs to work without connectivity (women may be at a clinic, traveling, or simply have poor signal). Recommended approach:

- Use a local-first data layer on-device (e.g., SQLite or a sync-aware local database library) that stores all user-entered data locally first.
- Queue writes and sync to your PostgreSQL backend opportunistically when connectivity returns, with simple conflict resolution (last-write-wins is usually fine for single-user health logging; you don't need anything more sophisticated at MVP stage).
- Cache that week's content locally so it's readable offline; only require connectivity for account sync and the AI chat feature (Phase 3).

### 5.3 Apple App Store compliance (this affects your build, not just your submission)

Recent Apple policy changes make this more involved than it used to be, and you should design for it from the start rather than retrofit before submission:

- As of March 2026, apps in the Health & Fitness or Medical category (or flagged for "frequent references to Medical or Treatment Information" in the age-rating questionnaire) must declare a **regulated medical device status** on their App Store listing in the EU, UK, and US. Since you'll likely also seek EU/UK/US distribution or at minimum want to future-proof, plan to answer this honestly: a well-scoped tracking-and-content app without diagnostic claims should be able to declare "not a regulated medical device," but only if your copy and features genuinely avoid diagnostic or treatment claims.
- Apple's broader medical-app rule (Guideline 1.4.1): apps that could be used to diagnose or treat patients face extra review scrutiny, must clearly disclose the accuracy/methodology behind any health claim, and should remind users to consult a doctor before making medical decisions. Don't claim your contraction timer or symptom tracker "diagnoses" anything — position everything as tracking and information, with an explicit "talk to your doctor" reminder built into relevant screens.
- You'll need a clear, accessible privacy policy, explicit user consent before collecting health data, and up-to-date contact/support links — standard requirements, but commonly the cause of rejection when missing.
- **Saudi regulatory layer, separate from Apple:** the Saudi Food and Drug Authority (SFDA) published guidance (MDS-G27) in 2025 clarifying when a digital health product counts as a regulated medical device versus a general wellness product. Apps that only track information and don't diagnose, prevent, monitor, or treat a specific medical condition are generally treated as wellness products with lighter requirements (basic safety and data protection standards) rather than the much heavier medical-device registration and marketing-authorization process. Keep your feature set and marketing copy on the "wellness/tracking" side of that line deliberately — the AI chat feature in Phase 3 is the one most likely to push you toward the "medical device" side if it starts giving anything that reads as diagnostic advice, so design its guardrails carefully.

---

## 6. Medical Content Sourcing

### 6.1 Your options

1. **License existing week-by-week content** from a medical content provider or publisher. Fastest to launch, but ongoing licensing fees, and the content still needs Arabic adaptation (not just translation) for Gulf cultural relevance — halal dietary guidance, Ramadan fasting considerations, postpartum customs.
2. **Hire/consult an OB-GYN (obstetrician-gynecologist, the medical specialty covering pregnancy and women's reproductive health) to review AI-drafted content.** Slower upfront, cheaper ongoing, and produces content that's actually yours and culturally native from the start.
3. **Use public health sources as a factual base** — the World Health Organization (WHO) and the Saudi Ministry of Health publish maternal health guidance that's authoritative, free to reference (check specific citation/reuse terms), and already trusted by the audience you're targeting.

### 6.2 Recommended low-cost path for a solo, unfunded developer

Combine options 2 and 3: draft week-by-week content yourself with an AI assistant, **explicitly grounded in and citing WHO and Saudi Ministry of Health guidance** as your factual source material, then have a single OB-GYN consultant review the full set in batches rather than week-by-week as you go. A flat-fee or hourly consulting arrangement to review, say, 42 weeks of pregnancy content plus a postpartum section in a few concentrated review sessions will be dramatically cheaper than an ongoing per-article review relationship, and is realistic to budget for even without funding. Plan to re-review content annually or whenever a guideline source updates.

**Where this review must happen in your plan, non-negotiably:** every piece of medical content must be OB-GYN-reviewed *before* it ships to any user, not after — this applies even to your MVP's week-by-week content, not just to later phases. Do not treat this as a "we'll get to it after launch" item. This is both an ethical requirement (you are giving health guidance to pregnant women) and, per Section 5.3, a regulatory one — Apple and the SFDA both scrutinize accuracy claims in this category.

---

## 7. Risks and Open Decisions

### 7.1 Biggest risks

- **Regulatory drift:** the line between "wellness app" and "regulated medical device" is judged by your actual features and marketing claims, not your intentions. The AI chat feature (Phase 3) is your highest-risk feature on this front — plan its guardrails (no diagnostic language, clear "not medical advice" framing, mandatory doctor-consultation reminders) before you build it, not after a rejection or complaint.
- **Medical liability:** any factual error in pregnancy content carries real human stakes. Budget for OB-GYN review as a hard cost of doing business, not an optional nice-to-have (see Section 6.2).
- **Competitive response:** as argued in Section 1.3, your core differentiators are copyable by a well-resourced competitor (including Mammy.app itself, which already has 100,000+ users and could add better tracking features and OB-GYN-reviewed content faster than you can build a user base). Speed to a credible MVP, and building genuine content/community depth quickly, matters more than any single feature.
- **Content production bottleneck:** week-by-week content for a full pregnancy plus postpartum is 40+ weeks of material, all requiring medical review. This is very likely your actual critical path to launch, not the engineering.
- **Payment and subscription-fatigue backlash:** the one-time-pass recommendation in Section 2 directly addresses a documented pattern of user complaints about pregnancy-app subscriptions; don't undermine it by defaulting users into auto-renewing plans via dark patterns, which is both a trust risk and an App Store review risk.

### 7.2 Decisions you still need to make before starting to build

- Exact pricing for the one-time pregnancy pass, and whether to offer any lower-priced monthly alternative alongside it.
- Whether to launch iOS-only, Android-only, or both simultaneously (Apple Pay's high share of Saudi payment preference is one point in favor of prioritizing iOS if you must sequence).
- How much Gulf-wide vs. Saudi-only scope to build into content from day one (country-specific ministry-of-health guidance and postpartum customs can differ meaningfully between Saudi Arabia, UAE, Kuwait, etc.).
- Whether your OB-GYN reviewer needs to be Saudi-licensed specifically, or whether a reviewer credentialed elsewhere in the region is acceptable for your purposes — clarify this before you engage anyone, since it affects both cost and how much you can credibly claim in your marketing.
- How the AI chat feature (Phase 3) will be scoped and guarded before you build it, given the regulatory sensitivity flagged above.

---

## 8. Marketing and Sales Plan

### 8.1 Go-to-market channels

Saudi Arabia has extremely high social media penetration (around 94% of the population), skewing young (about 70% under 35). The platforms that matter most for reaching pregnant women specifically:

- **Snapchat** — historically very strong in Saudi Arabia, with roughly 25 million users and especially high usage among women (its Saudi ad audience skews close to gender-balanced, unlike Twitter/X, which is heavily male). This is a strong candidate for your core channel.
- **Instagram** — best for visual storytelling (weekly baby-size comparisons, milestone graphics) and where many "mommy" content creators already have engaged followings.
- **TikTok** — has the highest time-spent-per-user of any platform in Saudi Arabia and is growing fastest, but skews more male in ad-audience composition than Snapchat or Instagram; still valuable for short educational/awareness content.
- **OB-GYN clinic partnerships** — realistic even at solo-developer scale in a lightweight form: a printed card or QR code in a clinic waiting room costs little and reaches exactly your target user at exactly the right moment (see 8.6 for the more involved partnership version).

### 8.2 Influencer/content strategy

Saudi Arabia's influencer advertising market is projected to reach roughly $95.7 million in spend in 2026, growing at a high-single-digit percentage annually — a real, active channel, not a fringe tactic. For a solo, unfunded developer, **micro- and nano-influencers (smaller creators, often with a few thousand to low hundred-thousands of followers, in maternal-health or parenting niches) are the realistic entry point**, not the large celebrity accounts. Nano/micro creators consistently show stronger trust and engagement with niche audiences than large accounts, and cost dramatically less — often a product exchange or a few hundred dollars per post rather than the tens of thousands large accounts command. Consider approaching Arabic-speaking OB-GYNs or midwives with a social media presence as a credibility-focused variant of this — a doctor-influencer recommending your app carries more weight in a health category than a lifestyle blogger.

### 8.3 App Store Optimization (ASO — optimizing your app's title, keywords, and screenshots so it ranks higher in App Store/Google Play search results)

Arabic search behavior differs meaningfully from English, and you should plan for at least three overlapping keyword sets: (1) MSA medical terms (the formal words for "pregnancy," "due date," "fetus," etc.), (2) common colloquial/Gulf phrasing people actually type when searching, and (3) transliterated English terms some users search in Latin script (e.g., typing an English brand-style term in Arabic script or vice versa). Look at what keywords Mammy.app and the generic calculator apps already rank for as your starting keyword research, then differentiate on terms none of them own yet (e.g., anything mentioning Hijri-calendar pregnancy tracking, which currently has thin competition).

### 8.4 Organic/community strategy

A "due this month" cohort feature (grouping users by expected due date, similar to BabyCenter's "Birth Clubs") is a proven pattern for driving word-of-mouth in this category, and pregnant women are unusually likely to recommend apps to friends and family going through the same experience at the same time — this is one of the strongest organic growth levers available to you and costs nothing to justify building, only to build. Treat it as a Phase 2/3 priority alongside partner-sharing, since both features reinforce the same underlying behavior: sharing the experience with other people.

### 8.5 Paid acquisition estimate

Global cost-per-install (CPI — what an advertiser pays for each app install from a paid ad) benchmarks put the Europe/Middle East/Africa region meaningfully cheaper than North America, roughly in the $2–4 range, with health/lifestyle apps often running somewhat above the category average due to competition for higher-value users, and iOS consistently costing more than Android everywhere. Saudi-specific data on Apple's ad platform shows lower tap-through rates than global benchmarks (around 5.5% versus higher rates elsewhere), meaning your ad creative will likely need more localization and testing effort to convert well, not just translation. **Recommendation: don't start with paid acquisition before revenue.** As an unfunded solo developer, spend your limited runway on organic channels (Sections 8.1–8.4) until you have real conversion and retention data; paid acquisition is worth revisiting once you know your actual free-to-paid conversion rate and can calculate whether a given CPI is profitable against it.

### 8.6 Partnership channel

Partnering with maternity hospitals or major baby-product brands for co-marketing is realistic in a lightweight form (a QR code or referral card at a clinic, as in 8.1) but a formal, resourced partnership (in-app offers, official hospital endorsement, negotiated brand deals) is a later-stage move — it typically requires a business development relationship, a legal agreement, and often a level of scale or funding you won't have at MVP stage. Treat this as a Phase 2/3 growth lever once you have user numbers and testimonials to make the pitch credible, not a Day 1 tactic.

### 8.7 Pre-launch strategy

Build a simple landing page and a WhatsApp or Instagram waitlist **before** you finish the app. This costs almost nothing, validates real demand (are people actually willing to give you their contact details for this?) before you sink more building time in, and gives you a warm list of first users to notify at launch — which matters a lot for early App Store reviews and rankings, since a cluster of genuine positive reviews in your first week is disproportionately valuable for ranking momentum.

### 8.8 Retention and referral

Because pregnancy is a bounded, roughly 9-month, once-per-pregnancy relationship with your app, your normal-app playbook of long-term retention loops doesn't fully apply — your window to generate word-of-mouth is short and won't repeat for that user. Build referral incentives around the two natural sharing moments already in your feature list:

- **Partner-sharing (Phase 3):** frame this explicitly as an invite mechanism, not just a feature — "invite your husband/partner to follow along" is a natural, non-awkward reason to share the app with a second person, and each partner invited is a second potential source of future word-of-mouth (for a future pregnancy, or to their own friends).
- **"Due this month" cohorts (Section 8.4):** give users an easy one-tap way to invite a friend into their due-date group, since recommending an app to another pregnant friend is something this audience already does naturally — you're removing friction from behavior that already happens, not manufacturing new behavior.
- Consider a modest incentive for both sides of a referral (e.g., a discount on the one-time pregnancy pass, or an extended free-tier content unlock) given the short window — a referral program that pays off slowly across many months won't suit a use case that ends in under a year.
