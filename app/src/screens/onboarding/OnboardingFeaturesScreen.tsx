import { useRef, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "../../components/Screen";
import { OnboardingStepIndicator } from "../../components/OnboardingStepIndicator";
import { Button } from "../../components/Button";
import { FONTS } from "../../theme/fonts";
import { COLORS } from "../../theme/colors";

const SLIDES = [
  { icon: "calendar-outline", titleKey: "onboarding.feature1Title", descKey: "onboarding.feature1Desc" },
  { icon: "clipboard-outline", titleKey: "onboarding.feature2Title", descKey: "onboarding.feature2Desc" },
  { icon: "moon-outline", titleKey: "onboarding.feature3Title", descKey: "onboarding.feature3Desc" },
] as const;

export function OnboardingFeaturesScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === SLIDES.length - 1;

  const goToSlide = (index: number) => {
    scrollRef.current?.scrollTo({ x: index * width, animated: true });
    setActiveIndex(index);
  };

  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  const onPrimaryPress = () => {
    if (isLastSlide) {
      router.push("/due-date");
    } else {
      goToSlide(activeIndex + 1);
    }
  };

  return (
    <Screen scroll={false} horizontalPadding={0} style={styles.screen}>
      <View style={styles.topRow}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel={t("common.back")}
        >
          <Ionicons name="chevron-back" size={24} color={COLORS.ink} />
        </Pressable>
        <OnboardingStepIndicator currentStep={1} totalSteps={3} />
        <Pressable onPress={() => router.push("/due-date")} hitSlop={12} accessibilityRole="button">
          <Text style={styles.skipText}>{t("onboarding.skipButton")}</Text>
        </Pressable>
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        style={styles.carousel}
      >
        {SLIDES.map((slide) => (
          <View key={slide.titleKey} style={[styles.slide, { width }]}>
            <Ionicons name={slide.icon} size={64} color={COLORS.accent} />
            <Text style={styles.slideTitle}>{t(slide.titleKey)}</Text>
            <Text style={styles.slideDesc}>{t(slide.descKey)}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottom}>
        <View style={styles.dotsRow}>
          {SLIDES.map((slide, index) => (
            <Pressable key={slide.titleKey} onPress={() => goToSlide(index)} hitSlop={8}>
              <View style={[styles.dot, index === activeIndex && styles.dotActive]} />
            </Pressable>
          ))}
        </View>
        <Button
          label={isLastSlide ? t("onboarding.continueButton") : t("onboarding.nextButton")}
          onPress={onPrimaryPress}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 20,
  },
  skipText: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.mutedText,
  },
  carousel: {
    flex: 1,
  },
  slide: {
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    paddingHorizontal: 32,
  },
  slideTitle: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    lineHeight: 28,
    textAlign: "center",
  },
  slideDesc: {
    fontSize: 15,
    fontFamily: FONTS.regular,
    lineHeight: 22,
    textAlign: "center",
    color: COLORS.mutedText,
  },
  bottom: {
    gap: 16,
    paddingHorizontal: 20,
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.border,
  },
  dotActive: {
    width: 20,
    backgroundColor: COLORS.accent,
  },
});
