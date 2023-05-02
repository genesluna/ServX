import React, { useContext, useState, useEffect, ReactNode } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

type AuthContextProps = {
  children: ReactNode;
};

type AuthContextType = {
  currentUser: FirebaseAuthTypes.User | null;
  register: (email: string, password: string) => Promise<FirebaseAuthTypes.UserCredential>;
  login: (email: string, password: string) => Promise<FirebaseAuthTypes.UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
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
  /**
   * The current user object representing the authenticated user, or null if there is no user.
   */
  const [initializing, setInitializing] = useState<boolean>(true);
  /**
   * Indicates whether Firebase Authentication is currently initializing.
   */
  const [currentUser, setCurrentUser] = useState<FirebaseAuthTypes.User | null>(null);

  /**
   * Registers a new user with Firebase Authentication.
   *
   * @param email - The user's email address.
   * @param password - The user's password.
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
   * @returns A Promise that resolves with the user's credential after successful login.
   */
  function login(email: string, password: string): Promise<FirebaseAuthTypes.UserCredential> {
    return auth().signInWithEmailAndPassword(email, password);
  }

  /**
   * Logs out the currently authenticated user.
   *
   * @returns A Promise that resolves after successful logout.
   */
  function logout(): Promise<void> {
    return auth().signOut();
  }

  /**
   * Sends a password reset email to the provided email address.
   *
   * @param email - The email address associated with the user's account.
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
      setCurrentUser(user);
      if (initializing) setInitializing(false);
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  const values: AuthContextType = {
    currentUser,
    login,
    register,
    logout,
    resetPassword,
  };

  return <AuthContext.Provider value={values}>{!initializing && children}</AuthContext.Provider>;
}
