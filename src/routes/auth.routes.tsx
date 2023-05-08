import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Auth/Login";
import Register from "../screens/Auth/Register";
import Tenant from "../screens/Auth/Tenant";

const { Screen, Navigator } = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator initialRouteName="login">
      <Screen name="login" component={Login} options={{ headerShown: false }} />
      <Screen name="register" component={Register} options={{ title: "Registro", headerTitleAlign: "center" }} />
      <Screen name="tenant" component={Tenant} options={{ title: "Cadastro da Empresa", headerTitleAlign: "center" }} />
    </Navigator>
  );
}
