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
 * Week-by-week content lives in the DB (not hardcoded) so an OB-GYN reviewer
 * can update medical content without an app-store release. See docs/plan.md
 * Section 5.1 and Section 6 — reviewedByObGyn must be true before any row
 * is served to users.
 */
export const weeklyContent = pgTable("weekly_content", {
  id: uuid("id").primaryKey().defaultRandom(),
  weekNumber: integer("week_number").notNull().unique(),
  titleAr: text("title_ar").notNull(),
  bodyAr: text("body_ar").notNull(),
  babySizeComparisonAr: text("baby_size_comparison_ar"),
  reviewedByObGyn: boolean("reviewed_by_ob_gyn").notNull().default(false),
  reviewedAt: timestamp("reviewed_at", { withTimezone: true }),
  sourceCitations: text("source_citations").array().notNull().default([]),
  updatedAt: timestamp("updated_at", { withTimezone: true })
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
