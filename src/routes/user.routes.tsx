import { createDrawerNavigator } from "@react-navigation/drawer";
import { Feather as Icon } from "@expo/vector-icons";
import { useColorScheme } from "react-native";

import colors from "../../colors";
import Home from "../screens/User/Home";
import StyledDrawer from "../components/navigation/StyledDrawer";
import WorkOrders from "../screens/User/WorkOrders";
import Customers from "../screens/User/Customers";
import Products from "../screens/User/Products";
import Services from "../screens/User/Services";
import Cashier from "../screens/User/Cashier";
import Settings from "../screens/User/Settings";

const { Screen, Navigator } = createDrawerNavigator();

export function UserRoutes() {
  const colorScheme = useColorScheme();

  return (
    <Navigator
      drawerContent={(props) => <StyledDrawer {...props} />}
      initialRouteName="home"
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: colorScheme === "dark" ? colors.content[150] : colors.content[400],
        headerStyle: { backgroundColor: colorScheme === "dark" ? colors.base[400] : colors.base[50] },
        drawerStyle: { backgroundColor: colorScheme === "dark" ? colors.base[400] : colors.base[50] },
        drawerActiveBackgroundColor: colorScheme === "dark" ? colors.primary.faded : colors.secondary.faded,
        drawerActiveTintColor: colorScheme === "dark" ? colors.primary.DEFAULT : colors.secondary.DEFAULT,
        drawerInactiveTintColor: colorScheme === "dark" ? colors.primary.DEFAULT : colors.secondary.DEFAULT,
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{ title: "Painel", drawerIcon: ({ color, size }) => <Icon name="grid" color={color} size={size} /> }}
      />
      <Screen
        name="customers"
        component={Customers}
        options={{
          title: "Clientes",
          drawerIcon: ({ color, size }) => <Icon name="users" color={color} size={size} />,
        }}
      />
      <Screen
        name="workOrders"
        component={WorkOrders}
        options={{
          title: "Ordens de Serviço",
          drawerIcon: ({ color, size }) => <Icon name="file-text" color={color} size={size} />,
        }}
      />
      <Screen
        name="products"
        component={Products}
        options={{
          title: "Produtos",
          drawerIcon: ({ color, size }) => <Icon name="package" color={color} size={size} />,
        }}
      />
      <Screen
        name="services"
        component={Services}
        options={{
          title: "Serviços",
          drawerIcon: ({ color, size }) => <Icon name="tool" color={color} size={size} />,
        }}
      />
      <Screen
        name="cashier"
        component={Cashier}
        options={{
          title: "Caixa",
          drawerIcon: ({ color, size }) => <Icon name="dollar-sign" color={color} size={size} />,
        }}
      />
      <Screen
        name="settings"
        component={Settings}
        options={{
          title: "Configurações",
          drawerIcon: ({ color, size }) => <Icon name="settings" color={color} size={size} />,
        }}
      />
    </Navigator>
  );
}
