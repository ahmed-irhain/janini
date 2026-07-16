import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { AuthApiError } from "../../data/authApi";
import { signUpSchema, getFieldErrors, type FieldErrors } from "../../validation/schemas";
import { Screen } from "../../components/Screen";
import { ScreenTitle } from "../../components/ScreenTitle";
import { Button } from "../../components/Button";
import { COLORS } from "../../theme/colors";
import { SPACING } from "../../theme/spacing";
import { TYPE } from "../../theme/typography";
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
      if (error instanceof AuthApiError && error.code === "email_taken") {
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

      <Button label={t("auth.signUpButton")} onPress={onSubmit} loading={isSubmitting} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: SPACING.lg,
  },
  error: {
    ...TYPE.bodySmall,
    fontSize: 14,
    color: COLORS.errorText,
    textAlign: "center",
    paddingVertical: SPACING.xs,
  },
});
