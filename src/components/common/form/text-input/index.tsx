import React, { forwardRef } from "react";
import { TextInput as RNTextInput, View, Text } from "react-native";
import { Entypo as Icon } from "@expo/vector-icons";

type Props = {
  icon?: any;
  error?: any;
  touched?: boolean;
  [x: string]: any;
};

const TextInput = forwardRef(({ icon, touched, error, ...props }: Props, ref: any) => {
  const validationIconColor = !touched ? "#223e4b" : error ? "#FF5A5F" : "#223e4b";
  const validationBorderColor = !touched ? "border-slate-400" : error ? "border-red-400" : "border-slate-400";

  return (
    <View className={`flex items-start mb-2 ${props.className}`}>
      <View className={`flex-row items-center h-12 p-2 border rounded-lg bg-white ${validationBorderColor}`}>
        <View className="p-2">
          <Icon name={icon} size={16} color={validationIconColor} />
        </View>
        <View className="flex-1">
          <RNTextInput
            underlineColorAndroid="transparent"
            placeholderTextColor="rgba(34, 62, 75, 0.7)"
            ref={ref}
            {...props}
          />
        </View>
      </View>
      {touched && error ? <Text className="pt-1 pl-3 text-red-600">{error}</Text> : null}
    </View>
  );
});

export default TextInput;
