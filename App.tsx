import "react-native-gesture-handler";
import { AuthProvider } from "./src/context/AuthContext";
import { Routes } from "./src/routes";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { useColorScheme } from "nativewind";

export default function App() {
  const { colorScheme, setColorScheme } = useColorScheme();

  setColorScheme("dark");

  return (
    <AuthProvider>
      <SafeAreaView className="flex-1">
        <Routes />
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      </SafeAreaView>
    </AuthProvider>
  );
}
