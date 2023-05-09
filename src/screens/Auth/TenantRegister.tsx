import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import React from "react";

import Container from "../../components/common/Container";
import { useAuth } from "../../context/AuthContext";
import { createUser } from "../../services/firestore/userService";
import { createMembership, createTenant } from "../../services/firestore/tenantService";
import TenantRegisterForm, { TenantRegisterFormValues } from "../../components/form/Auth/TenantRegisterForm";

const TenantRegister = () => {
  const { authUser } = useAuth();

  async function handleTenantRegister(data: TenantRegisterFormValues) {
    try {
      const result = await createTenant({
        name: data.name,
        email: data.email,
        phoneNumber: data.phone,
        createdBy: authUser?.uid,
      });
      await createUser(
        {
          name: authUser?.displayName,
          email: authUser?.email!,
          activeTenant: { tenantId: result.id, tenantName: data.name },
        },
        authUser?.uid!
      );
      return await createMembership(
        {
          tenantId: result.id,
          tenantName: data.name,
          name: authUser?.displayName,
          active: true,
          role: "admin",
        },
        result.id,
        authUser?.uid!
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <TenantRegisterForm onSubmit={handleTenantRegister} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default TenantRegister;
