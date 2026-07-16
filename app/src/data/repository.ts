import type { Appointment, Pregnancy, SymptomLog } from "@janini/shared";

export interface PregnancyData {
  pregnancy: Pregnancy | null;
  symptomLogs: SymptomLog[];
  appointments: Appointment[];
}

export type NewPregnancyInput = {
  lastMenstrualPeriod: string;
  dueDateGregorian: string;
};

export type NewSymptomLogInput = Omit<SymptomLog, "id" | "pregnancyId" | "loggedAt">;

export type NewAppointmentInput = Omit<Appointment, "id" | "pregnancyId">;

/**
 * Swappable data-access seam: screens only ever call `usePregnancyData()`,
 * which only ever calls a `PregnancyRepository`. A later real-API pass can
 * add an `ApiPregnancyRepository` here without touching any screen.
 */
export interface PregnancyRepository {
  load(userId: string): Promise<PregnancyData>;
  savePregnancy(userId: string, input: NewPregnancyInput): Promise<Pregnancy>;
  addSymptomLog(userId: string, input: NewSymptomLogInput): Promise<SymptomLog>;
  updateSymptomLog(userId: string, id: string, input: NewSymptomLogInput): Promise<SymptomLog>;
  deleteSymptomLog(userId: string, id: string): Promise<void>;
  addAppointment(userId: string, input: NewAppointmentInput): Promise<Appointment>;
  updateAppointment(userId: string, id: string, input: NewAppointmentInput): Promise<Appointment>;
  deleteAppointment(userId: string, id: string): Promise<void>;
  resetLocalData(userId: string): Promise<void>;
}
