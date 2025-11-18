import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function TimerRun() {
  const params = useLocalSearchParams<{ work?: string; pause?: string; rounds?: string }>();

  const workSec = useMemo(() => parseInt(params.work ?? "60", 10) || 0, [params.work]);
  const pauseSec = useMemo(() => parseInt(params.pause ?? "10", 10) || 0, [params.pause]);
  const roundsTotal = useMemo(() => parseInt(params.rounds ?? "5", 10) || 1, [params.rounds]);

  const [phase, setPhase] = useState<"work" | "pause">("work");
  const [round, setRound] = useState(1);
  const [secondsLeft, setSecondsLeft] = useState(workSec);
  const [running, setRunning] = useState(true);

  // Countdown-Logik
  useEffect(() => {
    if (!running) return;

    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s > 0) return s - 1;

        // ARBEIT → PAUSE
        if (phase === "work") {
          setPhase("pause");
          return pauseSec;
        }

        // PAUSE → NÄCHSTE RUNDE
        if (round < roundsTotal) {
          setRound((r) => r + 1);
          setPhase("work");
          return workSec;
        }

        // ALLES FERTIG → SUMMARY SCREEN
        setRunning(false);
        router.replace(
          `/summary?work=${workSec}&pause=${pauseSec}&rounds=${roundsTotal}`
        );

        return 0;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [running, phase, round, roundsTotal, workSec, pauseSec]);

  const togglePause = () => setRunning((v) => !v);

  const skip = () => {
    if (phase === "work") {
      setPhase("pause");
      setSecondsLeft(pauseSec);
    } else {
      if (round < roundsTotal) {
        setRound((r) => r + 1);
        setPhase("work");
        setSecondsLeft(workSec);
      } else {
        setRunning(false);
        router.replace(
          `/summary?work=${workSec}&pause=${pauseSec}&rounds=${roundsTotal}`
        );
      }
    }
  };

  const end = () => router.replace("/");

  const secondsDisplay = secondsLeft.toString();

  // DOTS für die Rundendarstellung
  const dots = Array.from({ length: roundsTotal }, (_, i) => i + 1);

  return (
    <ImageBackground
      source={require("../assets/images/background.gif")}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay}>

        {/* OBERER BEREICH */}
        <View style={styles.top}>
          <View style={styles.timeRow}>
            <Text style={styles.timeValue}>{secondsDisplay}</Text>
            <View style={styles.timeLabelCol}>
              <Text style={styles.timeLabel}>Sekunden</Text>
              <Text style={styles.timeLabel}>
                {phase === "work" ? "Arbeit" : "Pause"}
              </Text>
            </View>
          </View>

          {/* RUNDEN-KREISE */}
          <View style={styles.dotsRow}>
            {dots.map((n) => {
              const active = n === round;
              return (
                <View
                  key={n}
                  style={[styles.dot, active && styles.dotActive]}
                />
              );
            })}
          </View>
        </View>

        {/* BUTTONS */}
        <View style={styles.bottom}>
          <Pressable style={styles.button} onPress={togglePause}>
            <Text style={styles.buttonText}>
              {running ? "Pause" : "Weiter"}
            </Text>
          </Pressable>

          <Pressable style={styles.button} onPress={skip}>
            <Text style={styles.buttonText}>Skip</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={end}>
            <Text style={styles.buttonText}>End</Text>
          </Pressable>
        </View>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 72,
    paddingBottom: 32,
    justifyContent: "space-between",
  },
  top: { alignItems: "center" },
  timeRow: { flexDirection: "row", alignItems: "center" },
  timeValue: { fontSize: 48, fontWeight: "600", color: "white" },
  timeLabelCol: { marginLeft: 8 },
  timeLabel: { color: "white", fontSize: 14 },

  // DOTS
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginTop: 16,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
  },
  dotActive: {
    backgroundColor: "white",
    borderColor: "white",
  },

  bottom: { alignItems: "center", gap: 12 },
  button: {
    width: 220,
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
