import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { PropsWithChildren } from "react";
import { useAuth } from "./AuthContext";
import { localPreferencesRepository, type Preferences } from "../data/preferencesRepository";

interface PreferencesContextValue extends Preferences {
  isHydrated: boolean;
  setIsPremium: (value: boolean) => void;
  setNotificationsEnabled: (value: boolean) => void;
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

export function PreferencesProvider({ children }: PropsWithChildren) {
  const { userId } = useAuth();
  const [isHydrated, setIsHydrated] = useState(false);
  const [isPremium, setIsPremiumState] = useState(false);
  const [notificationsEnabled, setNotificationsEnabledState] = useState(true);

  useEffect(() => {
    if (!userId) {
      setIsHydrated(false);
      setIsPremiumState(false);
      setNotificationsEnabledState(true);
      return;
    }
    let cancelled = false;
    setIsHydrated(false);
    localPreferencesRepository.load(userId).then((preferences) => {
      if (cancelled) return;
      setIsPremiumState(preferences.isPremium);
      setNotificationsEnabledState(preferences.notificationsEnabled);
      setIsHydrated(true);
    });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const setIsPremium = useCallback(
    (value: boolean) => {
      if (!userId) return;
      setIsPremiumState(value);
      localPreferencesRepository.save(userId, { isPremium: value, notificationsEnabled });
    },
    [userId, notificationsEnabled]
  );

  const setNotificationsEnabled = useCallback(
    (value: boolean) => {
      if (!userId) return;
      setNotificationsEnabledState(value);
      localPreferencesRepository.save(userId, { isPremium, notificationsEnabled: value });
    },
    [userId, isPremium]
  );

  const value = useMemo(
    () => ({
      isHydrated,
      isPremium,
      notificationsEnabled,
      setIsPremium,
      setNotificationsEnabled,
    }),
    [isHydrated, isPremium, notificationsEnabled, setIsPremium, setNotificationsEnabled]
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences(): PreferencesContextValue {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error("usePreferences must be used within a PreferencesProvider");
  return ctx;
}
