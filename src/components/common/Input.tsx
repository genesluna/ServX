import React, { forwardRef, useState } from "react";
import { TextInput, View, Text, TextInputProps, ViewProps, TouchableOpacity } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { styled } from "nativewind";

type Props = TextInputProps & {
  label?: string;
  icon?: any;
  error?: any;
  touched?: boolean;
  isPassword?: boolean;
  inputStyle?: ViewProps["style"];
};

const Input = forwardRef(
  ({ label, icon, touched, error, isPassword = false, inputStyle, ...props }: Props, ref: any) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const validationIconColor = !touched ? colors.slate[600] : error ? colors.red[600] : colors.slate[600];
    const validationBorderColor = !touched ? "border-transparent" : error ? "border-red-600" : "border-transparent";

    return (
      <View className="flex items-start mb-2" style={inputStyle}>
        {!!label && icon == undefined && <Text className="pb-1 pl-1">{label}</Text>}
        <View className={`flex-row items-center h-12 border-b-2 ${validationBorderColor} focus:border-orange-500`}>
          {!!icon && (
            <View className="items-center justify-center h-full px-2 mr-1 bg-white w-11">
              <Icon name={icon} size={16} color={validationIconColor} />
            </View>
          )}
          <View className="justify-center flex-1 h-full pl-4 bg-white">
            <TextInput
              className=""
              underlineColorAndroid="transparent"
              placeholderTextColor={colors.slate[500]}
              secureTextEntry={isPassword && !showPassword}
              ref={ref}
              {...props}
            />
          </View>
          {isPassword && (
            <TouchableOpacity
              className="items-center justify-center h-full px-4  bg-white"
              activeOpacity={1}
              onPress={() => {
                setShowPassword(!showPassword);
              }}
            >
              <Icon name={showPassword ? "eye" : "eye-off"} size={16} />
            </TouchableOpacity>
          )}
        </View>
        {touched && error ? <Text className="pt-1 pl-3 text-red-600">{error}</Text> : null}
      </View>
    );
  }
);

export default styled(Input, {
  props: {
    inputStyle: true,
  },
});
