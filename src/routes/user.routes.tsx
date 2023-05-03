import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home";

const { Screen, Navigator } = createDrawerNavigator();

export function UserRoutes() {
  return (
    <Navigator>
      <Screen name="Home" component={Home} />
    </Navigator>
  );
}
