import { useAuth } from "../../context/AuthContext";
import Container from "../../components/common/Container";
import Text from "../../components/common/Text";

const Home = () => {
  const { appUser } = useAuth();

  return (
    <Container>
      <Text size="h2" className="text-center w-44">{`Seja bem-vindo, ${appUser?.name}`}</Text>
    </Container>
  );
};

export default Home;
