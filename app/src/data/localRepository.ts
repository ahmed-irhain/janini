import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Appointment, Pregnancy, SymptomLog } from "@janini/shared";
import { generateId } from "./id";
import type {
  NewAppointmentInput,
  NewPregnancyInput,
  NewSymptomLogInput,
  PregnancyData,
  PregnancyRepository,
} from "./repository";

const EMPTY_DATA: PregnancyData = { pregnancy: null, symptomLogs: [], appointments: [] };

function storageKey(userId: string): string {
  return `janini:v1:${userId}:pregnancyData`;
}

async function readData(userId: string): Promise<PregnancyData> {
  const raw = await AsyncStorage.getItem(storageKey(userId));
  return raw ? (JSON.parse(raw) as PregnancyData) : EMPTY_DATA;
}

async function writeData(userId: string, data: PregnancyData): Promise<void> {
  await AsyncStorage.setItem(storageKey(userId), JSON.stringify(data));
}

/**
 * AsyncStorage-backed prototype repository. Not wired to the real
 * Express/Postgres backend yet — that's an explicit follow-up pass
 * (see docs/plan.md Section 5.2 on offline-first sync).
 */
export const localPregnancyRepository: PregnancyRepository = {
  async load(userId) {
    return readData(userId);
  },

  async savePregnancy(userId, input: NewPregnancyInput) {
    const data = await readData(userId);
    const pregnancy: Pregnancy = {
      id: data.pregnancy?.id ?? generateId(),
      userId,
      lastMenstrualPeriod: input.lastMenstrualPeriod,
      dueDateGregorian: input.dueDateGregorian,
      active: true,
      createdAt: data.pregnancy?.createdAt ?? new Date().toISOString(),
    };
    await writeData(userId, { ...data, pregnancy });
    return pregnancy;
  },

  async addSymptomLog(userId, input: NewSymptomLogInput) {
    const data = await readData(userId);
    if (!data.pregnancy) throw new Error("Cannot log a symptom before a pregnancy exists");
    const log: SymptomLog = {
      id: generateId(),
      pregnancyId: data.pregnancy.id,
      loggedAt: new Date().toISOString(),
      ...input,
    };
    const symptomLogs = [log, ...data.symptomLogs];
    await writeData(userId, { ...data, symptomLogs });
    return log;
  },

  async addAppointment(userId, input: NewAppointmentInput) {
    const data = await readData(userId);
    if (!data.pregnancy) throw new Error("Cannot add an appointment before a pregnancy exists");
    const appointment: Appointment = {
      id: generateId(),
      pregnancyId: data.pregnancy.id,
      ...input,
    };
    const appointments = [...data.appointments, appointment];
    await writeData(userId, { ...data, appointments });
    return appointment;
  },

  async resetLocalData(userId) {
    await AsyncStorage.removeItem(storageKey(userId));
  },
};
