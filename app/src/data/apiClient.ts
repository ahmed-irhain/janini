const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

/**
 * Fetches JSON from the Express API. Base URL comes from EXPO_PUBLIC_API_URL
 * (validated non-empty at app startup in app/src/app/_layout.tsx).
 */
export async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error ?? `Request to ${path} failed with status ${response.status}`);
  }
  return response.json() as Promise<T>;
}
