import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Preferences {
  isPremium: boolean;
  notificationsEnabled: boolean;
}

const DEFAULT_PREFERENCES: Preferences = {
  isPremium: false,
  notificationsEnabled: true,
};

function storageKey(userId: string): string {
  return `janini:v1:${userId}:preferences`;
}

/**
 * AsyncStorage-backed local-only preferences. Mirrors localRepository.ts's
 * shape — no server field backs these yet (mock premium toggle, no push
 * infra for notifications), so there is nothing to sync.
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
