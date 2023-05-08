import { View, Text } from "react-native";
import React, { useState } from "react";
import Container from "../../components/common/Container";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/common/Button";
import { createUser } from "../../services/firestore/userService";
import { createMembership, createTenant } from "../../services/firestore/tenantService";

type Props = {};

const TenantRegister = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { authUser, logout, reloadAuthUser } = useAuth();

  async function handleTenantRegister() {
    try {
      setIsLoading(true);
      const result = await createTenant({
        name: "Manutenção Express",
        email: "sac@manutencaoexpress.com.br",
        createdBy: authUser?.uid,
      });
      await createUser(
        {
          name: authUser?.displayName,
          email: authUser?.email!,
          activeTenant: { tenantId: result.id, tenantName: "Manutenção Express" },
        },
        authUser?.uid!
      );
      return await createMembership(
        {
          tenantId: result.id,
          tenantName: "Manutenção Express",
          name: authUser?.displayName,
          active: true,
          role: "admin",
        },
        result.id,
        authUser?.uid!
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleVerifyEmail() {
    try {
      setIsLoading(true);
      await reloadAuthUser();
      if (authUser?.emailVerified) {
        console.log("Email verificado");
      } else {
        console.log("Email não verificado");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Text className="text-3xl">Tenant</Text>
      <Button label="cadastrar" onPress={handleTenantRegister} isLoading={isLoading} />
      <Button className="mt-4" label="logout" onPress={logout} />
      <Button className="mt-4" label="Veificar email" onPress={handleVerifyEmail} isLoading={isLoading} />
    </Container>
  );
};

export default TenantRegister;
