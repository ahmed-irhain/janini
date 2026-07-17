import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { PropsWithChildren } from "react";
import Purchases, {
  type CustomerInfo,
  type CustomerInfoUpdateListener,
  type PurchasesError,
} from "react-native-purchases";
import { useDeviceIdentity } from "./DeviceIdentityContext";
import { getSubscriptionStatus } from "../data/apiClient";

// Must match the entitlement identifier configured in the RevenueCat dashboard.
export const ENTITLEMENT_ID = "premium";

interface EntitlementContextValue {
  isLoaded: boolean;
  isEntitled: boolean;
  purchase: () => Promise<void>;
  restore: () => Promise<void>;
}

const EntitlementContext = createContext<EntitlementContextValue | null>(null);

export function EntitlementProvider({ children }: PropsWithChildren) {
  const { isLoaded: deviceIdLoaded, userId } = useDeviceIdentity();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEntitled, setIsEntitled] = useState(false);

  const applyCustomerInfo = useCallback((customerInfo: CustomerInfo) => {
    setIsEntitled(Boolean(customerInfo.entitlements.active[ENTITLEMENT_ID]?.isActive));
  }, []);

  useEffect(() => {
    if (!deviceIdLoaded || !userId) return;
    let cancelled = false;

    const listener: CustomerInfoUpdateListener = (customerInfo) => applyCustomerInfo(customerInfo);
    Purchases.addCustomerInfoUpdateListener(listener);

    (async () => {
      const apiKey = process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY;
      if (!apiKey) {
        throw new Error(
          "Missing EXPO_PUBLIC_REVENUECAT_IOS_KEY — copy app/.env.example to app/.env and set " +
            "it to your RevenueCat iOS public SDK key."
        );
      }
      // Configure exactly once per app launch, keyed by the same device id
      // used everywhere else in the app (see DeviceIdentityContext).
      Purchases.configure({ apiKey, appUserID: userId });

      // RevenueCat's local customerInfo is the gating source of truth — it's
      // instant and offline-tolerant (a user who subscribed yesterday still
      // gets in from airplane mode). The server call below is additional
      // server-side awareness only; it does not gate navigation.
      const customerInfo = await Purchases.getCustomerInfo();
      if (cancelled) return;
      applyCustomerInfo(customerInfo);
      setIsLoaded(true);

      getSubscriptionStatus(userId).catch(() => {
        // Best-effort — server awareness, not required for the app to function.
      });
    })();

    return () => {
      cancelled = true;
      Purchases.removeCustomerInfoUpdateListener(listener);
    };
  }, [deviceIdLoaded, userId, applyCustomerInfo]);

  const purchase = useCallback(async () => {
    const offerings = await Purchases.getOfferings();
    const pkg = offerings.current?.availablePackages[0];
    if (!pkg) {
      throw new Error("No subscription package configured in RevenueCat's current offering.");
    }
    try {
      const { customerInfo } = await Purchases.purchasePackage(pkg);
      applyCustomerInfo(customerInfo);
    } catch (error) {
      if ((error as PurchasesError).userCancelled) return;
      throw error;
    }
  }, [applyCustomerInfo]);

  const restore = useCallback(async () => {
    const customerInfo = await Purchases.restorePurchases();
    applyCustomerInfo(customerInfo);
  }, [applyCustomerInfo]);

  const value = useMemo(
    () => ({ isLoaded, isEntitled, purchase, restore }),
    [isLoaded, isEntitled, purchase, restore]
  );

  return <EntitlementContext.Provider value={value}>{children}</EntitlementContext.Provider>;
}

export function useEntitlement(): EntitlementContextValue {
  const ctx = useContext(EntitlementContext);
  if (!ctx) throw new Error("useEntitlement must be used within an EntitlementProvider");
  return ctx;
}
