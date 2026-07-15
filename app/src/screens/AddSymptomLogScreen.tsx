import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import type { SymptomSeverity } from "@janini/shared";
import { usePregnancyData } from "../context/PregnancyDataContext";
import { symptomLogSchema, getFieldErrors, type FieldErrors } from "../validation/schemas";
import { Screen } from "../components/Screen";
import { FONTS } from "../theme/fonts";

const SEVERITIES: SymptomSeverity[] = ["mild", "moderate", "severe"];

export function AddSymptomLogScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { addSymptomLog } = usePregnancyData();
  const [symptom, setSymptom] = useState("");
  const [severity, setSeverity] = useState<SymptomSeverity>("mild");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      await addSymptomLog({ symptom: symptom.trim(), severity, note: note.trim() || null });
      router.back();
    } catch {
      setSaveError(t("validation.saveFailed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Screen style={styles.content}>
      <Text style={styles.title}>{t("track.logSymptomButton")}</Text>

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
            <Pressable
              key={option}
              style={[styles.severityButton, severity === option && styles.severityButtonActive]}
              onPress={() => setSeverity(option)}
            >
              <Text
                style={[styles.severityLabel, severity === option && styles.severityLabelActive]}
              >
                {t(`symptomLog.severity${capitalize(option)}`)}
              </Text>
            </Pressable>
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

      <Pressable style={styles.saveButton} onPress={onSave} disabled={isSubmitting}>
        <Text style={styles.saveButtonText}>{t("symptomLog.saveButton")}</Text>
      </Pressable>
    </Screen>
  );
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

const styles = StyleSheet.create({
  content: {
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    lineHeight: 28,
    textAlign: "right",
    paddingVertical: 6,
  },
  field: {
    gap: 6,
  },
  label: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    lineHeight: 20,
    paddingVertical: 2,
    textAlign: "right",
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
    textAlign: "right",
  },
  noteInput: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  severityRow: {
    flexDirection: "row",
    gap: 8,
  },
  severityButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2E7D5B",
    alignItems: "center",
  },
  severityButtonActive: {
    backgroundColor: "#2E7D5B",
  },
  severityLabel: {
    fontFamily: FONTS.medium,
    color: "#2E7D5B",
    fontSize: 13,
    lineHeight: 18,
    textAlign: "right",
  },
  severityLabelActive: {
    color: "#fff",
  },
  consultNote: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 18,
    color: "#6B7570",
    textAlign: "right",
    paddingVertical: 4,
  },
  saveButton: {
    backgroundColor: "#2E7D5B",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontFamily: FONTS.medium,
    fontSize: 16,
    textAlign: "right",
  },
});
