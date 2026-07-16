import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { AuthApiError, NetworkUnavailableError } from "../../data/authApi";
import { signUpSchema, getFieldErrors, type FieldErrors } from "../../validation/schemas";
import { Screen } from "../../components/Screen";
import { ScreenTitle } from "../../components/ScreenTitle";
import { OfflineBanner } from "../../components/OfflineBanner";
import { FONTS } from "../../theme/fonts";
import { COLORS } from "../../theme/colors";
import { AuthTextField } from "./AuthTextField";

export function SignUpScreen() {
  const { t } = useTranslation();
  const { signUp } = useAuth();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<typeof signUpSchema>>({});

  const onSubmit = async () => {
    const errors = getFieldErrors(signUpSchema, { email: emailAddress, password });
    if (errors) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      await signUp(emailAddress, password);
      // RootNavigator's Stack.Protected switches away from (auth)
      // automatically once isSignedIn flips true — nothing to do here.
    } catch (error) {
      if (error instanceof NetworkUnavailableError) {
        setErrorMessage(t("auth.networkError"));
      } else if (error instanceof AuthApiError && error.code === "email_taken") {
        setErrorMessage(t("auth.emailTakenError"));
      } else {
        setErrorMessage(t("auth.genericError"));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Screen center style={styles.content}>
      <OfflineBanner />
      <ScreenTitle align="center">{t("auth.signUpCta")}</ScreenTitle>

      <AuthTextField
        label={t("auth.emailLabel")}
        value={emailAddress}
        onChangeText={(value) => {
          setEmailAddress(value);
          if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
        }}
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        error={fieldErrors.email ? t(`validation.${fieldErrors.email}`) : undefined}
      />
      <AuthTextField
        label={t("auth.passwordLabel")}
        value={password}
        onChangeText={(value) => {
          setPassword(value);
          if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: undefined }));
        }}
        secureTextEntry
        textContentType="newPassword"
        error={fieldErrors.password ? t(`validation.${fieldErrors.password}`) : undefined}
      />

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <Pressable style={styles.button} onPress={onSubmit} disabled={isSubmitting}>
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>{t("auth.signUpButton")}</Text>
        )}
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 16,
  },
  button: {
    backgroundColor: "#2E7D5B",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontFamily: FONTS.medium,
    fontSize: 16,
  },
  error: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.error,
    textAlign: "center",
    paddingVertical: 4,
  },
});
