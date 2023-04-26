import React, { useRef } from "react";
import { Image, View } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";

import Logo from "../../../assets/servx_logo_md.png";
import TextInput from "../../components/common/form/text-input";
import Button from "../../components/common/actions/button";

type Props = {};

type FormValues = {
  email: string;
  password: string;
};

const LoginSreen = (props: Props) => {
  const password = useRef<any>(null);

  const initialValues: FormValues = { email: "", password: "" };

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Email inválido").required("Informe o email"),
    password: Yup.string().required("Informe a senha"),
  });

  const { handleChange, handleSubmit, handleBlur, values, errors, touched, isSubmitting } = useFormik({
    validationSchema: loginSchema,
    initialValues: { ...initialValues },
    onSubmit: (values) => alert(`Email: ${values.email}, Password: ${values.password}`),
  });

  return (
    <View className="items-center justify-center flex-1 px-10 bg-slate-100">
      <Image className="mb-4" source={Logo} />

      <TextInput
        className="mb-3"
        icon="mail"
        placeholder="Digite seu email"
        autoCapitalize="none"
        autoCompleteType="email"
        keyboardType="email-address"
        keyboardAppearance="dark"
        returnKeyType="next"
        onChangeText={handleChange("email")}
        onBlur={handleBlur("email")}
        error={errors.email}
        touched={touched.email}
        onSubmitEditing={() => password.current?.focus()}
      />
      <TextInput
        className="mb-4"
        ref={password}
        icon="key"
        placeholder="Digite sua senha"
        secureTextEntry
        autoCompleteType="password"
        autoCapitalize="none"
        keyboardAppearance="dark"
        returnKeyType="done"
        onChangeText={handleChange("password")}
        onBlur={handleBlur("password")}
        error={errors.password}
        touched={touched.password}
        onSubmitEditing={() => handleSubmit()}
      />

      <Button className="mt-6" label="login" onPress={() => handleSubmit()} disabled={isSubmitting} />
      <Button className="mt-3" label="registrar" color="bg-slate-300" labelColor="text-black" />
    </View>
  );
};

export default LoginSreen;
