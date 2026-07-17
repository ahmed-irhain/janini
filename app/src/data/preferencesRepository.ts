import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Preferences {
  notificationsEnabled: boolean;
}

const DEFAULT_PREFERENCES: Preferences = {
  notificationsEnabled: true,
};

function storageKey(userId: string): string {
  return `janini:v1:${userId}:preferences`;
}

/**
 * AsyncStorage-backed local-only preferences. Mirrors localRepository.ts's
 * shape — no server field backs these yet (no push infra for notifications),
 * so there is nothing to sync. Subscription entitlement lives in
 * EntitlementContext/RevenueCat instead, not here.
 */
export const localPreferencesRepository = {
  async load(userId: string): Promise<Preferences> {
    const raw = await AsyncStorage.getItem(storageKey(userId));
    return raw ? { ...DEFAULT_PREFERENCES, ...(JSON.parse(raw) as Preferences) } : DEFAULT_PREFERENCES;
  },

  async save(userId: string, preferences: Preferences): Promise<void> {
    await AsyncStorage.setItem(storageKey(userId), JSON.stringify(preferences));
  },
};
