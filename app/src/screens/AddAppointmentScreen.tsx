import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { usePregnancyData } from "../context/PregnancyDataContext";
import { DateField } from "../components/DateField";
import { Screen } from "../components/Screen";
import { appointmentSchema, getFieldErrors, type FieldErrors } from "../validation/schemas";
import { FONTS } from "../theme/fonts";

export function AddAppointmentScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { addAppointment } = usePregnancyData();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [scheduledAt, setScheduledAt] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<typeof appointmentSchema>>({});
  const [saveError, setSaveError] = useState<string | null>(null);

  const onSave = async () => {
    const errors = getFieldErrors(appointmentSchema, { title });
    if (errors) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setSaveError(null);
    setIsSubmitting(true);
    try {
      await addAppointment({
        title: title.trim(),
        location: location.trim() || null,
        scheduledAt: scheduledAt.toISOString(),
        notes: notes.trim() || null,
      });
      router.back();
    } catch {
      setSaveError(t("validation.saveFailed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Screen style={styles.content}>
      <Text style={styles.title}>{t("track.addAppointmentButton")}</Text>

      <View style={styles.field}>
        <Text style={styles.label}>{t("appointment.titleLabel")}</Text>
        <TextInput
          style={[styles.input, fieldErrors.title && styles.inputError]}
          value={title}
          onChangeText={(value) => {
            setTitle(value);
            if (fieldErrors.title) setFieldErrors((prev) => ({ ...prev, title: undefined }));
          }}
          textAlign="right"
        />
        {fieldErrors.title ? (
          <Text style={styles.errorText}>{t(`validation.${fieldErrors.title}`)}</Text>
        ) : null}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>{t("appointment.locationLabel")}</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          textAlign="right"
        />
      </View>

      <DateField
        label={t("appointment.dateLabel")}
        value={scheduledAt}
        mode="datetime"
        minimumDate={new Date()}
        onChange={setScheduledAt}
      />

      <View style={styles.field}>
        <Text style={styles.label}>{t("appointment.notesLabel")}</Text>
        <TextInput
          style={[styles.input, styles.notesInput]}
          value={notes}
          onChangeText={setNotes}
          multiline
          textAlign="right"
        />
      </View>

      {saveError ? <Text style={styles.errorText}>{saveError}</Text> : null}

      <Pressable style={styles.saveButton} onPress={onSave} disabled={isSubmitting}>
        <Text style={styles.saveButtonText}>{t("appointment.saveButton")}</Text>
      </Pressable>
    </Screen>
  );
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
  notesInput: {
    minHeight: 80,
    textAlignVertical: "top",
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
