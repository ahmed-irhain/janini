import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { PropsWithChildren } from "react";
import * as SecureStore from "expo-secure-store";

const DEVICE_ID_KEY = "janini_device_id";

interface DeviceIdentityContextValue {
  isLoaded: boolean;
  userId: string | null;
}

const DeviceIdentityContext = createContext<DeviceIdentityContextValue | null>(null);

function generateDeviceId(): string {
  const randomPart = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
  return `${Date.now().toString(36)}-${randomPart}`;
}

/**
 * There is no sign-in/sign-up — every install is identified invisibly by a
 * random id generated once and persisted in SecureStore.
 */
export function DeviceIdentityProvider({ children }: PropsWithChildren) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [deviceId, setDeviceId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      let id = await SecureStore.getItemAsync(DEVICE_ID_KEY);
      if (!id) {
        id = generateDeviceId();
        await SecureStore.setItemAsync(DEVICE_ID_KEY, id);
      }
      if (!cancelled) {
        setDeviceId(id);
        setIsLoaded(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => ({ isLoaded, userId: deviceId }), [isLoaded, deviceId]);

  return <DeviceIdentityContext.Provider value={value}>{children}</DeviceIdentityContext.Provider>;
}

export function useDeviceIdentity(): DeviceIdentityContextValue {
  const ctx = useContext(DeviceIdentityContext);
  if (!ctx) throw new Error("useDeviceIdentity must be used within a DeviceIdentityProvider");
  return ctx;
}
