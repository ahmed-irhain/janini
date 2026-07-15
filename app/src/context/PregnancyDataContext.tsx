import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { PropsWithChildren } from "react";
import { useAuth } from "./AuthContext";
import type { Appointment, Pregnancy, SymptomLog } from "@janini/shared";
import { localPregnancyRepository } from "../data/localRepository";
import type {
  NewAppointmentInput,
  NewPregnancyInput,
  NewSymptomLogInput,
} from "../data/repository";

interface PregnancyDataContextValue {
  isHydrated: boolean;
  pregnancy: Pregnancy | null;
  symptomLogs: SymptomLog[];
  appointments: Appointment[];
  savePregnancy: (input: NewPregnancyInput) => Promise<void>;
  addSymptomLog: (input: NewSymptomLogInput) => Promise<void>;
  addAppointment: (input: NewAppointmentInput) => Promise<void>;
  resetLocalData: () => Promise<void>;
}

const PregnancyDataContext = createContext<PregnancyDataContextValue | null>(null);

export function PregnancyDataProvider({ children }: PropsWithChildren) {
  const { userId } = useAuth();
  const [isHydrated, setIsHydrated] = useState(false);
  const [pregnancy, setPregnancy] = useState<Pregnancy | null>(null);
  const [symptomLogs, setSymptomLogs] = useState<SymptomLog[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    if (!userId) {
      setIsHydrated(false);
      setPregnancy(null);
      setSymptomLogs([]);
      setAppointments([]);
      return;
    }
    let cancelled = false;
    setIsHydrated(false);
    localPregnancyRepository.load(userId).then((data) => {
      if (cancelled) return;
      setPregnancy(data.pregnancy);
      setSymptomLogs(data.symptomLogs);
      setAppointments(data.appointments);
      setIsHydrated(true);
    });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const savePregnancy = useCallback(
    async (input: NewPregnancyInput) => {
      if (!userId) throw new Error("Cannot save a pregnancy while signed out");
      const saved = await localPregnancyRepository.savePregnancy(userId, input);
      setPregnancy(saved);
    },
    [userId]
  );

  const addSymptomLog = useCallback(
    async (input: NewSymptomLogInput) => {
      if (!userId) throw new Error("Cannot log a symptom while signed out");
      const log = await localPregnancyRepository.addSymptomLog(userId, input);
      setSymptomLogs((prev) => [log, ...prev]);
    },
    [userId]
  );

  const addAppointment = useCallback(
    async (input: NewAppointmentInput) => {
      if (!userId) throw new Error("Cannot add an appointment while signed out");
      const appointment = await localPregnancyRepository.addAppointment(userId, input);
      setAppointments((prev) => [...prev, appointment]);
    },
    [userId]
  );

  const resetLocalData = useCallback(async () => {
    if (!userId) throw new Error("Cannot reset local data while signed out");
    await localPregnancyRepository.resetLocalData(userId);
    setPregnancy(null);
    setSymptomLogs([]);
    setAppointments([]);
  }, [userId]);

  const value = useMemo(
    () => ({
      isHydrated,
      pregnancy,
      symptomLogs,
      appointments,
      savePregnancy,
      addSymptomLog,
      addAppointment,
      resetLocalData,
    }),
    [
      isHydrated,
      pregnancy,
      symptomLogs,
      appointments,
      savePregnancy,
      addSymptomLog,
      addAppointment,
      resetLocalData,
    ]
  );

  return <PregnancyDataContext.Provider value={value}>{children}</PregnancyDataContext.Provider>;
}

export function usePregnancyData(): PregnancyDataContextValue {
  const ctx = useContext(PregnancyDataContext);
  if (!ctx) throw new Error("usePregnancyData must be used within a PregnancyDataProvider");
  return ctx;
}
