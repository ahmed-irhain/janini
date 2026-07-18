import { useRef, useState } from "react";
import {
  Image,
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
import { Screen } from "../../components/Screen";
import { OnboardingStepIndicator } from "../../components/OnboardingStepIndicator";
import { Button } from "../../components/Button";
import { IconButton } from "../../components/IconButton";
import { FONTS } from "../../theme/fonts";
import { COLORS } from "../../theme/colors";
import { RADIUS } from "../../theme/radius";
import { SPACING } from "../../theme/spacing";

const SLIDES = [
  {
    image: require("../../../assets/illustrations/illu-fetal.png"),
    titleKey: "onboarding.feature1Title",
    descKey: "onboarding.feature1Desc",
  },
  {
    image: require("../../../assets/illustrations/illu-tracking.png"),
    titleKey: "onboarding.feature2Title",
    descKey: "onboarding.feature2Desc",
  },
  {
    image: require("../../../assets/illustrations/illu-newborn.png"),
    titleKey: "onboarding.feature3Title",
    descKey: "onboarding.feature3Desc",
  },
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
        <IconButton icon="chevron-back" onPress={() => router.back()} accessibilityLabel={t("common.back")} />
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
            <Image source={slide.image} style={styles.slideImage} resizeMode="cover" />
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
    gap: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xs,
  },
  skipText: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.inkMuted,
    paddingVertical: SPACING.xs,
  },
  carousel: {
    flex: 1,
  },
  slide: {
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.lg,
    paddingHorizontal: SPACING.xxl,
    paddingVertical: SPACING.md,
  },
  slideImage: {
    width: "100%",
    height: 220,
    borderRadius: RADIUS.lg,
  },
  slideTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    lineHeight: 25,
    textAlign: "center",
    paddingVertical: SPACING.xs,
  },
  slideDesc: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    lineHeight: 20,
    textAlign: "center",
    color: COLORS.inkMuted,
    paddingVertical: SPACING.xs,
  },
  bottom: {
    gap: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: SPACING.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.border,
  },
  dotActive: {
    width: 20,
    backgroundColor: COLORS.primary,
  },
});
