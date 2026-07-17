import type { SubscriptionState } from "@janini/shared";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function apiFetch(path: string, deviceId: string, init?: RequestInit) {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      ...init?.headers,
      "X-Device-Id": deviceId,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`API ${path} failed: ${res.status}`);
  }
  return res.json();
}

export function getSubscriptionStatus(deviceId: string): Promise<SubscriptionState> {
  return apiFetch("/subscriptions/status", deviceId);
}
