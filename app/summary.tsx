import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import {
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

// fiktive Maximalgeschwindigkeit der „Tesla-Rakete“ in km/s
const V_MAX_KM_S = 7.5;

export default function Summary() {
  // Erwartete URL: /summary?work=60&pause=10&rounds=5
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

  // Gesamt-Arbeitszeit in Sekunden
  const totalWorkSeconds = workSec * roundsTotal;

  // Distanz = Zeit * v_max (km/s)
  const distanceKm = Math.round(totalWorkSeconds * V_MAX_KM_S);

  const handleRestart = () => {
    const work = params.work ?? "60";
    const pause = params.pause ?? "10";
    const rounds = params.rounds ?? "5";

    router.replace(`/timer-run?work=${work}&pause=${pause}&rounds=${rounds}`);
  };

  const handleHome = () => {
    router.replace("/");
  };

  return (
    <ImageBackground
      source={require("../assets/images/backgroundend.png")}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* Titel oben links */}
        <View style={styles.header}>
          <Text style={styles.super}>Super,</Text>
          <Text style={styles.name}>Max!</Text>
        </View>

        {/* Textblock in der Mitte rechts */}
        <View style={styles.textBlock}>
          <Text style={styles.text}>
            Du hast virtuelle{" "}
            <Text style={styles.highlight}>{distanceKm} Kilometer</Text>{" "}
            während deinem Intervall zurückgelegt!
          </Text>

          <Text style={[styles.text, styles.textSpacing]}>Glückwunsch!</Text>
        </View>

        {/* Buttons unten mittig */}
        <View style={styles.buttonArea}>
          <Pressable style={styles.button} onPress={handleRestart}>
            <Text style={styles.buttonText}>Neu starten</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={handleHome}>
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

  // Titel
  header: {
    marginTop: 16,
  },
  super: {
    fontSize: 24,
    color: "rgba(248,250,252,0.85)",
    fontWeight: "400",
  },
  name: {
    fontSize: 26,
    color: "rgba(248,250,252,1)",
    fontWeight: "700",
  },

  // Textblock mittig rechts angeordnet
  textBlock: {
    alignSelf: "flex-end",
    width: "65%",
    marginRight: 8,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: "rgba(226,232,240,0.9)",
  },
  highlight: {
    fontWeight: "700",
    color: "rgba(248,250,252,1)",
  },
  textSpacing: {
    marginTop: 12,
  },

  // Buttons unten
  buttonArea: {
    alignItems: "center",
    gap: 10,
  },
  button: {
    width: 220,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.6)",
  },
  buttonText: {
    textAlign: "center",
    color: "rgba(15,23,42,0.95)",
    fontWeight: "600",
    fontSize: 14,
  },
});
