import { Keyboard, KeyboardAvoidingView, Platform, ToastAndroid, TouchableWithoutFeedback } from "react-native";

import { useAuth } from "../../context/AuthContext";
import LoginForm, { LoginFormValues } from "../../components/form/Auth/LoginForm";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/form/Auth/Header";
import Container from "../../components/common/Container";

const Login = () => {
  const navigation = useNavigation();
  const { login } = useAuth();

  function openRegisterScreen() {
    navigation.navigate("register");
  }

  async function handleLogin({ email, password }: LoginFormValues) {
    try {
      await login(email, password);
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
          <LoginForm onSubmit={handleLogin} onRegister={openRegisterScreen} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
