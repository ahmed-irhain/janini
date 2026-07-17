import { useEffect, useState } from "react";
import { Alert, Linking, StyleSheet, Text } from "react-native";
import { useTranslation } from "react-i18next";
import Purchases, { type PurchasesPackage } from "react-native-purchases";
import { useEntitlement } from "../context/EntitlementContext";
import { Screen } from "../components/Screen";
import { ScreenTitle } from "../components/ScreenTitle";
import { LogoMark } from "../components/LogoMark";
import { Button } from "../components/Button";
import { COLORS } from "../theme/colors";
import { SPACING } from "../theme/spacing";
import { TYPE } from "../theme/typography";

// Placeholders — replace once real Terms/Privacy pages exist. Apple requires
// these be linked adjacent to the subscribe button for auto-renewing
// subscriptions; this is a legal-copy dependency, not an engineering one.
const TERMS_URL = "https://YOUR_DOMAIN/terms";
const PRIVACY_URL = "https://YOUR_DOMAIN/privacy";

export function PaywallScreen() {
  const { t } = useTranslation();
  const { purchase, restore } = useEntitlement();
  const [pkg, setPkg] = useState<PurchasesPackage | null>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Purchases.getOfferings()
      .then((offerings) => {
        if (!cancelled) setPkg(offerings.current?.availablePackages[0] ?? null);
      })
      .catch(() => {
        // Offerings failed to load (no network, misconfigured dashboard, etc.) —
        // the subscribe button stays disabled below rather than erroring here.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const onSubscribe = async () => {
    setIsPurchasing(true);
    try {
      await purchase();
    } catch {
      Alert.alert(t("paywall.purchaseErrorTitle"), t("paywall.purchaseErrorMessage"));
    } finally {
      setIsPurchasing(false);
    }
  };

  const onRestore = async () => {
    setIsRestoring(true);
    try {
      await restore();
    } catch {
      Alert.alert(t("paywall.restoreErrorTitle"), t("paywall.restoreErrorMessage"));
    } finally {
      setIsRestoring(false);
    }
  };

  return (
    <Screen center style={styles.content}>
      <LogoMark size={64} />
      <ScreenTitle align="center">{t("paywall.title")}</ScreenTitle>
      <Text style={styles.subtitle}>{t("paywall.subtitle")}</Text>

      {pkg ? (
        <Text style={styles.price}>{t("paywall.priceLine", { price: pkg.product.priceString })}</Text>
      ) : null}

      <Text style={styles.terms}>{t("paywall.autoRenewalTerms")}</Text>

      <Button
        label={t("paywall.subscribeButton")}
        onPress={onSubscribe}
        loading={isPurchasing}
        disabled={!pkg}
        style={styles.button}
      />
      <Button
        label={t("paywall.restoreButton")}
        variant="outline"
        onPress={onRestore}
        loading={isRestoring}
        style={styles.button}
      />

      <Text style={styles.legalLinks}>
        <Text onPress={() => Linking.openURL(TERMS_URL)}>{t("paywall.termsLink")}</Text>
        {"   "}
        <Text onPress={() => Linking.openURL(PRIVACY_URL)}>{t("paywall.privacyLink")}</Text>
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    gap: SPACING.md,
  },
  subtitle: {
    ...TYPE.body,
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.mutedText,
    textAlign: "center",
    paddingVertical: SPACING.xs,
  },
  price: {
    ...TYPE.title,
    color: COLORS.ink,
    textAlign: "center",
  },
  terms: {
    ...TYPE.bodySmall,
    color: COLORS.mutedText,
    textAlign: "center",
    marginBottom: SPACING.md,
  },
  button: {
    width: "100%",
  },
  legalLinks: {
    ...TYPE.bodySmall,
    color: COLORS.primary700,
    textAlign: "center",
    marginTop: SPACING.md,
  },
});
