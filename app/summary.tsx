import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

// Näherung: ~7.8 km/s Orbitalgeschwindigkeit (als „vmax“ der Rakete)
const V_MAX_KM_S = 7.8;

export default function SummaryScreen() {
  // Erwartete URL-Parameter:
  // /summary?work=60&pause=10&rounds=5
  const params = useLocalSearchParams<{ work?: string; pause?: string; rounds?: string }>();

  const workSec = useMemo(
    () => parseInt(params.work ?? "60", 10) || 0,
    [params.work]
  );
  const roundsTotal = useMemo(
    () => parseInt(params.rounds ?? "5", 10) || 1,
    [params.rounds]
  );

  // Gesamtzeit, die in der "Arbeit"-Phase verbracht wurde (angenommen: alle Runden fertig)
  const totalWorkSeconds = workSec * roundsTotal;

  // Distanz = Zeit * v_max (km/s)
  const distanceKm = totalWorkSeconds * V_MAX_KM_S;
  const distanceRounded = Math.round(distanceKm); // für einen cleanen Wert

  const handleRestart = () => {
    const work = params.work ?? "60";
    const pause = params.pause ?? "10";
    const rounds = params.rounds ?? "5";
    router.replace(`/timer-run?work=${work}&pause=${pause}&rounds=${rounds}`);
  };

  const handleHome = () => {
    router.replace("/"); // zurück zum Startscreen (index.tsx)
  };

  return (
    <View style={styles.screen}>
      <View style={styles.centerContent}>
        <Text style={styles.title}>Super gemacht!</Text>

        <Text style={styles.text}>
          Du hast virtuelle{" "}
          <Text style={styles.highlight}>{distanceRounded} Kilometer</Text>{" "}
          während deinem Intervall zurückgelegt, Glückwunsch!
        </Text>
      </View>

      <View style={styles.buttonRow}>
        <Pressable style={styles.button} onPress={handleRestart}>
          <Text style={styles.buttonText}>Neu starten</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={handleHome}>
          <Text style={styles.buttonText}>Home</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#020617",
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: "space-between",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: "rgba(248,250,252,0.9)",
    textAlign: "center",
    lineHeight: 22,
  },
  highlight: {
    fontWeight: "700",
    color: "#38bdf8",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    columnGap: 12,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },
});
