import { useEffect, useState } from "react";
import { Alert, Linking, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import Purchases, { type PurchasesOffering } from "react-native-purchases";
import { useEntitlement, type SubscriptionPlan } from "../context/EntitlementContext";
import { Screen } from "../components/Screen";
import { HeroPanel } from "../components/HeroPanel";
import { PlanCard } from "../components/PlanCard";
import { Button } from "../components/Button";
import { COLORS, withAlpha } from "../theme/colors";
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
  const [offering, setOffering] = useState<PurchasesOffering | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>("pass");
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Purchases.getOfferings()
      .then((offerings) => {
        if (!cancelled) setOffering(offerings.current);
      })
      .catch(() => {
        // Offerings failed to load (no network, misconfigured dashboard, etc.) —
        // the subscribe button stays disabled below rather than erroring here.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const passPkg = offering?.lifetime ?? null;
  const monthlyPkg = offering?.monthly ?? null;
  const selectedPkg = selectedPlan === "pass" ? passPkg : monthlyPkg;

  const onSubscribe = async () => {
    setIsPurchasing(true);
    try {
      await purchase(selectedPlan);
    } catch {
      Alert.alert(t("subscription.purchaseErrorTitle"), t("subscription.purchaseErrorMessage"));
    } finally {
      setIsPurchasing(false);
    }
  };

  const onRestore = async () => {
    setIsRestoring(true);
    try {
      await restore();
    } catch {
      Alert.alert(t("subscription.restoreErrorTitle"), t("subscription.restoreErrorMessage"));
    } finally {
      setIsRestoring(false);
    }
  };

  return (
    <Screen style={styles.content}>
      <HeroPanel>
        <Text style={styles.heroHeadline}>{t("subscription.heroHeadline")}</Text>
        <Text style={styles.heroSubheading}>{t("subscription.heroSubheading")}</Text>
      </HeroPanel>

      <View style={styles.plans}>
        <PlanCard
          title={t("subscription.passTitle")}
          description={t("subscription.passDescription")}
          priceValue={passPkg?.product.priceString ?? "…"}
          priceSuffix={t("subscription.passPriceSuffix")}
          badgeLabel={t("subscription.passBadge")}
          selected={selectedPlan === "pass"}
          onPress={() => setSelectedPlan("pass")}
        />
        <PlanCard
          title={t("subscription.monthlyTitle")}
          description={t("subscription.monthlyDescription")}
          priceValue={monthlyPkg?.product.priceString ?? "…"}
          priceSuffix={t("subscription.monthlyPriceSuffix")}
          selected={selectedPlan === "monthly"}
          onPress={() => setSelectedPlan("monthly")}
        />
      </View>

      <Text style={styles.trustText}>
        {t(selectedPlan === "pass" ? "subscription.trustLinePass" : "subscription.trustLineMonthly")}
      </Text>

      <Button
        label={t("subscription.ctaLabel")}
        onPress={onSubscribe}
        loading={isPurchasing}
        disabled={!selectedPkg}
      />
      <Button
        label={t("subscription.restoreButton")}
        variant="outline"
        onPress={onRestore}
        loading={isRestoring}
      />

      <Text style={styles.legalLinks}>
        <Text onPress={() => Linking.openURL(TERMS_URL)}>{t("subscription.termsLink")}</Text>
        {"   "}
        <Text onPress={() => Linking.openURL(PRIVACY_URL)}>{t("subscription.privacyLink")}</Text>
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: SPACING.lg,
  },
  heroHeadline: {
    ...TYPE.display,
    color: COLORS.onPrimary,
    textAlign: "center",
    paddingVertical: SPACING.sm,
  },
  heroSubheading: {
    ...TYPE.body,
    color: withAlpha(COLORS.onPrimary, 0.85),
    textAlign: "center",
    paddingVertical: SPACING.xs,
  },
  plans: {
    gap: SPACING.md,
  },
  trustText: {
    ...TYPE.caption,
    color: COLORS.inkMuted,
    textAlign: "right",
    paddingHorizontal: SPACING.xs,
  },
  legalLinks: {
    ...TYPE.bodySmall,
    color: COLORS.primary,
    textAlign: "center",
    marginTop: SPACING.md,
  },
});
