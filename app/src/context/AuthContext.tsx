import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { PropsWithChildren } from "react";
import * as SecureStore from "expo-secure-store";
import type { User } from "@janini/shared";
import { fetchMe, signIn as apiSignIn, signUp as apiSignUp } from "../data/authApi";

const AUTH_TOKEN_KEY = "janini_auth_token";

interface AuthContextValue {
  isLoaded: boolean;
  isSignedIn: boolean;
  userId: string | null;
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
      if (!token) {
        if (!cancelled) setIsLoaded(true);
        return;
      }
      try {
        const fetchedUser = await fetchMe(token);
        if (!cancelled) {
          setUser(fetchedUser);
          setIsLoaded(true);
        }
      } catch {
        // Expired/invalid token found in storage — fall back to signed-out
        // rather than getting stuck, and drop the stale token.
        await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
        if (!cancelled) {
          setUser(null);
          setIsLoaded(true);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    const { token, user: newUser } = await apiSignUp(email, password);
    await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
    setUser(newUser);
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { token, user: signedInUser } = await apiSignIn(email, password);
    await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
    setUser(signedInUser);
  }, []);

  const signOut = useCallback(async () => {
    await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      isLoaded,
      isSignedIn: user !== null,
      userId: user?.id ?? null,
      user,
      signUp,
      signIn,
      signOut,
    }),
    [isLoaded, user, signUp, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
