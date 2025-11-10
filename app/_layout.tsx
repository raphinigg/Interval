import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

export default function Layout() {
  return (
    <View style={{ flex: 1 }}>
      {/* StatusBar-Einstellungen */}
      <StatusBar hidden /> 
      {/* Alternativ: <StatusBar style=\"light\" backgroundColor=\"transparent\" translucent /> */}

      <Stack
        screenOptions={{
          headerShown: false, // Falls du oben gar keine Headerzeile willst
          contentStyle: { backgroundColor: "transparent" }, // Kein weisser Balken hinter Screens
        }}
      />
    </View>
  );
}
