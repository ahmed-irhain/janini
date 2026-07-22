import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { PropsWithChildren } from "react";
import { useDeviceIdentity } from "./DeviceIdentityContext";
import { localPreferencesRepository, type Preferences } from "../data/preferencesRepository";

interface PreferencesContextValue extends Preferences {
  isHydrated: boolean;
  setNotificationsEnabled: (value: boolean) => void;
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

export function PreferencesProvider({ children }: PropsWithChildren) {
  const { userId } = useDeviceIdentity();
  const [isHydrated, setIsHydrated] = useState(false);
  const [notificationsEnabled, setNotificationsEnabledState] = useState(true);

  useEffect(() => {
    if (!userId) {
      setIsHydrated(false);
      setNotificationsEnabledState(true);
      return;
    }
    let cancelled = false;
    setIsHydrated(false);
    localPreferencesRepository.load(userId).then((preferences) => {
      if (cancelled) return;
      setNotificationsEnabledState(preferences.notificationsEnabled);
      setIsHydrated(true);
    });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const setNotificationsEnabled = useCallback(
    (value: boolean) => {
      if (!userId) return;
      setNotificationsEnabledState(value);
      localPreferencesRepository.save(userId, { notificationsEnabled: value });
    },
    [userId]
  );

  const value = useMemo(
    () => ({ isHydrated, notificationsEnabled, setNotificationsEnabled }),
    [isHydrated, notificationsEnabled, setNotificationsEnabled]
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences(): PreferencesContextValue {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error("usePreferences must be used within a PreferencesProvider");
  return ctx;
}
