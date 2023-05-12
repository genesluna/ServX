import { View, TextInput, ViewProps } from "react-native";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import React, { useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import Button from "../../common/Button";
import Input from "../../common/Input";
import colors from "../../../../colors";
import Text from "../../common/Text";
import MaskedInput from "../../common/MaskedInput";

type TenantRegisterFormProps = ViewProps & {
  onSubmit: (values: TenantRegisterFormValues) => Promise<void>;
};

export type TenantRegisterFormValues = {
  name: string;
  phone: string;
  email: string;
};

const TenantRegisterForm = ({ onSubmit, ...props }: TenantRegisterFormProps) => {
  const phone = useRef<TextInput>(null);
  const email = useRef<TextInput>(null);

  const initialValues: TenantRegisterFormValues = { name: "", phone: "", email: "" };

  const tenantRegistrationSchema = Yup.object().shape({
    name: Yup.string().required("Informe o nome da empresa"),
    phone: Yup.string().required("Informe o telefone da empresa").min(14, "Número inválido"),
    email: Yup.string().email("Email inválido").required("Informe o email da empresa"),
  });

  const { handleChange, handleSubmit, handleBlur, values, errors, touched, isSubmitting } = useFormik({
    validationSchema: tenantRegistrationSchema,
    initialValues: initialValues,
    onSubmit: async (values) => {
      await onSubmit(values);
    },
  });

  return (
    <View className="items-center justify-end flex-1 w-full" {...props}>
      <View className="justify-center p-8 my-10 rounded-full bg-base-400 dark:bg-base-600">
        <Icon name="add-business" size={50} color={colors.content[100]} />
      </View>

      <Text size="sm" className="w-full mb-8 text-justify">
        Esse é um cadastro básico da empresa. Você poderá adicionar mais informações, como CNPJ, endereço, logotipo,
        etc., no menu de configurações do aplicativo.
      </Text>

      <Input
        icon="briefcase"
        autoCapitalize="words"
        autoComplete="name"
        placeholder="Digite o nome da empresa"
        keyboardAppearance="dark"
        keyboardType="default"
        returnKeyType="next"
        onChangeText={handleChange("name")}
        onBlur={handleBlur("name")}
        error={errors.name}
        touched={touched.name}
        value={values.name}
        onSubmitEditing={() => phone.current?.focus()}
      />
      <MaskedInput
        ref={phone}
        icon="phone"
        mask="PHONE"
        placeholder="Digite o telefone da empresa"
        keyboardAppearance="dark"
        keyboardType="numeric"
        returnKeyType="next"
        onChangeMask={handleChange("phone")}
        onBlur={handleBlur("phone")}
        error={errors.phone}
        touched={touched.phone}
        value={values.phone}
        onSubmitEditing={() => email.current?.focus()}
      />
      <Input
        ref={email}
        icon="mail"
        placeholder="Digite o e-mail da empresa"
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        keyboardAppearance="dark"
        returnKeyType="done"
        onChangeText={handleChange("email")}
        onBlur={handleBlur("email")}
        error={errors.email}
        touched={touched.email}
        value={values.email}
        onSubmitEditing={() => handleSubmit()}
      />

      <Button
        icon="file-text"
        className="w-full my-6"
        label="registrar empresa"
        onPress={() => handleSubmit()}
        disabled={isSubmitting}
        isLoading={isSubmitting}
      />

      {/* KeyboardAvoidingView fix */}
      <View className="flex-1" />
    </View>
  );
};

export default TenantRegisterForm;
