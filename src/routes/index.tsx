import { NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { UserRoutes } from "./user.routes";
import { useAuth } from "../context/AuthContext";

/**
 * A component that renders the appropriate set of routes based on the user's authentication status.
 * @returns {JSX.Element} The rendered React component.
 */
export function Routes(): JSX.Element {
  const { currentUser } = useAuth();
  console.log(currentUser);

  return (
    <NavigationContainer>
      {!currentUser && <AuthRoutes />}
      {currentUser && <UserRoutes />}
    </NavigationContainer>
  );
}
