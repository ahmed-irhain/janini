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

/** Estimated due date (Gregorian) from the last menstrual period. */
export function estimateDueDate(lastMenstrualPeriod: Date): Date {
  const due = new Date(lastMenstrualPeriod);
  due.setDate(due.getDate() + AVERAGE_GESTATION_DAYS);
  return due;
}

/** Current gestational week/day (0-indexed day) from the last menstrual period. */
export function gestationalAge(
  lastMenstrualPeriod: Date,
  asOf: Date = new Date()
): { weeks: number; days: number } {
  const diffMs = asOf.getTime() - lastMenstrualPeriod.getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return { weeks: Math.floor(totalDays / 7), days: totalDays % 7 };
}
