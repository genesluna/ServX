import "react-native-gesture-handler";
import { AuthProvider } from "./src/context/AuthContext";
import * as SplashScreen from "expo-splash-screen";
import { Routes } from "./src/routes";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { useColorScheme } from "nativewind";

export default function App() {
  const { colorScheme, setColorScheme } = useColorScheme();

  setColorScheme("dark");

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
