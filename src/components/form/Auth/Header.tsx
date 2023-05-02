import { View, Image, ViewProps } from "react-native";
import React from "react";

import Logo from "../../../../assets/servx_logo_md.png";

type HeaderProps = ViewProps & {};

/**
 * A component that displays the ServX logo as the header.
 *
 * @param {HeaderProps} props - The props object that extends ViewProps interface.
 * @returns {JSX.Element} - A JSX.Element representing the ServX header.
 */
const Header = ({ ...props }: HeaderProps): JSX.Element => {
  return (
    <View {...props}>
      <Image source={Logo} />
    </View>
  );
};

export default Header;
