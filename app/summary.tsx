import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

// fiktive Geschwindigkeit der Rakete in km/s
const V_MAX_KM_S = 7.5;

export default function Summary() {
  const params = useLocalSearchParams<{
    work?: string;
    pause?: string;
    rounds?: string;
  }>();

  const workSec = useMemo(
    () => parseInt(params.work ?? "60", 10) || 0,
    [params.work]
  );
  const roundsTotal = useMemo(
    () => parseInt(params.rounds ?? "5", 10) || 1,
    [params.rounds]
  );

  const totalWorkSeconds = workSec * roundsTotal;
  const distanceKm = Math.round(totalWorkSeconds * V_MAX_KM_S);

  const restart = () => {
    const work = params.work ?? "60";
    const pause = params.pause ?? "10";
    const rounds = params.rounds ?? "5";
    router.replace(`/timer-run?work=${work}&pause=${pause}&rounds=${rounds}`);
  };

  const goHome = () => {
    router.replace("/");
  };

  return (
    <ImageBackground
      source={require("../assets/images/backgroundend.png")}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* Titel – weiter unten und zentriert */}
        <View style={styles.header}>
          <Text style={styles.title}>Super gemacht!</Text>
        </View>

        {/* Textblock – mittig im Screen */}
        <View style={styles.textBlock}>
          <Text style={styles.text}>
            Du hast virtuelle{" "}
            <Text style={styles.highlight}>{distanceKm} Kilometer</Text>{" "}
            während deinem Intervall zurückgelegt!
          </Text>

          <Text style={[styles.text, styles.spacing]}>Glückwunsch!</Text>
        </View>

        {/* Buttons – identisch zu timer-run.tsx */}
        <View style={styles.buttonArea}>
          <Pressable style={styles.button} onPress={restart}>
            <Text style={styles.buttonText}>Neu starten</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={goHome}>
            <Text style={styles.buttonText}>Home</Text>
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
    paddingVertical: 32,
    justifyContent: "space-between",
  },

  // Titel etwas weiter unten und in der Mitte
  header: {
    marginTop: 70,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "rgba(248,250,252,0.95)",
  },

  // Text mittig, leicht nach rechts versetzt möglich über maxWidth
  textBlock: {
    alignSelf: "center",
    maxWidth: "60%",
  },
  text: {
    color: "rgba(226,232,240,0.9)",
    fontSize: 15,
    lineHeight: 21,
    textAlign: "left",
  },
  highlight: {
    fontWeight: "700",
    color: "white",
  },
  spacing: {
    marginTop: 12,
  },

  // Buttons – exakt wie timer-run.tsx
  buttonArea: {
    alignItems: "center",
    gap: 12,
  },
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
