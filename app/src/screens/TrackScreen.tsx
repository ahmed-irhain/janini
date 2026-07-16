import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { usePregnancyData } from "../context/PregnancyDataContext";
import { Screen } from "../components/Screen";
import { ScreenTitle } from "../components/ScreenTitle";
import { FONTS } from "../theme/fonts";

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
    <Screen style={styles.content}>
      <ScreenTitle>{t("track.tabTitle")}</ScreenTitle>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t("track.recentSymptomsTitle")}</Text>
          <Pressable onPress={() => router.push("/symptom-log/add")}>
            <Text style={styles.addLink}>{t("track.logSymptomButton")}</Text>
          </Pressable>
        </View>
        {recentSymptoms.length === 0 ? (
          <Text style={styles.emptyText}>{t("track.emptySymptoms")}</Text>
        ) : (
          recentSymptoms.map((log) => (
            <View key={log.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.cardActions}>
                  <Pressable
                    onPress={() => router.push(`/symptom-log/${log.id}`)}
                    hitSlop={8}
                    accessibilityLabel={t("common.edit")}
                  >
                    <Ionicons name="create-outline" size={18} color="#2E7D5B" />
                  </Pressable>
                  <Pressable
                    onPress={() => onDeleteSymptom(log.id)}
                    hitSlop={8}
                    accessibilityLabel={t("common.delete")}
                  >
                    <Ionicons name="trash-outline" size={18} color="#B3261E" />
                  </Pressable>
                </View>
                <Text style={styles.cardTitle}>{log.symptom}</Text>
              </View>
              <Text style={styles.cardSubtitle}>
                {t(`symptomLog.severity${capitalize(log.severity)}`)} ·{" "}
                {new Date(log.loggedAt).toLocaleDateString("ar")}
              </Text>
              {log.note ? <Text style={styles.cardNote}>{log.note}</Text> : null}
            </View>
          ))
        )}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t("track.upcomingAppointmentsTitle")}</Text>
          <Pressable onPress={() => router.push("/appointments/add")}>
            <Text style={styles.addLink}>{t("track.addAppointmentButton")}</Text>
          </Pressable>
        </View>
        {upcomingAppointments.length === 0 ? (
          <Text style={styles.emptyText}>{t("track.emptyAppointments")}</Text>
        ) : (
          upcomingAppointments.map((appointment) => (
            <View key={appointment.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.cardActions}>
                  <Pressable
                    onPress={() => router.push(`/appointments/${appointment.id}`)}
                    hitSlop={8}
                    accessibilityLabel={t("common.edit")}
                  >
                    <Ionicons name="create-outline" size={18} color="#2E7D5B" />
                  </Pressable>
                  <Pressable
                    onPress={() => onDeleteAppointment(appointment.id)}
                    hitSlop={8}
                    accessibilityLabel={t("common.delete")}
                  >
                    <Ionicons name="trash-outline" size={18} color="#B3261E" />
                  </Pressable>
                </View>
                <Text style={styles.cardTitle}>{appointment.title}</Text>
              </View>
              <Text style={styles.cardSubtitle}>
                {new Date(appointment.scheduledAt).toLocaleString("ar")}
                {appointment.location ? ` · ${appointment.location}` : ""}
              </Text>
              {appointment.notes ? <Text style={styles.cardNote}>{appointment.notes}</Text> : null}
            </View>
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
    gap: 20,
  },
  section: {
    gap: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontFamily: FONTS.medium,
    fontSize: 17,
    lineHeight: 24,
    paddingVertical: 4,
    textAlign: "right",
  },
  addLink: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    lineHeight: 20,
    color: "#2E7D5B",
    paddingVertical: 4,
    paddingHorizontal: 4,
    textAlign: "right",
  },
  emptyText: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    lineHeight: 20,
    color: "#6B7570",
    paddingVertical: 4,
    textAlign: "right",
  },
  card: {
    backgroundColor: "#F3F6F4",
    borderRadius: 10,
    padding: 12,
    gap: 2,
  },
  cardHeader: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  cardActions: {
    flexDirection: "row",
    gap: 14,
  },
  cardTitle: {
    flex: 1,
    fontFamily: FONTS.medium,
    fontSize: 15,
    lineHeight: 22,
    textAlign: "right",
  },
  cardSubtitle: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    lineHeight: 20,
    color: "#6B7570",
    textAlign: "right",
  },
  cardNote: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 4,
    textAlign: "right",
  },
});
