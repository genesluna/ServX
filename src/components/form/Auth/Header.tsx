import { View, Image, ViewProps } from "react-native";
import React from "react";

import Logo from "../../../../assets/servx_logo_md.png";
import LogoDark from "../../../../assets/servx_logo_dark_md.png";
import { useColorScheme } from "nativewind";

type HeaderProps = ViewProps & {};

/**
 * A component that displays the App logo as the header of the auth forms.
 *
 * @returns - A JSX.Element representing the auth form header.
 */
const Header = ({ ...props }: HeaderProps): JSX.Element => {
  const { colorScheme } = useColorScheme();
  return (
    <View {...props}>
      <Image source={colorScheme === "light" ? Logo : LogoDark} />
    </View>
  );
};

export default Header;
