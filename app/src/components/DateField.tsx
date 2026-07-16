import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { formatHijriDateAr, gregorianToHijri } from "@janini/shared";
import { FONTS } from "../theme/fonts";

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
        <Ionicons name="calendar-outline" size={20} color="#2E7D5B" />
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
            textColor="#1C2620"
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
    gap: 6,
  },
  label: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    lineHeight: 20,
    paddingVertical: 2,
    textAlign: "right",
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#D7DEDA",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  fieldError: {
    borderColor: "#B3261E",
  },
  textColumn: {
    gap: 2,
  },
  primaryText: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    lineHeight: 22,
    writingDirection: "rtl",
  },
  secondaryText: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 18,
    color: "#6B7570",
    writingDirection: "rtl",
  },
  errorText: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 18,
    color: "#B3261E",
    paddingVertical: 2,
    textAlign: "right",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#EDF1EE",
    marginBottom: 4,
  },
  sheetTitle: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    lineHeight: 22,
  },
  sheetActionText: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    lineHeight: 22,
    color: "#6B7570",
  },
  sheetConfirmText: {
    color: "#2E7D5B",
  },
  picker: {
    alignSelf: "center",
  },
});
