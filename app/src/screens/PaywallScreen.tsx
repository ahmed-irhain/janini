import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import Ionicons from "@expo/vector-icons/Ionicons";
import { usePreferences } from "../context/PreferencesContext";
import type { SubscriptionPlan } from "../data/preferencesRepository";
import { Screen } from "../components/Screen";
import { HeroPanel } from "../components/HeroPanel";
import { IconButton } from "../components/IconButton";
import { PlanCard } from "../components/PlanCard";
import { Button } from "../components/Button";
import { COLORS, withAlpha } from "../theme/colors";
import { SPACING } from "../theme/spacing";
import { TYPE, LATIN_FONTS } from "../theme/typography";

const PURCHASE_DELAY_MS = 900;

export function PaywallScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { subscribe } = usePreferences();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>("pass");
  const [isPurchasing, setIsPurchasing] = useState(false);

  const price = selectedPlan === "pass" ? t("subscription.passPriceValue") : t("subscription.monthlyPriceValue");

  const handlePurchase = async () => {
    setIsPurchasing(true);
    await new Promise((resolve) => setTimeout(resolve, PURCHASE_DELAY_MS));
    subscribe(selectedPlan);
    setIsPurchasing(false);
    Alert.alert(
      t("subscription.confirmedTitle"),
      t(
        selectedPlan === "pass"
          ? "subscription.confirmedMessagePass"
          : "subscription.confirmedMessageMonthly"
      ),
      [{ text: t("subscription.confirmedButton"), onPress: () => router.back() }]
    );
  };

  return (
    <Screen style={styles.content}>
      <View style={styles.closeRow}>
        <IconButton
          icon="close"
          onPress={() => router.back()}
          accessibilityLabel={t("subscription.closeLabel")}
          size={36}
        />
      </View>

      <HeroPanel>
        <Text style={styles.heroHeadline}>{t("subscription.heroHeadline")}</Text>
        <Text style={styles.heroSubheading}>{t("subscription.heroSubheading")}</Text>
      </HeroPanel>

      <View style={styles.plans}>
        <PlanCard
          title={t("subscription.passTitle")}
          description={t("subscription.passDescription")}
          priceValue={t("subscription.passPriceValue")}
          priceSuffix={t("subscription.passPriceSuffix")}
          badgeLabel={t("subscription.passBadge")}
          selected={selectedPlan === "pass"}
          onPress={() => setSelectedPlan("pass")}
        />
        <PlanCard
          title={t("subscription.monthlyTitle")}
          description={t("subscription.monthlyDescription")}
          priceValue={t("subscription.monthlyPriceValue")}
          priceSuffix={t("subscription.monthlyPriceSuffix")}
          selected={selectedPlan === "monthly"}
          onPress={() => setSelectedPlan("monthly")}
        />
      </View>

      <View style={styles.trustRow}>
        <Ionicons name="shield-checkmark" size={16} color={COLORS.inkMuted} />
        <Text style={styles.trustText}>{t("subscription.trustLine")}</Text>
      </View>

      <Button
        label={t("subscription.ctaLabel", { price })}
        onPress={handlePurchase}
        loading={isPurchasing}
      />

      <Pressable
        onPress={() => router.back()}
        accessibilityRole="button"
        style={styles.maybeLater}
        hitSlop={8}
      >
        <Text style={styles.maybeLaterText}>{t("subscription.maybeLaterLabel")}</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: SPACING.lg,
  },
  closeRow: {
    flexDirection: "row-reverse",
  },
  heroHeadline: {
    ...TYPE.display,
    color: COLORS.onPrimary,
    textAlign: "center",
  },
  heroSubheading: {
    ...TYPE.body,
    color: withAlpha(COLORS.onPrimary, 0.85),
    textAlign: "center",
  },
  plans: {
    gap: SPACING.md,
  },
  trustRow: {
    flexDirection: "row-reverse",
    alignItems: "flex-start",
    gap: SPACING.sm,
    paddingHorizontal: SPACING.xs,
  },
  trustText: {
    ...TYPE.caption,
    color: COLORS.inkMuted,
    textAlign: "right",
    flex: 1,
  },
  maybeLater: {
    alignSelf: "center",
    padding: SPACING.sm,
  },
  maybeLaterText: {
    ...TYPE.bodySmall,
    color: COLORS.inkMuted,
    textAlign: "center",
  },
});
