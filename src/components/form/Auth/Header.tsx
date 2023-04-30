import { View, Image, ViewProps } from "react-native";
import React from "react";

import Logo from "../../../../assets/servx_logo_md.png";

type Props = ViewProps & {};

const Header = ({ ...props }: Props) => {
  return (
    <View className="" {...props}>
      <Image className="" source={Logo} />
    </View>
  );
};

export default Header;
