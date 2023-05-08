import { View, Text, ToastAndroid } from "react-native";
import React, { useState } from "react";
import { Feather as Icon } from "@expo/vector-icons";

import colors from "../../../colors";
import Container from "../../components/common/Container";
import Button from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const EmailValidation = () => {
  const [isLoadingResend, setIsLoadingResend] = useState<boolean>(false);
  const [isLoadingVerify, setIsLoadingVerify] = useState<boolean>(false);
  const { authUser, reloadAuthUser } = useAuth();
  const navigation = useNavigation();

  async function handleResendEmail() {
    try {
      setIsLoadingResend(true);
      await authUser?.sendEmailVerification();
      ToastAndroid.show("E-mail reenviado.", ToastAndroid.LONG);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingResend(false);
    }
  }

  async function handeVerifyEmail() {
    try {
      setIsLoadingVerify(true);
      await reloadAuthUser();
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } catch (error) {
      console.log(error);
    } finally {
      if (authUser?.emailVerified) {
        ToastAndroid.show("O e-mail foi validado com sucesso.", ToastAndroid.LONG);
        navigation.reset({ index: 0, routes: [{ name: "tenant" }] });
      } else {
        ToastAndroid.show(
          "O e-mail ainda não pode ser validado. Tente novamente em alguns segundos",
          ToastAndroid.LONG
        );
      }
      setIsLoadingVerify(false);
    }
  }

  return (
    <Container>
      <View className="p-8 my-10 justify-center rounded-full bg-content-200 dark:bg-base-600">
        <Icon name="mail" size={50} color={colors.content[100]} />
      </View>

      <View className="flex-1  w-full">
        <Text className="text-base text-justify dark:text-content-100">
          Antes de cadastrar a sua empresa, acesse o seu e-mail e clique no link para confirmação do email informado.
        </Text>
        <Text className="text-base text-justify my-6 dark:text-content-100">Depois clique no botão abaixo:</Text>
        <Button
          type="accent"
          icon="check-circle"
          label="e-mail verificado"
          onPress={handeVerifyEmail}
          isLoading={isLoadingVerify}
        />
        <Text className="text-base text-justify my-6 dark:text-content-100">
          O e-mail pode estar na caixa de Span. Caso não o encontre, você pode solicitar o reenvio clicando no botão
          abaixo:
        </Text>
        <Button
          type="secondary"
          icon="mail"
          label="renviar e-mail"
          onPress={handleResendEmail}
          isLoading={isLoadingResend}
        />
      </View>
    </Container>
  );
};

export default EmailValidation;
