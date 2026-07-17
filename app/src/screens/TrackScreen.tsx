import { Pressable, Alert, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { usePregnancyData } from "../context/PregnancyDataContext";
import { Screen } from "../components/Screen";
import { ScreenTitle } from "../components/ScreenTitle";
import { SectionHeader } from "../components/SectionHeader";
import { EmptyState } from "../components/EmptyState";
import { Card } from "../components/Card";
import { COLORS } from "../theme/colors";
import { FONTS } from "../theme/fonts";
import { SPACING } from "../theme/spacing";
import { TYPE } from "../theme/typography";

const RECENT_SYMPTOM_COUNT = 5;

export function TrackScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { symptomLogs, appointments, deleteSymptomLog, deleteAppointment } = usePregnancyData();

  const recentSymptoms = symptomLogs.slice(0, RECENT_SYMPTOM_COUNT);
  const upcomingAppointments = [...appointments].sort(
    (a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
  );

  const onDeleteSymptom = (id: string) => {
    Alert.alert(t("track.deleteSymptomConfirmTitle"), t("track.deleteSymptomConfirmMessage"), [
      { text: t("common.cancel"), style: "cancel" },
      { text: t("common.delete"), style: "destructive", onPress: () => deleteSymptomLog(id) },
    ]);
  };

  const onDeleteAppointment = (id: string) => {
    Alert.alert(
      t("track.deleteAppointmentConfirmTitle"),
      t("track.deleteAppointmentConfirmMessage"),
      [
        { text: t("common.cancel"), style: "cancel" },
        { text: t("common.delete"), style: "destructive", onPress: () => deleteAppointment(id) },
      ]
    );
  };

  return (
    <Screen style={styles.content} insetsBottomTabBar>
      <ScreenTitle>{t("track.tabTitle")}</ScreenTitle>

      <View style={styles.section}>
        <SectionHeader
          title={t("track.recentSymptomsTitle")}
          actionLabel={t("track.logSymptomButton")}
          onActionPress={() => router.push("/symptom-log/add")}
        />
        {recentSymptoms.length === 0 ? (
          <EmptyState message={t("track.emptySymptoms")} icon="pulse-outline" />
        ) : (
          recentSymptoms.map((log) => (
            <Card key={log.id}>
              <View style={styles.cardHeader}>
                <View style={styles.cardActions}>
                  <Pressable
                    onPress={() => router.push(`/symptom-log/${log.id}`)}
                    hitSlop={8}
                    accessibilityLabel={t("common.edit")}
                  >
                    <Ionicons name="create-outline" size={18} color={COLORS.primary} />
                  </Pressable>
                  <Pressable
                    onPress={() => onDeleteSymptom(log.id)}
                    hitSlop={8}
                    accessibilityLabel={t("common.delete")}
                  >
                    <Ionicons name="trash-outline" size={18} color={COLORS.error} />
                  </Pressable>
                </View>
                <Text style={styles.cardTitle}>{log.symptom}</Text>
              </View>
              <Text style={styles.cardSubtitle}>
                {t(`symptomLog.severity${capitalize(log.severity)}`)} ·{" "}
                {new Date(log.loggedAt).toLocaleDateString("ar")}
              </Text>
              {log.note ? <Text style={styles.cardNote}>{log.note}</Text> : null}
            </Card>
          ))
        )}
      </View>

      <View style={styles.section}>
        <SectionHeader
          title={t("track.upcomingAppointmentsTitle")}
          actionLabel={t("track.addAppointmentButton")}
          onActionPress={() => router.push("/appointments/add")}
        />
        {upcomingAppointments.length === 0 ? (
          <EmptyState message={t("track.emptyAppointments")} icon="calendar-outline" />
        ) : (
          upcomingAppointments.map((appointment) => (
            <Card key={appointment.id}>
              <View style={styles.cardHeader}>
                <View style={styles.cardActions}>
                  <Pressable
                    onPress={() => router.push(`/appointments/${appointment.id}`)}
                    hitSlop={8}
                    accessibilityLabel={t("common.edit")}
                  >
                    <Ionicons name="create-outline" size={18} color={COLORS.primary} />
                  </Pressable>
                  <Pressable
                    onPress={() => onDeleteAppointment(appointment.id)}
                    hitSlop={8}
                    accessibilityLabel={t("common.delete")}
                  >
                    <Ionicons name="trash-outline" size={18} color={COLORS.error} />
                  </Pressable>
                </View>
                <Text style={styles.cardTitle}>{appointment.title}</Text>
              </View>
              <Text style={styles.cardSubtitle}>
                {new Date(appointment.scheduledAt).toLocaleString("ar")}
                {appointment.location ? ` · ${appointment.location}` : ""}
              </Text>
              {appointment.notes ? <Text style={styles.cardNote}>{appointment.notes}</Text> : null}
            </Card>
          ))
        )}
      </View>
    </Screen>
  );
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

const styles = StyleSheet.create({
  content: {
    gap: SPACING.xl,
  },
  section: {
    gap: SPACING.sm,
  },
  cardHeader: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    gap: SPACING.sm,
  },
  cardActions: {
    flexDirection: "row",
    gap: SPACING.md + 2,
  },
  cardTitle: {
    ...TYPE.body,
    flex: 1,
    fontFamily: FONTS.medium,
    color: COLORS.ink,
    textAlign: "right",
  },
  cardSubtitle: {
    ...TYPE.bodySmall,
    color: COLORS.inkMuted,
    textAlign: "right",
  },
  cardNote: {
    ...TYPE.bodySmall,
    marginTop: SPACING.xs,
    color: COLORS.ink,
    textAlign: "right",
  },
});
