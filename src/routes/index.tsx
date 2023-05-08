import { NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { UserRoutes } from "./user.routes";
import { useAuth } from "../context/AuthContext";

/**
 * A component that renders the appropriate set of routes based on the user's authentication status.
 *
 * @returns The appropriate rendered React component.
 */
export function Routes(): JSX.Element {
  const { appUser, authUser } = useAuth();

  return (
    <NavigationContainer>
      {!appUser && <AuthRoutes />}
      {appUser && authUser && <UserRoutes />}
    </NavigationContainer>
  );
}
