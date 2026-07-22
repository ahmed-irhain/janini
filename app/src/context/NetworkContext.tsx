import { createContext, useContext, useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import NetInfo from "@react-native-community/netinfo";

interface NetworkContextValue {
  isOffline: boolean;
}

const NetworkContext = createContext<NetworkContextValue | null>(null);

export function NetworkProvider({ children }: PropsWithChildren) {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOffline(state.isConnected === false || state.isInternetReachable === false);
    });
    return unsubscribe;
  }, []);

  return <NetworkContext.Provider value={{ isOffline }}>{children}</NetworkContext.Provider>;
}

export function useNetworkStatus(): NetworkContextValue {
  const ctx = useContext(NetworkContext);
  if (!ctx) throw new Error("useNetworkStatus must be used within a NetworkProvider");
  return ctx;
}
