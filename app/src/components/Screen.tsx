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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../theme/colors";

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
  style?: StyleProp<ViewStyle>;
}

export function Screen({
  children,
  scroll = true,
  center = false,
  keyboardAvoiding = true,
  horizontalPadding = 20,
  hasNativeHeader = false,
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
      style={styles.flex}
      contentContainerStyle={[paddingStyle, center && styles.center, style]}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.flex, paddingStyle, center && styles.center, style]}>{children}</View>
  );

  if (!keyboardAvoiding) return content;

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {content}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  center: {
    flexGrow: 1,
    justifyContent: "center",
  },
});
