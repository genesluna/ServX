import { Feather as Icon } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { ImageBackground, View, Image } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";

import DrawerHeadingBG from "../../../assets/drawer-heading-bg.jpg";
import colors from "../../../colors";
import Text from "../common/Text";

type StyledDrawerProps = DrawerContentComponentProps & {};

const StyledDrawer = (props: StyledDrawerProps) => {
  const { logout, tenant, appUser } = useAuth();

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
        <View className="items-center pt-8 pb-4">
          {!appUser?.photoURL ? (
            <View className="justify-center p-4 rounded-full bg-base-400 dark:bg-base-600">
              <Icon name="user" size={24} color={colors.content[100]} />
            </View>
          ) : (
            <Image source={{ uri: appUser.photoURL }} resizeMode="contain" className="w-14 h-14 resize rounded-full" />
          )}
          <Text size="base" className="mt-1 text-content-400 font-bold">
            {tenant?.name}
          </Text>
          <Text size="sm" className=" text-content-400 font-normal italic tracking-wide">
            {appUser?.name}
          </Text>
        </View>
      </ImageBackground>

      <DrawerContentScrollView className="flex-1" {...props}>
        <DrawerItemList {...props} />
        <View className="mx-4 my-6 border-t border-primary" />
        <DrawerItem
          label={"Avalie-nos"}
          onPress={() => {}}
          activeBackgroundColor={colors.primary.faded}
          activeTintColor={colors.primary.DEFAULT}
          inactiveTintColor={colors.primary.DEFAULT}
          icon={({ color, size }) => <Icon name="star" color={color} size={size} />}
        />
        <DrawerItem
          label={"Compartilhe"}
          onPress={() => {}}
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
