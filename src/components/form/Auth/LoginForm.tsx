import React, { useRef } from "react";
import { GestureResponderEvent, TextInput, View, ViewProps } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";

import Button from "../../common/Button";
import Input from "../../common/Input";

type LoginFormProps = ViewProps & {
  onSubmit: (values: LoginFormValues) => Promise<void>;
  onRegister: (event: GestureResponderEvent) => void;
};

export type LoginFormValues = {
  email: string;
  password: string;
};

/**
 * A form for logging in users.
 *
 * @param onSubmit - The function that will be called when the form is submitted. Should return a promise.
 * @param onRegister - The function that will be called when the "register" button is pressed.
 *
 * @returns - A component that contains the login form.
 */
const LoginForm = ({ onSubmit, onRegister, ...props }: LoginFormProps): JSX.Element => {
  const password = useRef<TextInput>(null);

  const initialValues: LoginFormValues = { email: "", password: "" };

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Email inválido").required("Informe o email"),
    password: Yup.string().required("Informe a senha"),
  });

  const { handleChange, handleSubmit, handleBlur, values, errors, touched, isSubmitting } = useFormik({
    validationSchema: loginSchema,
    initialValues: initialValues,
    onSubmit: async (values) => {
      await onSubmit(values);
    },
  });

  return (
    <View className="w-full mt-6 mb-4" {...props}>
      <Input
        icon="mail"
        placeholder="Digite seu email"
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        keyboardAppearance="dark"
        returnKeyType="next"
        onChangeText={handleChange("email")}
        onBlur={handleBlur("email")}
        error={errors.email}
        touched={touched.email}
        value={values.email}
        onSubmitEditing={() => password.current?.focus()}
      />

      <Input
        ref={password}
        icon="lock"
        placeholder="Digite sua senha"
        isPassword={true}
        autoComplete="password"
        autoCapitalize="none"
        keyboardAppearance="dark"
        returnKeyType="done"
        onChangeText={handleChange("password")}
        onBlur={handleBlur("password")}
        error={errors.password}
        touched={touched.password}
        value={values.password}
        onSubmitEditing={() => handleSubmit()}
      />

      <Button
        className="mt-6"
        label="login"
        onPress={() => handleSubmit()}
        disabled={isSubmitting}
        isLoading={isSubmitting}
      />

      <Button className="mt-3 mb-10" type="secondary" label="registrar" onPress={onRegister} />
    </View>
  );
};

export default LoginForm;
