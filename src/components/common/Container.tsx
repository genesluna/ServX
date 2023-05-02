import { View, ViewProps } from "react-native";
import React from "react";

/**
 * A container component that centers its children and applies some base styling.
 *
 * @param {object} props - The props object.
 * @param {ReactNode} props.children - The child elements to be rendered inside the container.
 * @param {ViewProps} props.props - The additional props to be applied to the container view.
 * @returns {JSX.Element} - A container component with centered children and base styling.
 */
const Container = ({ children, ...props }: ViewProps): JSX.Element => {
  return (
    <View className="items-center justify-center flex-1 px-10 bg-base-100" {...props}>
      {children}
    </View>
  );
};

export default Container;
