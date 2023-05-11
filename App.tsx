import "react-native-gesture-handler";
import { AuthProvider } from "./src/context/AuthContext";
import * as SplashScreen from "expo-splash-screen";
import { Routes } from "./src/routes";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, useColorScheme } from "react-native";

export default function App() {
  let colorScheme = useColorScheme();
  console.log(colorScheme);

  async function onLayoutRootView() {
    await SplashScreen.hideAsync();
  }

  return (
    <AuthProvider>
      <SafeAreaView onLayout={onLayoutRootView} className="flex-1">
        <Routes />
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      </SafeAreaView>
    </AuthProvider>
  );
}
