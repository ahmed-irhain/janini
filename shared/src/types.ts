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
  bodyAr: string;
  babySizeComparisonAr: string | null;
  reviewedByObGyn: boolean;
  reviewedAt: string | null;
  sourceCitations: string[];
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
