import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { PropsWithChildren } from "react";
import { useDeviceIdentity } from "./DeviceIdentityContext";
import {
  localPreferencesRepository,
  type Preferences,
  type SubscriptionPlan,
} from "../data/preferencesRepository";

interface PreferencesContextValue extends Preferences {
  isHydrated: boolean;
  setNotificationsEnabled: (value: boolean) => void;
  subscribe: (plan: SubscriptionPlan) => void;
  unsubscribe: () => void;
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

export function PreferencesProvider({ children }: PropsWithChildren) {
  const { userId } = useDeviceIdentity();
  const [isHydrated, setIsHydrated] = useState(false);
  const [isPremium, setIsPremiumState] = useState(false);
  const [notificationsEnabled, setNotificationsEnabledState] = useState(true);
  const [subscriptionPlan, setSubscriptionPlanState] = useState<SubscriptionPlan | null>(null);
  const [subscribedAt, setSubscribedAtState] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setIsHydrated(false);
      setIsPremiumState(false);
      setNotificationsEnabledState(true);
      setSubscriptionPlanState(null);
      setSubscribedAtState(null);
      return;
    }
    let cancelled = false;
    setIsHydrated(false);
    localPreferencesRepository.load(userId).then((preferences) => {
      if (cancelled) return;
      setIsPremiumState(preferences.isPremium);
      setNotificationsEnabledState(preferences.notificationsEnabled);
      setSubscriptionPlanState(preferences.subscriptionPlan);
      setSubscribedAtState(preferences.subscribedAt);
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
      localPreferencesRepository.save(userId, {
        isPremium,
        notificationsEnabled: value,
        subscriptionPlan,
        subscribedAt,
      });
    },
    [userId, isPremium, subscriptionPlan, subscribedAt]
  );

  const subscribe = useCallback(
    (plan: SubscriptionPlan) => {
      if (!userId) return;
      const now = new Date().toISOString();
      setIsPremiumState(true);
      setSubscriptionPlanState(plan);
      setSubscribedAtState(now);
      localPreferencesRepository.save(userId, {
        isPremium: true,
        notificationsEnabled,
        subscriptionPlan: plan,
        subscribedAt: now,
      });
    },
    [userId, notificationsEnabled]
  );

  const unsubscribe = useCallback(() => {
    if (!userId) return;
    setIsPremiumState(false);
    setSubscriptionPlanState(null);
    setSubscribedAtState(null);
    localPreferencesRepository.save(userId, {
      isPremium: false,
      notificationsEnabled,
      subscriptionPlan: null,
      subscribedAt: null,
    });
  }, [userId, notificationsEnabled]);

  const value = useMemo(
    () => ({
      isHydrated,
      isPremium,
      notificationsEnabled,
      subscriptionPlan,
      subscribedAt,
      setNotificationsEnabled,
      subscribe,
      unsubscribe,
    }),
    [
      isHydrated,
      isPremium,
      notificationsEnabled,
      subscriptionPlan,
      subscribedAt,
      setNotificationsEnabled,
      subscribe,
      unsubscribe,
    ]
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences(): PreferencesContextValue {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error("usePreferences must be used within a PreferencesProvider");
  return ctx;
}
