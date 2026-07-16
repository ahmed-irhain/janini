import type { User } from "@janini/shared";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export class AuthApiError extends Error {
  code: string;
  status: number;

  constructor(code: string, status: number) {
    super(code);
    this.code = code;
    this.status = status;
  }
}

export class NetworkUnavailableError extends Error {}

interface AuthResponse {
  token: string;
  user: User;
}

function requireApiUrl(): string {
  if (!API_URL) throw new Error("Missing EXPO_PUBLIC_API_URL");
  return API_URL;
}

async function parseOrThrow<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new AuthApiError(typeof data.error === "string" ? data.error : "unknown_error", response.status);
  }
  return data as T;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${requireApiUrl()}${path}`, init);
  } catch {
    // fetch() rejects with a plain TypeError ("Network request failed") when
    // there's no connectivity or the host is unreachable — distinguish that
    // from an HTTP-level failure (AuthApiError) so the UI can show a
    // "check your connection" message instead of a generic one.
    throw new NetworkUnavailableError();
  }
  return parseOrThrow<T>(response);
}

export async function signUp(email: string, password: string): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
}

export async function signIn(email: string, password: string): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
}

export async function fetchMe(token: string): Promise<User> {
  const { user } = await request<{ user: User }>("/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return user;
}
