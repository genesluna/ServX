import { View, Text } from "react-native";
import React from "react";
import Button from "../components/common/Button";
import { useAuth } from "../context/AuthContext";
import Container from "../components/common/Container";
import Input from "../components/common/Input";

type Props = {};

const Home = (props: Props) => {
  const { logout } = useAuth();
  return (
    <Container>
      <Text className="text-4xl">Home</Text>
      <Button icon="log-out" label="logout" onPress={logout} />
    </Container>
  );
};

export default Home;
