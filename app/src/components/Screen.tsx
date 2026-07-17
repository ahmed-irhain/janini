import type { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../theme/colors";
import { GRADIENTS } from "../theme/gradients";

interface ScreenProps {
  children: ReactNode;
  /** Wraps children in a ScrollView so overflowing content can be reached instead of clipped. */
  scroll?: boolean;
  /** Vertically centers content — for short, static screens. */
  center?: boolean;
  /** Wraps in a KeyboardAvoidingView so the keyboard doesn't cover fields. */
  keyboardAvoiding?: boolean;
  /** Set to 0 for screens that manage their own horizontal insets (e.g. full-bleed list rows). */
  horizontalPadding?: number;
  /** Set when the route already renders a native Stack header, which reserves the top safe-area itself. */
  hasNativeHeader?: boolean;
  /** Renders `gradients.auroraWash` as the screen backdrop instead of a flat
   * `background` fill. design.md reserves this for onboarding/welcome card
   * stacks — ration to a single screen. */
  backgroundGradient?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Screen({
  children,
  scroll = true,
  center = false,
  keyboardAvoiding = true,
  horizontalPadding = 16,
  hasNativeHeader = false,
  backgroundGradient = false,
  style,
}: ScreenProps) {
  const insets = useSafeAreaInsets();

  const paddingStyle: ViewStyle = {
    paddingTop: hasNativeHeader ? 16 : insets.top + 16,
    paddingBottom: insets.bottom + 16,
    paddingHorizontal: horizontalPadding,
  };

  const content = scroll ? (
    <ScrollView
      style={styles.transparent}
      contentContainerStyle={[paddingStyle, center && styles.center, style]}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.transparent, paddingStyle, center && styles.center, style]}>{children}</View>
  );

  const withKeyboardAvoiding = keyboardAvoiding ? (
    <KeyboardAvoidingView style={styles.transparent} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      {content}
    </KeyboardAvoidingView>
  ) : (
    content
  );

  if (backgroundGradient) {
    const { colors, locations, start, end } = GRADIENTS.auroraWash;
    return (
      <LinearGradient colors={colors} locations={locations} start={start} end={end} style={styles.flex}>
        {withKeyboardAvoiding}
      </LinearGradient>
    );
  }

  return <View style={styles.flexBackground}>{withKeyboardAvoiding}</View>;
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  flexBackground: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  transparent: {
    flex: 1,
  },
  center: {
    flexGrow: 1,
    justifyContent: "center",
  },
});
