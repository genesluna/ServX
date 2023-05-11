import { View, Dimensions } from "react-native";
import LottieView from "lottie-react-native";

import LottieSplash from "../../assets/splash_screen.json";
import Container from "../components/common/Container";

const size = Dimensions.get("window").width * 0.7;

const SplashScreen = () => {
  return (
    <Container>
      <LottieView source={LottieSplash} autoPlay resizeMode="contain" style={{ width: size, height: size }} />
    </Container>
  );
};

export default SplashScreen;
