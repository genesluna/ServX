import { Feather as Icon, Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { ImageBackground, View, Image } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";

import DrawerHeadingBG from "../../../assets/drawer-heading-bg.jpg";
import ManuLogo from "../../../assets/manu_logo.png";
import colors from "../../../colors";
import Text from "../common/Text";

type StyledDrawerProps = DrawerContentComponentProps & {};

const StyledDrawer = (props: StyledDrawerProps) => {
  const { logout, appUser } = useAuth();

  async function handleLogout(): Promise<void> {
    try {
      return await logout();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View className="flex-1">
      <ImageBackground source={DrawerHeadingBG} resizeMode="cover">
        <View className="items-center pt-8 pb-6">
          {/* <View className="justify-center p-4 rounded-full bg-base-400 dark:bg-base-600">
            <Ionicons name="md-business-sharp" size={25} color={colors.content[100]} />
          </View> */}
          <View className="justify-center p-2 rounded-full bg-base-400 dark:bg-base-600">
            <Image source={ManuLogo} resizeMode="contain" className="w-10 h-10 resize" />
          </View>
          <Text size="base" className="mt-2 text-content-400">
            {appUser?.activeTenant?.tenantName}
          </Text>
        </View>
      </ImageBackground>

      <DrawerContentScrollView className="flex-1" {...props}>
        <DrawerItemList {...props} />
        <View className="mx-4 my-6 border-t border-primary" />
        <DrawerItem
          label={"Avalie-nos"}
          onPress={handleLogout}
          activeBackgroundColor={colors.primary.faded}
          activeTintColor={colors.primary.DEFAULT}
          inactiveTintColor={colors.primary.DEFAULT}
          icon={({ color, size }) => <Icon name="star" color={color} size={size} />}
        />
        <DrawerItem
          label={"Compartilhe"}
          onPress={handleLogout}
          activeBackgroundColor={colors.primary.faded}
          activeTintColor={colors.primary.DEFAULT}
          inactiveTintColor={colors.primary.DEFAULT}
          icon={({ color, size }) => <Icon name="share-2" color={color} size={size} />}
        />
        <DrawerItem
          label={"Sair"}
          onPress={handleLogout}
          activeBackgroundColor={colors.primary.faded}
          activeTintColor={colors.primary.DEFAULT}
          inactiveTintColor={colors.primary.DEFAULT}
          icon={({ color, size }) => <Icon name="log-out" color={color} size={size} />}
        />
      </DrawerContentScrollView>
    </View>
  );
};

export default StyledDrawer;
