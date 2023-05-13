import { Feather as Icon } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { ImageBackground, View, Image, useColorScheme } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";

import DrawerHeadingBG from "../../../assets/drawer-heading-bg.jpg";
import DrawerHeadingBGDark from "../../../assets/drawer-heading-bg-dark.jpg";
import colors from "../../../colors";
import Text from "../common/Text";

type StyledDrawerProps = DrawerContentComponentProps & {};

const StyledDrawer = (props: StyledDrawerProps) => {
  const { logout, tenant, appUser } = useAuth();
  let colorScheme = useColorScheme();

  async function handleLogout(): Promise<void> {
    try {
      return await logout();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View className="flex-1">
      <ImageBackground source={colorScheme === "dark" ? DrawerHeadingBGDark : DrawerHeadingBG} resizeMode="cover">
        <View className="items-center pt-8 pb-4">
          {!appUser?.photoURL ? (
            <View className="justify-center p-4 rounded-full bg-base-400 dark:bg-base-600">
              <Icon name="user" size={24} color={colors.content[100]} />
            </View>
          ) : (
            <Image source={{ uri: appUser.photoURL }} resizeMode="contain" className="rounded-full resize w-14 h-14" />
          )}
          <Text size="base" className="mt-1 font-bold text-content-400">
            {tenant?.name}
          </Text>
          <Text size="sm" className="italic font-normal tracking-wide text-content-400">
            {appUser?.name}
          </Text>
        </View>
      </ImageBackground>

      <DrawerContentScrollView className="flex-1" {...props}>
        <DrawerItemList {...props} />
        <View className="mx-4 my-6 border-t border-secondary dark:border-primary" />
        <DrawerItem
          label={"Avalie-nos"}
          onPress={() => {}}
          activeBackgroundColor={colorScheme === "dark" ? colors.primary.faded : colors.secondary.faded}
          activeTintColor={colorScheme === "dark" ? colors.primary.DEFAULT : colors.secondary.DEFAULT}
          inactiveTintColor={colorScheme === "dark" ? colors.primary.DEFAULT : colors.secondary.DEFAULT}
          icon={({ color, size }) => <Icon name="star" color={color} size={size} />}
        />
        <DrawerItem
          label={"Compartilhe"}
          onPress={() => {}}
          activeBackgroundColor={colorScheme === "dark" ? colors.primary.faded : colors.secondary.faded}
          activeTintColor={colorScheme === "dark" ? colors.primary.DEFAULT : colors.secondary.DEFAULT}
          inactiveTintColor={colorScheme === "dark" ? colors.primary.DEFAULT : colors.secondary.DEFAULT}
          icon={({ color, size }) => <Icon name="share-2" color={color} size={size} />}
        />
        <DrawerItem
          label={"Sair"}
          onPress={handleLogout}
          activeBackgroundColor={colorScheme === "dark" ? colors.primary.faded : colors.secondary.faded}
          activeTintColor={colorScheme === "dark" ? colors.primary.DEFAULT : colors.secondary.DEFAULT}
          inactiveTintColor={colorScheme === "dark" ? colors.primary.DEFAULT : colors.secondary.DEFAULT}
          icon={({ color, size }) => <Icon name="log-out" color={color} size={size} />}
        />
      </DrawerContentScrollView>
    </View>
  );
};

export default StyledDrawer;
