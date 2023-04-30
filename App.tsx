import "react-native-gesture-handler";
import { AuthProvider } from "./src/context/AuthContext";
import { Routes } from "./src/routes";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaView className="flex-1">
        <Routes />
        <StatusBar style="auto" />
      </SafeAreaView>
    </AuthProvider>
  );
}
