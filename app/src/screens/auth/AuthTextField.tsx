import { StyleSheet, Text, TextInput, View, type TextInputProps } from "react-native";
import { FONTS } from "../../theme/fonts";
import { COLORS } from "../../theme/colors";
import { RADIUS } from "../../theme/radius";
import { SPACING } from "../../theme/spacing";

interface AuthTextFieldProps extends TextInputProps {
  label: string;
  error?: string;
}

export function AuthTextField({ label, style, error, ...inputProps }: AuthTextFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error && styles.inputError, style]}
        placeholderTextColor={COLORS.mutedText}
        textAlign="right"
        {...inputProps}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: SPACING.sm - 2,
  },
  label: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    lineHeight: 20,
    paddingVertical: 2,
    color: COLORS.ink,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.lg - 2,
    paddingVertical: SPACING.md,
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: COLORS.ink,
    writingDirection: "rtl",
  },
  inputError: {
    borderColor: COLORS.errorText,
  },
  errorText: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.errorText,
    paddingVertical: 2,
  },
});
