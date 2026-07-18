export interface User {
  id: string;
  email: string;
  displayName: string | null;
  locale: "ar" | "en";
  createdAt: string;
}

export interface Pregnancy {
  id: string;
  userId: string;
  lastMenstrualPeriod: string; // ISO date
  dueDateGregorian: string; // ISO date
  active: boolean;
  createdAt: string;
}

export interface WeeklyContent {
  id: string;
  weekNumber: number; // 1-42
  titleAr: string;
  babyChangesAr: string;
  momChangesAr: string | null;
  babySizeComparisonAr: string | null;
  babyWeightApproxGrams: number | null;
  sourceCitations: string[];
  updatedAt: string;
}

export interface Recommendation {
  id: string;
  weekNumber: number;
  textAr: string;
  sourceUrl: string | null;
  sortOrder: number;
  createdAt: string;
}

export interface Topic {
  id: string;
  slug: string;
  labelAr: string;
  sortOrder: number;
  createdAt: string;
}

export interface Article {
  id: string;
  weekNumber: number | null;
  topic: Topic | null;
  titleAr: string;
  summaryAr: string;
  bodyAr: string | null;
  sourceName: string | null;
  sourceUrl: string | null;
  publishedAt: string | null;
  createdAt: string;
}

export type SymptomSeverity = "mild" | "moderate" | "severe";

export interface SymptomLog {
  id: string;
  pregnancyId: string;
  symptom: string;
  severity: SymptomSeverity;
  note: string | null;
  loggedAt: string;
}

export interface Appointment {
  id: string;
  pregnancyId: string;
  title: string;
  location: string | null;
  scheduledAt: string;
  notes: string | null;
}
