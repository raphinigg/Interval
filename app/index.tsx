import React, { useState } from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";

export default function TimerSetup() {
  const [workSeconds, setWorkSeconds] = useState("");
  const [breakSeconds, setBreakSeconds] = useState("");
  const [rounds, setRounds] = useState("");

  return (
    <ImageBackground
      source={require("../assets/images/Spaceportsmall.gif")}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.leftCol}>
          {/* Headline ohne Name */}
          <Text style={styles.headlineTop}>Dein nächster</Text>
          <Text style={styles.headlineBottom}>Intervall</Text>

          {/* Sekunden Arbeit */}
          <View style={styles.row}>
            <View style={styles.circle}>
              <TextInput
                value={workSeconds}
                onChangeText={setWorkSeconds}
                placeholder="60"
                placeholderTextColor="rgba(255,255,255,0.6)"
                keyboardType="number-pad"
                style={styles.circleInput}
              />
            </View>
            <View style={styles.labelWrap}>
              <Text style={styles.label}>Sekunden</Text>
              <Text style={styles.label}>Arbeit</Text>
            </View>
          </View>

          {/* Sekunden Pause */}
          <View style={styles.row}>
            <View style={styles.circle}>
              <TextInput
                value={breakSeconds}
                onChangeText={setBreakSeconds}
                placeholder="10"
                placeholderTextColor="rgba(255,255,255,0.6)"
                keyboardType="number-pad"
                style={styles.circleInput}
              />
            </View>
            <View style={styles.labelWrap}>
              <Text style={styles.label}>Sekunden</Text>
              <Text style={styles.label}>Pause</Text>
            </View>
          </View>

          {/* Anzahl Runden */}
          <View style={styles.row}>
            <View style={styles.circle}>
              <TextInput
                value={rounds}
                onChangeText={setRounds}
                placeholder="5"
                placeholderTextColor="rgba(255,255,255,0.6)"
                keyboardType="number-pad"
                style={styles.circleInput}
              />
            </View>
            <View style={styles.labelWrap}>
              <Text style={styles.label}>Anzahl</Text>
              <Text style={styles.label}>Runden</Text>
            </View>
          </View>

          {/* Glass-UI Start-Button */}
          <Pressable
            style={styles.startBtn}
            onPress={() => {
              router.push(
                `/timer-run?work=${workSeconds || 60}&pause=${breakSeconds || 10}&rounds=${rounds || 5}`
              );
            }}
          >
            <Text style={styles.startTxt}>Starten</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}

const CIRCLE_SIZE = 72;

const styles = StyleSheet.create({
  bg: { flex: 1, width: "100%", height: "100%" },

 
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    paddingHorizontal: 32,
    paddingTop: 96,
    paddingBottom: 32,
  },
  leftCol: {
    width: "70%",
    maxWidth: 360,
    gap: 24,
  },

  headlineTop: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 28,
    fontWeight: "400",
  },
  headlineBottom: {
    color: "rgba(255,255,255,1)",
    fontSize: 32,
    fontWeight: "700",
    marginTop: -4,
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  circleInput: {
    color: "#fff",
    fontSize: 22,
    textAlign: "center",
    width: "100%",
  },
  labelWrap: {
    gap: 2,
  },
  label: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 14,
    fontWeight: "500",
  },

  // Versuch Glass Ui nachzustellen V1. --> Gibt es vielleicht ein Plugin?
  startBtn: {
    marginTop: 12,
    alignSelf: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.22)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.7)",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  startTxt: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
  },
});
