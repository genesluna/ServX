import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Auth/Login";
import Register from "../screens/Auth/Register";

const { Screen, Navigator } = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator>
      <Screen name="login" component={Login} options={{ headerShown: false }} />
      <Screen name="register" component={Register} options={{ title: "Registro", headerTitleAlign: "center" }} />
    </Navigator>
  );
}
