import React, { useEffect, useMemo, useState } from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";

export default function TimerRun() {
  const params = useLocalSearchParams<{ work?: string; pause?: string; rounds?: string }>();

  const workSec = useMemo(() => parseInt(params.work ?? "60", 10) || 0, [params.work]);
  const pauseSec = useMemo(() => parseInt(params.pause ?? "10", 10) || 0, [params.pause]);
  const roundsTotal = useMemo(() => parseInt(params.rounds ?? "5", 10) || 1, [params.rounds]);

  const [phase, setPhase] = useState<"work" | "pause">("work");
  const [round, setRound] = useState(1);
  const [secondsLeft, setSecondsLeft] = useState(workSec);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s > 0) return s - 1;

        if (phase === "work") {
          setPhase("pause");
          return pauseSec;
        } else {
          if (round < roundsTotal) {
            setRound((r) => r + 1);
            setPhase("work");
            return workSec;
          }
          setRunning(false);
          return 0;
        }
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
      }
    }
  };
  const end = () => router.back();

  const secondsDisplay = secondsLeft.toString();

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
              <Text style={styles.timeLabel}>{phase === "work" ? "Arbeit" : "Pause"}</Text>
            </View>
          </View>
        </View>

        {/* UNTERE BUTTONS */}
        <View style={styles.bottom}>
          <Pressable style={styles.button} onPress={togglePause}>
            <Text style={styles.buttonText}>{running ? "Pause" : "Weiter"}</Text>
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
