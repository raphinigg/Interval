import { router } from "expo-router";
import React, { useState } from "react";
import {
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

// GIF-Hintergrund + Eingabefelder + Weiter-Button
export default function TimerSetup() {
  const [workSeconds, setWorkSeconds] = useState("");
  const [breakSeconds, setBreakSeconds] = useState("");
  const [rounds, setRounds] = useState("");

  return (
    <ImageBackground
      source={require("../assets/images/Spaceportsmall.gif")}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safe}>
        <View style={styles.wrap}>
          <Text style={styles.title}>Timer konfigurieren</Text>

          <View style={styles.field}>
            <Text style={styles.label}>Sekunden Arbeit</Text>
            <TextInput
              value={workSeconds}
              onChangeText={setWorkSeconds}
              placeholder="z. B. 25"
              keyboardType="number-pad"
              style={styles.input}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Sekunden Pause</Text>
            <TextInput
              value={breakSeconds}
              onChangeText={setBreakSeconds}
              placeholder="z. B. 5"
              keyboardType="number-pad"
              style={styles.input}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Anzahl Runden</Text>
            <TextInput
              value={rounds}
              onChangeText={setRounds}
              placeholder="z. B. 8"
              keyboardType="number-pad"
              style={styles.input}
            />
          </View>

          <Pressable
            style={styles.button}
            onPress={() => {
              router.push(
                `/timer-run?work=${workSeconds || 25}&pause=${breakSeconds || 5}&rounds=${rounds || 8}`
              );
            }}
          >
            <Text style={styles.buttonText}>Weiter</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  safe: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)", // Overlay-Effekt
    padding: 16,
  },
  wrap: {
    flex: 1,
    maxWidth: 420,
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 16,
    textAlign: "center",
  },
  field: { marginBottom: 12 },
  label: { fontSize: 14, marginBottom: 6, color: "#fff" },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "rgba(255,255,255,0.8)",
    color: "#000",
  },
  button: {
    marginTop: 16,
    backgroundColor: "#000",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
