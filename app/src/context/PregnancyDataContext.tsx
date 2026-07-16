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
  loadError: string | null;
  retryLoad: () => void;
  pregnancy: Pregnancy | null;
  symptomLogs: SymptomLog[];
  appointments: Appointment[];
  savePregnancy: (input: NewPregnancyInput) => Promise<void>;
  addSymptomLog: (input: NewSymptomLogInput) => Promise<void>;
  updateSymptomLog: (id: string, input: NewSymptomLogInput) => Promise<void>;
  deleteSymptomLog: (id: string) => Promise<void>;
  addAppointment: (input: NewAppointmentInput) => Promise<void>;
  updateAppointment: (id: string, input: NewAppointmentInput) => Promise<void>;
  deleteAppointment: (id: string) => Promise<void>;
  resetLocalData: () => Promise<void>;
}

const PregnancyDataContext = createContext<PregnancyDataContextValue | null>(null);

export function PregnancyDataProvider({ children }: PropsWithChildren) {
  const { userId } = useAuth();
  const [isHydrated, setIsHydrated] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);
  const [pregnancy, setPregnancy] = useState<Pregnancy | null>(null);
  const [symptomLogs, setSymptomLogs] = useState<SymptomLog[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const retryLoad = useCallback(() => setReloadToken((n) => n + 1), []);

  useEffect(() => {
    if (!userId) {
      setIsHydrated(false);
      setLoadError(null);
      setPregnancy(null);
      setSymptomLogs([]);
      setAppointments([]);
      return;
    }
    let cancelled = false;
    setIsHydrated(false);
    setLoadError(null);
    localPregnancyRepository
      .load(userId)
      .then((data) => {
        if (cancelled) return;
        setPregnancy(data.pregnancy);
        setSymptomLogs(data.symptomLogs);
        setAppointments(data.appointments);
        setIsHydrated(true);
      })
      .catch((error) => {
        if (cancelled) return;
        console.error("Failed to load pregnancy data", error);
        setLoadError("loadFailed");
      });
    return () => {
      cancelled = true;
    };
  }, [userId, reloadToken]);

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

  const updateSymptomLog = useCallback(
    async (id: string, input: NewSymptomLogInput) => {
      if (!userId) throw new Error("Cannot update a symptom log while signed out");
      const log = await localPregnancyRepository.updateSymptomLog(userId, id, input);
      setSymptomLogs((prev) => prev.map((item) => (item.id === id ? log : item)));
    },
    [userId]
  );

  const deleteSymptomLog = useCallback(
    async (id: string) => {
      if (!userId) throw new Error("Cannot delete a symptom log while signed out");
      await localPregnancyRepository.deleteSymptomLog(userId, id);
      setSymptomLogs((prev) => prev.filter((item) => item.id !== id));
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

  const updateAppointment = useCallback(
    async (id: string, input: NewAppointmentInput) => {
      if (!userId) throw new Error("Cannot update an appointment while signed out");
      const appointment = await localPregnancyRepository.updateAppointment(userId, id, input);
      setAppointments((prev) => prev.map((item) => (item.id === id ? appointment : item)));
    },
    [userId]
  );

  const deleteAppointment = useCallback(
    async (id: string) => {
      if (!userId) throw new Error("Cannot delete an appointment while signed out");
      await localPregnancyRepository.deleteAppointment(userId, id);
      setAppointments((prev) => prev.filter((item) => item.id !== id));
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
      loadError,
      retryLoad,
      pregnancy,
      symptomLogs,
      appointments,
      savePregnancy,
      addSymptomLog,
      updateSymptomLog,
      deleteSymptomLog,
      addAppointment,
      updateAppointment,
      deleteAppointment,
      resetLocalData,
    }),
    [
      isHydrated,
      loadError,
      retryLoad,
      pregnancy,
      symptomLogs,
      appointments,
      savePregnancy,
      addSymptomLog,
      updateSymptomLog,
      deleteSymptomLog,
      addAppointment,
      updateAppointment,
      deleteAppointment,
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
