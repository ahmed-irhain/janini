import AsyncStorage from "@react-native-async-storage/async-storage";

export type SubscriptionPlan = "pass" | "monthly";

export interface Preferences {
  isPremium: boolean;
  notificationsEnabled: boolean;
  subscriptionPlan: SubscriptionPlan | null;
  subscribedAt: string | null;
}

const DEFAULT_PREFERENCES: Preferences = {
  isPremium: false,
  notificationsEnabled: true,
  subscriptionPlan: null,
  subscribedAt: null,
};

function storageKey(userId: string): string {
  return `janini:v1:${userId}:preferences`;
}

/**
 * AsyncStorage-backed local-only preferences. Mirrors localRepository.ts's
 * shape — no server field backs these yet (mock subscription state, no push
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
