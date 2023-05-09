import { View, ToastAndroid } from "react-native";
import React, { useState } from "react";
import { Feather as Icon } from "@expo/vector-icons";

import colors from "../../../colors";
import Container from "../../components/common/Container";
import Button from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import Text from "../../components/common/Text";

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
        navigation.reset({ index: 0, routes: [{ name: "tenantRegister" }] });
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
      <View className="justify-center p-8 my-10 rounded-full bg-base-400 dark:bg-base-600">
        <Icon name="mail" size={50} color={colors.content[100]} />
      </View>

      <View className="flex-1 w-full">
        <Text size="base" className="text-justify">
          Antes de cadastrar a sua empresa, acesse o seu e-mail e clique no link para confirmação do email informado.
        </Text>
        <Text size="base" className="my-6 text-justify">
          Depois clique no botão abaixo:
        </Text>
        <Button
          type="accent"
          icon="check-circle"
          label="e-mail verificado"
          onPress={handeVerifyEmail}
          isLoading={isLoadingVerify}
        />
        <Text size="base" className="my-6 text-justify">
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
