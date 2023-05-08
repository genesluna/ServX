import React from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ToastAndroid, TouchableWithoutFeedback } from "react-native";

import { useAuth } from "../../context/AuthContext";
import RegisterForm, { RegisterFormValues } from "../../components/form/Auth/RegisterForm";
import Header from "../../components/form/Auth/Header";
import Container from "../../components/common/Container";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const { register, reloadAuthUser } = useAuth();
  const navigation = useNavigation();

  async function handleRegister({ name, email, password }: RegisterFormValues) {
    try {
      let result = await register(email, password);
      await result.user.updateProfile({ displayName: name });
      await reloadAuthUser();
      navigation.reset({ index: 0, routes: [{ name: "tenant" }] });
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        ToastAndroid.showWithGravity("Este email já está cadastrado", ToastAndroid.LONG, ToastAndroid.TOP);
      }

      if (error.code === "auth/invalid-email") {
        ToastAndroid.showWithGravity("Email inválido", ToastAndroid.LONG, ToastAndroid.TOP);
      }

      console.log(error);
    }
  }

  return (
    <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header />
          <RegisterForm onSubmit={handleRegister} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Register;
