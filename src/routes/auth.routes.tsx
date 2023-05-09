import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useColorScheme } from "nativewind";
import colors from "../../colors";
import Login from "../screens/Auth/Login";
import Register from "../screens/Auth/Register";
import ForgotPassword from "../screens/Auth/ForgotPassword";
import EmailValidation from "../screens/Auth/EmailValidation";
import TenantRegister from "../screens/Auth/TenantRegister";

const { Screen, Navigator } = createNativeStackNavigator();

export function AuthRoutes() {
  const { colorScheme } = useColorScheme();

  return (
    <Navigator
      initialRouteName="login"
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: colorScheme === "dark" ? colors.content[150] : colors.content[400],
        headerStyle: { backgroundColor: colorScheme === "dark" ? colors.base[400] : colors.base[50] },
        animation: "slide_from_right",
      }}
    >
      <Screen
        name="login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="register"
        component={Register}
        options={{
          title: "Registro do Proprietário",
        }}
      />
      <Screen
        name="forgotPassword"
        component={ForgotPassword}
        options={{
          title: "Recuperação de senha",
        }}
      />
      <Screen
        name="emailValidation"
        component={EmailValidation}
        options={{
          title: "Verificação de e-mail",
        }}
      />
      <Screen
        name="tenantRegister"
        component={TenantRegister}
        options={{
          title: "Registro da Empresa",
        }}
      />
    </Navigator>
  );
}
