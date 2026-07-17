import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { usePregnancyData } from "../context/PregnancyDataContext";
import { DateField } from "../components/DateField";
import { Screen } from "../components/Screen";
import { ScreenTitle } from "../components/ScreenTitle";
import { Button } from "../components/Button";
import { IconButton } from "../components/IconButton";
import { appointmentSchema, getFieldErrors, type FieldErrors } from "../validation/schemas";
import { FONTS } from "../theme/fonts";
import { COLORS } from "../theme/colors";
import { RADIUS } from "../theme/radius";
import { SPACING } from "../theme/spacing";

export function AddAppointmentScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { appointments, addAppointment, updateAppointment, deleteAppointment } =
    usePregnancyData();
  const existing = id ? appointments.find((item) => item.id === id) : undefined;
  const [title, setTitle] = useState(existing?.title ?? "");
  const [location, setLocation] = useState(existing?.location ?? "");
  const [scheduledAt, setScheduledAt] = useState(
    existing ? new Date(existing.scheduledAt) : new Date()
  );
  const [notes, setNotes] = useState(existing?.notes ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
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
      const input = {
        title: title.trim(),
        location: location.trim() || null,
        scheduledAt: scheduledAt.toISOString(),
        notes: notes.trim() || null,
      };
      if (existing) {
        await updateAppointment(existing.id, input);
      } else {
        await addAppointment(input);
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
    Alert.alert(
      t("track.deleteAppointmentConfirmTitle"),
      t("track.deleteAppointmentConfirmMessage"),
      [
        { text: t("common.cancel"), style: "cancel" },
        {
          text: t("common.delete"),
          style: "destructive",
          onPress: async () => {
            setSaveError(null);
            setIsDeleting(true);
            try {
              await deleteAppointment(existing.id);
              router.back();
            } catch {
              setSaveError(t("common.deleteFailed"));
            } finally {
              setIsDeleting(false);
            }
          },
        },
      ]
    );
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
          {existing ? t("track.editAppointmentTitle") : t("track.addAppointmentButton")}
        </ScreenTitle>
      </View>

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

      <View style={styles.actionsRow}>
        <Button
          label={t("common.cancel")}
          variant="tonal"
          fullWidth={false}
          style={styles.actionButton}
          onPress={() => router.back()}
        />
        <Button
          label={t("appointment.saveButton")}
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
  notesInput: {
    minHeight: 80,
    textAlignVertical: "top",
  },
});
