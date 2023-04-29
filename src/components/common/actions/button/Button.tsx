import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import React from "react";

type Props = {
  label: string;
  disabled?: boolean;
  color?: string;
  labelColor?: string;
  className?: string;
  isLoading?: boolean;
  loadingColor?: string;
  onPress?(): void;
  [x: string]: any;
};

const Button = ({
  label,
  disabled = false,
  color = "bg-orange-500",
  labelColor = "text-white",
  isLoading = false,
  loadingColor = "#FFF",
  className,
  onPress,
  ...props
}: Props) => {
  return (
    <TouchableOpacity
      className={`flex-row items-center justify-center w-full py-3 rounded-lg ${color} ${className}`}
      activeOpacity={0.7}
      disabled={disabled}
      onPress={onPress}
      {...props}
    >
      {isLoading && <ActivityIndicator className="mr-2" size="small" color={loadingColor} />}
      <Text className={`text-base font-bold tracking-widest uppercase ${labelColor}`}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;
