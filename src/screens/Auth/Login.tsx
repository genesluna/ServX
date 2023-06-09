import { Keyboard, KeyboardAvoidingView, Platform, ToastAndroid, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";
import LoginForm, { LoginFormValues } from "../../components/form/Auth/LoginForm";
import Header from "../../components/form/Auth/Header";
import Container from "../../components/common/Container";

const Login = () => {
  const [isGoogleSinginLoading, setIsGoolgeSigninLoaging] = useState<boolean>(false);
  const navigation = useNavigation();
  const { login, loginWithGoogle, authUser } = useAuth();

  useEffect(() => {
    // Handles unfinished registration when the user is still logged in and restarts the app
    if (authUser) {
      if (authUser.emailVerified) {
        navigation.reset({ index: 0, routes: [{ name: "tenantRegister" }] });
      } else {
        navigation.reset({ index: 0, routes: [{ name: "emailValidation" }] });
      }
    }
  }, []);

  function openRegisterScreen() {
    navigation.navigate("register");
  }

  function openForgotPasswordScreen() {
    navigation.navigate("forgotPassword");
  }

  async function handleLogin({ email, password }: LoginFormValues) {
    try {
      await login(email.trim(), password.trim());
      // TODO: handle unfinished registration during new login
    } catch (error) {
      ToastAndroid.showWithGravity("Email ou senha incorretos", ToastAndroid.LONG, ToastAndroid.TOP);
      console.log(error);
    }
  }

  async function handleGoogleSignin() {
    try {
      setIsGoolgeSigninLoaging(true);
      const result = await loginWithGoogle();
      if (result.additionalUserInfo?.isNewUser) {
        ToastAndroid.show("Usuário cadastrado com sucesso.", ToastAndroid.LONG);
        navigation.reset({ index: 0, routes: [{ name: "tenantRegister" }] });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsGoolgeSigninLoaging(false);
    }
  }

  return (
    <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header />
          <LoginForm
            onSubmit={handleLogin}
            onRegister={openRegisterScreen}
            onForgotPassword={openForgotPasswordScreen}
            onGoogleSingin={handleGoogleSignin}
            isGoogleSinginLoading={isGoogleSinginLoading}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
