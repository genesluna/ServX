import React, { ComponentProps, forwardRef, useState } from "react";
import { TextInput, View, Text, TextInputProps, ViewProps, TouchableOpacity } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import colors from "../../../colors";
import { styled } from "nativewind";

export type InputProps = TextInputProps & {
  label?: string;
  icon?: ComponentProps<typeof Icon>["name"];
  readOnly?: boolean;
  error?: string;
  touched?: boolean;
  isPassword?: boolean;
  inputStyle?: ViewProps["style"];
};

/**
 * A customizable input field component with optional label and icon
 *
 * @param label - Label text to be displayed above the input field
 * @param icon - Icon to be displayed at the left side of the input field
 * @param readOnly - Boolean flag to indicate if the input is editable
 * @param touched - Boolean flag to indicate if the input has been interacted with
 * @param error - Error message to be displayed below the input field when there's an error
 * @param isPassword - Boolean flag to indicate if the input field is for password
 * @param inputStyle - Additional styles to be applied to the input field
 *
 * @returns - A React styled Input component with customizable input fields
 */
const Input = forwardRef<TextInput, InputProps>(
  (
    { label, icon, readOnly = false, touched, error, isPassword = false, inputStyle, ...props }: InputProps,
    ref
  ): JSX.Element => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const validationIconColor = !touched ? colors.content[200] : error ? colors.error.focus : colors.primary.DEFAULT;
    const validationBorderColor = !touched ? "border-transparent" : error ? "border-error-focus" : "border-transparent";
    const readOnlyColor = readOnly ? "bg-base-150" : "bg-content-100";

    return (
      <View className="flex items-start mb-2" style={inputStyle}>
        {!!label && icon === undefined && <Text className="pb-1 pl-1">{label}</Text>}
        <View className={`flex-row items-center h-12 border-b-2 ${validationBorderColor} focus:border-primary`}>
          {!!icon && (
            <View className={`items-center justify-center h-full px-2 mr-1 w-11 ${readOnlyColor}`}>
              <Icon name={icon} size={16} color={validationIconColor} />
            </View>
          )}
          <View className={`justify-center flex-1 h-full pl-4 ${readOnlyColor}`}>
            <TextInput
              editable={!readOnly}
              underlineColorAndroid="transparent"
              placeholderTextColor={colors.content[200]}
              secureTextEntry={isPassword && !showPassword}
              ref={ref}
              {...props}
            />
          </View>
          {isPassword && !readOnly && (
            <TouchableOpacity
              className="items-center justify-center h-full px-4 bg-content-100"
              activeOpacity={1}
              onPress={() => {
                setShowPassword(!showPassword);
              }}
            >
              <Icon name={showPassword ? "eye-off" : "eye"} size={16} />
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
