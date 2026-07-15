import { StyleSheet, Text, TextInput, View, type TextInputProps } from "react-native";
import { FONTS } from "../../theme/fonts";

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
        placeholderTextColor="#9AA5A0"
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
    gap: 6,
  },
  label: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    lineHeight: 20,
    paddingVertical: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D7DEDA",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: FONTS.regular,
    fontSize: 16,
    writingDirection: "rtl",
  },
  inputError: {
    borderColor: "#B3261E",
  },
  errorText: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 18,
    color: "#B3261E",
    paddingVertical: 2,
  },
});
