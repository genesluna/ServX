import { Keyboard, KeyboardAvoidingView, Platform, ToastAndroid, TouchableWithoutFeedback } from "react-native";

import { useAuth } from "../../context/AuthContext";
import LoginForm, { LoginFormValues } from "../../components/form/Auth/LoginForm";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/form/Auth/Header";
import Container from "../../components/common/Container";
import { useEffect } from "react";

const Login = () => {
  const navigation = useNavigation();
  const { login, authUser } = useAuth();

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
      await login(email, password);
      // TODO: handle unfinished registration during new login
    } catch (error) {
      ToastAndroid.showWithGravity("Email ou senha incorretos", ToastAndroid.LONG, ToastAndroid.TOP);
      console.log(error);
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
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
