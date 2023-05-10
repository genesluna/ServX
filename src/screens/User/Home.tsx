import { Text } from "react-native";
import React from "react";
import Button from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";
import Container from "../../components/common/Container";

const Home = () => {
  const { logout, appUser } = useAuth();

  async function handleLogout(): Promise<void> {
    try {
      return await logout();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <Text className="text-2xl my-6">{`Seja bem-vindo, ${appUser?.name}`}</Text>
      <Button icon="log-out" label="logout" onPress={handleLogout} />
    </Container>
  );
};

export default Home;
