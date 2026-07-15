import { toHijri, toGregorian } from "hijri-converter";

export interface HijriDate {
  year: number;
  month: number;
  day: number;
}

const HIJRI_MONTHS_AR = [
  "محرم",
  "صفر",
  "ربيع الأول",
  "ربيع الآخر",
  "جمادى الأولى",
  "جمادى الآخرة",
  "رجب",
  "شعبان",
  "رمضان",
  "شوال",
  "ذو القعدة",
  "ذو الحجة",
];

/** Formats a Hijri date in Arabic, e.g. "12 رمضان 1447 هـ". */
export function formatHijriDateAr(hijri: HijriDate): string {
  return `${hijri.day} ${HIJRI_MONTHS_AR[hijri.month - 1]} ${hijri.year} هـ`;
}

/** Umm al-Qura Hijri date for a given Gregorian Date. */
export function gregorianToHijri(date: Date): HijriDate {
  const { hy, hm, hd } = toHijri(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );
  return { year: hy, month: hm, day: hd };
}

/** Gregorian Date for a given Umm al-Qura Hijri date. */
export function hijriToGregorian(hijri: HijriDate): Date {
  const { gy, gm, gd } = toGregorian(hijri.year, hijri.month, hijri.day);
  return new Date(gy, gm - 1, gd);
}

const AVERAGE_GESTATION_DAYS = 280; // 40 weeks from last menstrual period

/**
 * Strips the time-of-day down to local midnight. Callers may pass Dates
 * carrying an arbitrary time component (e.g. a native date picker that
 * preserves the time from whenever the screen mounted), and day-based
 * arithmetic must depend only on the calendar date, not wall-clock time.
 */
function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/** Estimated due date (Gregorian) from the last menstrual period. */
export function estimateDueDate(lastMenstrualPeriod: Date): Date {
  const due = startOfDay(lastMenstrualPeriod);
  due.setDate(due.getDate() + AVERAGE_GESTATION_DAYS);
  return due;
}

/** Estimated last menstrual period (Gregorian) from a due date. */
export function estimateLmpFromDueDate(dueDate: Date): Date {
  const lmp = startOfDay(dueDate);
  lmp.setDate(lmp.getDate() - AVERAGE_GESTATION_DAYS);
  return lmp;
}

/** Current gestational week/day (0-indexed day) from the last menstrual period. */
export function gestationalAge(
  lastMenstrualPeriod: Date,
  asOf: Date = new Date()
): { weeks: number; days: number } {
  const diffMs = startOfDay(asOf).getTime() - startOfDay(lastMenstrualPeriod).getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return { weeks: Math.floor(totalDays / 7), days: totalDays % 7 };
}

/** Converts a gestational week (1-42+) into a 1-10 pregnancy month for display. */
export function gestationalMonth(weeks: number): number {
  return Math.min(10, Math.max(1, Math.ceil(weeks / 4.33)));
}

/**
 * Percent of pregnancy elapsed and days remaining, computed from the due date
 * so it stays accurate regardless of which entry mode (LMP or due date) was
 * used to derive it. Clamped so an overdue pregnancy doesn't overflow a
 * progress bar or go negative.
 */
export function pregnancyProgress(
  dueDateGregorian: Date,
  asOf: Date = new Date()
): { percent: number; daysRemaining: number } {
  const daysRemainingRaw = Math.ceil(
    (startOfDay(dueDateGregorian).getTime() - startOfDay(asOf).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  const daysElapsed = AVERAGE_GESTATION_DAYS - daysRemainingRaw;
  const percent = Math.min(100, Math.max(0, (daysElapsed / AVERAGE_GESTATION_DAYS) * 100));
  const daysRemaining = Math.max(0, daysRemainingRaw);
  return { percent, daysRemaining };
}
