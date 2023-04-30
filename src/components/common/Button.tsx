import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import colors from "tailwindcss/colors";

type Props = TouchableOpacityProps & {
  label: string;
  bgColor?: string;
  labelColor?: string;
  isLoading?: boolean;
  loadingColor?: string;
};

const Button = ({
  label,
  bgColor = "bg-orange-400",
  labelColor = "text-white",
  isLoading = false,
  loadingColor = colors.white,
  ...props
}: Props) => {
  return (
    <TouchableOpacity
      className={`flex-row items-center justify-center w-full py-3 ${bgColor}`}
      activeOpacity={0.7}
      {...props}
    >
      {isLoading && <ActivityIndicator className="mr-2" size="small" color={loadingColor} />}
      <Text className={`text-base font-bold tracking-widest uppercase ${labelColor}`}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;
