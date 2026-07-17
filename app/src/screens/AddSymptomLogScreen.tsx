import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import type { SymptomSeverity } from "@janini/shared";
import { usePregnancyData } from "../context/PregnancyDataContext";
import { symptomLogSchema, getFieldErrors, type FieldErrors } from "../validation/schemas";
import { Screen } from "../components/Screen";
import { ScreenTitle } from "../components/ScreenTitle";
import { Button } from "../components/Button";
import { Chip } from "../components/Chip";
import { IconButton } from "../components/IconButton";
import { FONTS } from "../theme/fonts";
import { COLORS } from "../theme/colors";
import { RADIUS } from "../theme/radius";
import { SPACING } from "../theme/spacing";

const SEVERITIES: SymptomSeverity[] = ["mild", "moderate", "severe"];

export function AddSymptomLogScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { symptomLogs, addSymptomLog, updateSymptomLog, deleteSymptomLog } = usePregnancyData();
  const existing = id ? symptomLogs.find((item) => item.id === id) : undefined;
  const [symptom, setSymptom] = useState(existing?.symptom ?? "");
  const [severity, setSeverity] = useState<SymptomSeverity>(existing?.severity ?? "mild");
  const [note, setNote] = useState(existing?.note ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<typeof symptomLogSchema>>({});
  const [saveError, setSaveError] = useState<string | null>(null);

  const onSave = async () => {
    const errors = getFieldErrors(symptomLogSchema, { symptom });
    if (errors) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setSaveError(null);
    setIsSubmitting(true);
    try {
      const input = { symptom: symptom.trim(), severity, note: note.trim() || null };
      if (existing) {
        await updateSymptomLog(existing.id, input);
      } else {
        await addSymptomLog(input);
      }
      router.back();
    } catch {
      setSaveError(t("validation.saveFailed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const onDelete = () => {
    if (!existing) return;
    Alert.alert(t("track.deleteSymptomConfirmTitle"), t("track.deleteSymptomConfirmMessage"), [
      { text: t("common.cancel"), style: "cancel" },
      {
        text: t("common.delete"),
        style: "destructive",
        onPress: async () => {
          setSaveError(null);
          setIsDeleting(true);
          try {
            await deleteSymptomLog(existing.id);
            router.back();
          } catch {
            setSaveError(t("common.deleteFailed"));
          } finally {
            setIsDeleting(false);
          }
        },
      },
    ]);
  };

  return (
    <Screen style={styles.content}>
      <View style={styles.header}>
        <IconButton
          icon="close"
          onPress={() => router.back()}
          accessibilityLabel={t("common.cancel")}
          size={36}
        />
        <ScreenTitle style={styles.headerTitle}>
          {existing ? t("track.editSymptomTitle") : t("track.logSymptomButton")}
        </ScreenTitle>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>{t("symptomLog.symptomLabel")}</Text>
        <TextInput
          style={[styles.input, fieldErrors.symptom && styles.inputError]}
          value={symptom}
          onChangeText={(value) => {
            setSymptom(value);
            if (fieldErrors.symptom) setFieldErrors((prev) => ({ ...prev, symptom: undefined }));
          }}
          textAlign="right"
        />
        {fieldErrors.symptom ? (
          <Text style={styles.errorText}>{t(`validation.${fieldErrors.symptom}`)}</Text>
        ) : null}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>{t("symptomLog.severityLabel")}</Text>
        <View style={styles.severityRow}>
          {SEVERITIES.map((option) => (
            <Chip
              key={option}
              label={t(`symptomLog.severity${capitalize(option)}`)}
              selected={severity === option}
              onPress={() => setSeverity(option)}
            />
          ))}
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>{t("symptomLog.noteLabel")}</Text>
        <TextInput
          style={[styles.input, styles.noteInput]}
          value={note}
          onChangeText={setNote}
          multiline
          textAlign="right"
        />
      </View>

      <Text style={styles.consultNote}>{t("symptomLog.consultDoctorNote")}</Text>

      {saveError ? <Text style={styles.errorText}>{saveError}</Text> : null}

      <View style={styles.actionsRow}>
        <Button
          label={t("common.cancel")}
          variant="tonal"
          fullWidth={false}
          style={styles.actionButton}
          onPress={() => router.back()}
        />
        <Button
          label={t("symptomLog.saveButton")}
          onPress={onSave}
          loading={isSubmitting}
          fullWidth={false}
          style={styles.actionButton}
        />
      </View>

      {existing ? (
        <Button
          label={t("common.delete")}
          variant="destructive"
          onPress={onDelete}
          loading={isDeleting}
          disabled={isSubmitting}
        />
      ) : null}
    </Screen>
  );
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

const styles = StyleSheet.create({
  content: {
    gap: SPACING.lg,
  },
  header: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    gap: SPACING.md,
  },
  headerTitle: {
    flex: 1,
    marginBottom: 0,
  },
  actionsRow: {
    flexDirection: "row-reverse",
    gap: SPACING.sm,
  },
  actionButton: {
    flex: 1,
  },
  field: {
    gap: SPACING.sm - 2,
  },
  label: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    lineHeight: 18,
    paddingVertical: 2,
    color: COLORS.ink,
    textAlign: "right",
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.lg - 2,
    paddingVertical: SPACING.md,
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: COLORS.ink,
    writingDirection: "rtl",
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    fontFamily: FONTS.regular,
    fontSize: 11,
    lineHeight: 16,
    color: COLORS.error,
    paddingVertical: 2,
    textAlign: "right",
  },
  noteInput: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  severityRow: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  consultNote: {
    fontFamily: FONTS.regular,
    fontSize: 11,
    lineHeight: 16,
    color: COLORS.inkMuted,
    textAlign: "right",
    paddingVertical: 4,
  },
});
