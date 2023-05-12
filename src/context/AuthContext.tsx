import React, { useContext, useState, useEffect, ReactNode } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
//import * as SplashScreen from "expo-splash-screen";
import { usersCollection } from "../services/firestore/userService";
import { User } from "../models/User";
import SplashScreen from "../screens/SplashScreen";
import { tenantsCollection } from "../services/firestore/tenantService";
import { Tenant } from "../models/Tenant";

// Keep the splash screen visible while we initialize the app
// SplashScreen.preventAutoHideAsync();

type AuthContextProps = {
  children: ReactNode;
};

type AuthContextType = {
  authUser: FirebaseAuthTypes.User | null;
  appUser: User | undefined;
  tenant: Tenant | undefined;
  register: (email: string, password: string) => Promise<FirebaseAuthTypes.UserCredential>;
  login: (email: string, password: string) => Promise<FirebaseAuthTypes.UserCredential>;
  logout: () => Promise<void>;
  reloadAuthUser: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  isEmailVerified(): boolean | undefined;
};

/**
 * The authentication context object that is passed down through the component tree.
 */
const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

/**
 * A hook that returns the authentication context.
 *
 * @returns An object containing the current user object and the authentication functions.
 */
export function useAuth() {
  return useContext(AuthContext);
}

/**
 * Provides authentication context for the app using Firebase Authentication.
 *
 * @param children - ReactNode representing the child components to be rendered within the provider.
 * @returns A component that wraps the app with an authentication context.
 */
export function AuthProvider({ children }: AuthContextProps) {
  const [initializingAuthUser, setInitializingAuthUser] = useState<boolean>(true);
  const [initializingAppUser, setInitializingAppUser] = useState<boolean>(true);
  const [initializingTenant, setInitializingTenant] = useState<boolean>(true);
  const [authUser, setAuthUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [appUser, setAppUser] = useState<User | undefined>(undefined);
  const [tenant, setTenant] = useState<Tenant | undefined>(undefined);

  /**
   * Registers a new user with Firebase Authentication.
   *
   * @param email - The user's email address.
   * @param password - The user's password.
   *
   * @returns A Promise that resolves with the user's credential after successful registration.
   */
  function register(email: string, password: string): Promise<FirebaseAuthTypes.UserCredential> {
    return auth().createUserWithEmailAndPassword(email, password);
  }

  /**
   * Logs in a user with Firebase Authentication.
   *
   * @param email - The user's email address.
   * @param password - The user's password.
   *
   * @returns A Promise that resolves with the user's credential after successful login.
   */
  function login(email: string, password: string): Promise<FirebaseAuthTypes.UserCredential> {
    return auth().signInWithEmailAndPassword(email, password);
  }

  /**
   * Reloads currently authenticated user.
   *
   * @returns A Promise that resolves after successful reload.
   */
  async function reloadAuthUser(): Promise<void> {
    await auth().currentUser?.reload();
    setAuthUser(auth().currentUser);
  }

  function isEmailVerified(): boolean | undefined {
    return auth().currentUser?.emailVerified;
  }

  /**
   * Logs out the currently authenticated user.
   *
   * @returns A Promise that resolves after successful logout.
   */
  function logout(): Promise<void> {
    if (appUser) setAppUser(undefined);
    if (tenant) setTenant(undefined);
    return auth().signOut();
  }

  /**
   * Sends a password reset email to the provided email address.
   *
   * @param email - The email address associated with the user's account.
   *
   * @returns A Promise that resolves after the password reset email has been sent.
   */
  function resetPassword(email: string): Promise<void> {
    return auth().sendPasswordResetEmail(email);
  }

  /**
   * Sets up an observer to listen for changes in the user's authentication state.
   *
   * @returns A function to unsubscribe the observer when the component unmounts.
   */
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      setAuthUser(user);
      if (initializingAuthUser) setInitializingAuthUser(false);
    });

    return subscriber; // unsubscribe on unmount
  }, []);

  /**
   * Sets up an observer to listen for changes in the user's document state.
   *
   * @returns A function to unsubscribe the observer when the component unmounts.
   */
  useEffect(() => {
    const subscriber = usersCollection.doc(authUser?.uid).onSnapshot(
      (documentSnapshot) => {
        if (documentSnapshot.exists) {
          setAppUser(documentSnapshot.data());
          if (initializingAppUser) setInitializingAppUser(false);
        }
      },
      (error) => {
        if (appUser) setAppUser(undefined);
        if (initializingAppUser) setInitializingAppUser(false);
        console.log("[User Snapshop] - No logged in user to start listening to.");
      }
    );

    return subscriber; // unsubscribe on unmount
  }, [authUser?.uid]);

  /**
   * Sets up an observer to listen for changes in the tenants's document state.
   *
   * @returns A function to unsubscribe the observer when the component unmounts.
   */
  useEffect(() => {
    const subscriber = tenantsCollection.doc(appUser?.activeTenant?.tenantId ?? undefined).onSnapshot(
      (documentSnapshot) => {
        if (documentSnapshot.exists) {
          setTenant(documentSnapshot.data());
          if (initializingTenant) setInitializingTenant(false);
        }
      },
      (error) => {
        if (tenant) setTenant(undefined);
        if (initializingTenant) setInitializingTenant(false);
        console.log("[Tenant Snapshop] - No logged in user to start listening to its tenant.");
      }
    );

    return subscriber; // unsubscribe on unmount
  }, [appUser?.activeTenant?.tenantId]);

  const values: AuthContextType = {
    authUser,
    appUser,
    tenant,
    login,
    register,
    logout,
    reloadAuthUser,
    resetPassword,
    isEmailVerified,
  };

  return (
    <AuthContext.Provider value={values}>
      {!initializingAuthUser && !initializingAppUser && !initializingTenant ? children : <SplashScreen />}
    </AuthContext.Provider>
  );
}
