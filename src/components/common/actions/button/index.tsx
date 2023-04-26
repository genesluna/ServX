import { Text, TouchableOpacity, View } from "react-native";
import React from "react";

type Props = {
  label: string;
  disabled?: boolean;
  color?: string;
  labelColor?: string;
  className?: string;
  onPress?(): void;
  [x: string]: any;
};

const Button = ({
  label,
  disabled = false,
  color = "bg-orange-500",
  labelColor = "text-white",
  className,
  onPress,
  ...props
}: Props) => {
  return (
    <TouchableOpacity
      className={`items-center justify-center w-full py-3 rounded-lg ${color} ${className}`}
      activeOpacity={0.7}
      disabled={disabled}
      onPress={onPress}
      {...props}
    >
      <Text className={`text-base font-bold tracking-widest uppercase ${labelColor}`}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;
