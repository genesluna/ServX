import { View, ViewProps } from "react-native";
import React from "react";

const Container = ({ children, ...props }: ViewProps) => {
  return (
    <View className="items-center justify-center flex-1 px-10 bg-base-100" {...props}>
      {children}
    </View>
  );
};

export default Container;
