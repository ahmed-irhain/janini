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

export async function signUp(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${requireApiUrl()}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return parseOrThrow<AuthResponse>(response);
}

export async function signIn(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${requireApiUrl()}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return parseOrThrow<AuthResponse>(response);
}

export async function fetchMe(token: string): Promise<User> {
  const response = await fetch(`${requireApiUrl()}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const { user } = await parseOrThrow<{ user: User }>(response);
  return user;
}
