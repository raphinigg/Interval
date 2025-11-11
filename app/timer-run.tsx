import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function TimerRun() {
  const params = useLocalSearchParams<{ work?: string; pause?: string; rounds?: string }>();

  const workSec = useMemo(() => parseInt(params.work ?? "25", 10) || 0, [params.work]);
  const pauseSec = useMemo(() => parseInt(params.pause ?? "5", 10) || 0, [params.pause]);
  const roundsTotal = useMemo(() => parseInt(params.rounds ?? "8", 10) || 1, [params.rounds]);

  const [phase, setPhase] = useState<"work" | "pause">("work");
  const [round, setRound] = useState(1);
  const [secondsLeft, setSecondsLeft] = useState(workSec);
  const [running, setRunning] = useState(true);

  // Countdown Logik
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

  const end = () => {
    router.back();
  };

  const mmss = (total: number) => {
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <View>
      <Text>{mmss(secondsLeft)}</Text>
      <Text>
        Runde {round} / {roundsTotal} ({phase === "work" ? "Arbeit" : "Pause"})
      </Text>

      <Pressable onPress={togglePause}>
        <Text>{running ? "Pause" : "Weiter"}</Text>
      </Pressable>

      <Pressable onPress={skip}>
        <Text>Skip</Text>
      </Pressable>

      <Pressable onPress={end}>
        <Text>End</Text>
      </Pressable>
    </View>
  );
}
