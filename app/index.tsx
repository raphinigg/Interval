import React, { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";

export default function TimerSetup() {
  const [workSeconds, setWorkSeconds] = useState("");
  const [breakSeconds, setBreakSeconds] = useState("");
  const [rounds, setRounds] = useState("");

  return (
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

        <Pressable style={styles.button} onPress={() => { /* Schritt 2: wird später verdrahtet */ }}>
          <Text style={styles.buttonText}>Weiter</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f3f4f6", padding: 16 },
  wrap: { flex: 1, maxWidth: 420, width: "100%", alignSelf: "center", justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "600", marginBottom: 16 },
  field: { marginBottom: 12 },
  label: { fontSize: 14, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#fff",
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
