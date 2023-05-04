import { View, Image, ViewProps } from "react-native";
import React from "react";

import Logo from "../../../../assets/servx_logo_md.png";

type HeaderProps = ViewProps & {};

/**
 * A component that displays the App logo as the header of the auth forms.
 *
 * @returns - A JSX.Element representing the auth form header.
 */
const Header = ({ ...props }: HeaderProps): JSX.Element => {
  return (
    <View {...props}>
      <Image source={Logo} />
    </View>
  );
};

export default Header;
