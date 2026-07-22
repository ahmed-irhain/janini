import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  integer,
  date,
  pgEnum,
} from "drizzle-orm/pg-core";

export const localeEnum = pgEnum("locale", ["ar", "en"]);
export const severityEnum = pgEnum("symptom_severity", [
  "mild",
  "moderate",
  "severe",
]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  displayName: text("display_name"),
  locale: localeEnum("locale").notNull().default("ar"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const pregnancies = pgTable("pregnancies", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  lastMenstrualPeriod: date("last_menstrual_period").notNull(),
  dueDateGregorian: date("due_date_gregorian").notNull(),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

/**
 * Week-by-week content lives in the DB (not hardcoded) so it can be updated
 * without an app-store release. See docs/plan.md Section 5.1 and Section 6 —
 * there is no OB-GYN review gate; content is grounded in and cited to
 * trusted authorities (WHO, Saudi MOH/SFDA, ACOG, Mayo Clinic, etc.) via
 * sourceCitations.
 */
export const weeklyContent = pgTable("weekly_content", {
  id: uuid("id").primaryKey().defaultRandom(),
  weekNumber: integer("week_number").notNull().unique(),
  titleAr: text("title_ar").notNull(),
  babyChangesAr: text("baby_changes_ar").notNull(),
  momChangesAr: text("mom_changes_ar"),
  babySizeComparisonAr: text("baby_size_comparison_ar"),
  babyWeightApproxGrams: integer("baby_weight_approx_grams"),
  sourceCitations: text("source_citations").array().notNull().default([]),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const recommendations = pgTable("recommendations", {
  id: uuid("id").primaryKey().defaultRandom(),
  weekNumber: integer("week_number")
    .notNull()
    .references(() => weeklyContent.weekNumber, { onDelete: "cascade" }),
  textAr: text("text_ar").notNull(),
  sourceUrl: text("source_url"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const topics = pgTable("topics", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  labelAr: text("label_ar").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const articles = pgTable("articles", {
  id: uuid("id").primaryKey().defaultRandom(),
  weekNumber: integer("week_number").references(() => weeklyContent.weekNumber, {
    onDelete: "set null",
  }),
  topicId: uuid("topic_id").references(() => topics.id, { onDelete: "set null" }),
  titleAr: text("title_ar").notNull(),
  summaryAr: text("summary_ar").notNull(),
  bodyAr: text("body_ar"),
  sourceName: text("source_name"),
  sourceUrl: text("source_url"),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const symptomLogs = pgTable("symptom_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  pregnancyId: uuid("pregnancy_id")
    .notNull()
    .references(() => pregnancies.id, { onDelete: "cascade" }),
  symptom: text("symptom").notNull(),
  severity: severityEnum("severity").notNull().default("mild"),
  note: text("note"),
  loggedAt: timestamp("logged_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const appointments = pgTable("appointments", {
  id: uuid("id").primaryKey().defaultRandom(),
  pregnancyId: uuid("pregnancy_id")
    .notNull()
    .references(() => pregnancies.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  location: text("location"),
  scheduledAt: timestamp("scheduled_at", { withTimezone: true }).notNull(),
  notes: text("notes"),
});

export const environmentEnum = pgEnum("rc_environment", ["sandbox", "production"]);
export const subscriptionStatusEnum = pgEnum("subscription_status", [
  "active",
  "expired",
  "billing_issue",
  "none",
]);

/**
 * Standalone install identity keyed by the client-generated device-id string
 * (see app/src/context/DeviceIdentityContext.tsx). Deliberately not linked to
 * the legacy `users` table, which is disconnected since auth was removed.
 */
export const devices = pgTable("devices", {
  id: text("id").primaryKey(),
  firstSeenAt: timestamp("first_seen_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  lastSeenAt: timestamp("last_seen_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  deviceId: text("device_id")
    .notNull()
    .unique()
    .references(() => devices.id, { onDelete: "cascade" }),
  revenueCatAppUserId: text("revenue_cat_app_user_id").notNull(),
  productId: text("product_id"),
  status: subscriptionStatusEnum("status").notNull().default("none"),
  expiresAt: timestamp("expires_at", { withTimezone: true }),
  environment: environmentEnum("rc_environment"),
  lastEventType: text("last_event_type"),
  lastEventAt: timestamp("last_event_at", { withTimezone: true }),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
