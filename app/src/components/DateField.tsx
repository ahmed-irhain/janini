import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { formatHijriDateAr, gregorianToHijri } from "@janini/shared";
import { FONTS } from "../theme/fonts";
import { COLORS, withAlpha } from "../theme/colors";
import { RADIUS } from "../theme/radius";
import { SPACING } from "../theme/spacing";

interface DateFieldProps {
  label: string;
  value: Date;
  mode: "date" | "datetime";
  minimumDate?: Date;
  maximumDate?: Date;
  onChange: (date: Date) => void;
  error?: string;
}

export function DateField({
  label,
  value,
  mode,
  minimumDate,
  maximumDate,
  onChange,
  error,
}: DateFieldProps) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [isOpen, setIsOpen] = useState(false);
  const [draftDate, setDraftDate] = useState(value);

  const openPicker = () => {
    setDraftDate(value);
    setIsOpen(true);
  };

  const confirm = () => {
    onChange(draftDate);
    setIsOpen(false);
  };

  const cancel = () => setIsOpen(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        style={[styles.field, error && styles.fieldError]}
        onPress={openPicker}
        accessibilityRole="button"
      >
        <Ionicons name="calendar-outline" size={20} color={COLORS.primary} />
        <View style={styles.textColumn}>
          <Text style={styles.primaryText}>{formatPrimary(value, mode)}</Text>
          {mode === "date" ? (
            <Text style={styles.secondaryText}>
              {formatHijriDateAr(gregorianToHijri(value))}
            </Text>
          ) : null}
        </View>
      </Pressable>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Modal visible={isOpen} transparent animationType="slide" onRequestClose={cancel}>
        <Pressable style={styles.backdrop} onPress={cancel} />
        <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
          <View style={styles.sheetHeader}>
            <Pressable onPress={cancel} hitSlop={8}>
              <Text style={styles.sheetActionText}>{t("common.cancel")}</Text>
            </Pressable>
            <Text style={styles.sheetTitle}>{label}</Text>
            <Pressable onPress={confirm} hitSlop={8}>
              <Text style={[styles.sheetActionText, styles.sheetConfirmText]}>
                {t("common.save")}
              </Text>
            </Pressable>
          </View>
          {/* themeVariant + textColor pin the native spinner to light/dark text on our
              light sheet regardless of system Dark Mode — without them, iOS renders
              light-mode text on Dark Mode devices, which is invisible on this white sheet. */}
          <DateTimePicker
            value={draftDate}
            mode={mode}
            display="spinner"
            themeVariant="light"
            textColor={COLORS.ink}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            onChange={(_event, selectedDate) => {
              if (selectedDate) setDraftDate(selectedDate);
            }}
            style={styles.picker}
          />
        </View>
      </Modal>
    </View>
  );
}

function formatPrimary(date: Date, mode: "date" | "datetime"): string {
  if (mode === "datetime") {
    return `${date.toLocaleDateString("ar", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })} — ${date.toLocaleTimeString("ar", { hour: "2-digit", minute: "2-digit" })}`;
  }
  return date.toLocaleDateString("ar", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.sm - 2,
  },
  label: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    lineHeight: 18,
    paddingVertical: SPACING.xs,
    color: COLORS.ink,
    textAlign: "right",
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm + 2,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.lg - 2,
    paddingVertical: SPACING.md,
  },
  fieldError: {
    borderColor: COLORS.error,
  },
  textColumn: {
    gap: SPACING.xs,
  },
  primaryText: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    lineHeight: 21,
    color: COLORS.ink,
    writingDirection: "rtl",
  },
  secondaryText: {
    fontFamily: FONTS.regular,
    fontSize: 11,
    lineHeight: 16,
    color: COLORS.inkMuted,
    writingDirection: "rtl",
  },
  errorText: {
    fontFamily: FONTS.regular,
    fontSize: 11,
    lineHeight: 16,
    color: COLORS.error,
    paddingVertical: SPACING.xs,
    textAlign: "right",
  },
  backdrop: {
    flex: 1,
    backgroundColor: withAlpha(COLORS.ink, 0.35),
  },
  sheet: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: RADIUS.lg,
    borderTopRightRadius: RADIUS.lg,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: 4,
  },
  sheetTitle: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.ink,
  },
  sheetActionText: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.inkMuted,
  },
  sheetConfirmText: {
    color: COLORS.primary,
  },
  picker: {
    alignSelf: "center",
  },
});
