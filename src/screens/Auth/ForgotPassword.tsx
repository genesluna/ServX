import { Keyboard, KeyboardAvoidingView, Platform, ToastAndroid, TouchableWithoutFeedback } from "react-native";

import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import Container from "../../components/common/Container";
import ForgotPasswordForm, { ForgotPaswordFormValues } from "../../components/form/Auth/ForgotPasswordForm";

const ForgotPassword = () => {
  const navigation = useNavigation();
  const { resetPassword } = useAuth();

  async function handleLogin({ email }: ForgotPaswordFormValues): Promise<void> {
    try {
      await resetPassword(email);
      ToastAndroid.show("E-mail enviado com sucesso.", ToastAndroid.LONG);
      navigation.goBack();
    } catch (error) {
      ToastAndroid.show("Email inválido", ToastAndroid.LONG);
      console.log(error);
    }
  }

  return (
    <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <ForgotPasswordForm onSubmit={handleLogin} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
