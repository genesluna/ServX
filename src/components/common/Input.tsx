import React, { forwardRef, useState } from "react";
import { TextInput, View, Text, TextInputProps, ViewProps, TouchableOpacity } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import colors from "../../../colors";
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
    const validationIconColor = !touched ? colors.content[200] : error ? colors.error.focus : colors.primary.DEFAULT;
    const validationBorderColor = !touched ? "border-transparent" : error ? "border-error-focus" : "border-transparent";

    return (
      <View className="flex items-start mb-2" style={inputStyle}>
        {!!label && icon == undefined && <Text className="pb-1 pl-1">{label}</Text>}
        <View className={`flex-row items-center h-12 border-b-2 ${validationBorderColor} focus:border-primary`}>
          {!!icon && (
            <View className="items-center justify-center h-full px-2 mr-1 bg-content-100 w-11">
              <Icon name={icon} size={16} color={validationIconColor} />
            </View>
          )}
          <View className="justify-center flex-1 h-full pl-4 bg-content-100">
            <TextInput
              className=""
              underlineColorAndroid="transparent"
              placeholderTextColor={colors.content[200]}
              secureTextEntry={isPassword && !showPassword}
              ref={ref}
              {...props}
            />
          </View>
          {isPassword && (
            <TouchableOpacity
              className="items-center justify-center h-full px-4 bg-content-100"
              activeOpacity={1}
              onPress={() => {
                setShowPassword(!showPassword);
              }}
            >
              <Icon name={showPassword ? "eye" : "eye-off"} size={16} />
            </TouchableOpacity>
          )}
        </View>
        {touched && error ? <Text className="pt-1 pl-3 text-error-focus">{error}</Text> : null}
      </View>
    );
  }
);

export default styled(Input, {
  props: {
    inputStyle: true,
  },
});
