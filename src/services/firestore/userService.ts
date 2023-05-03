import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { User } from "../../models/User";

const usersCollection = firestore().collection("Users") as FirebaseFirestoreTypes.CollectionReference<User>;

export function createUser(user: FirebaseAuthTypes.User): Promise<void> {
  return usersCollection.doc(user.uid).set({
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    phoneNumber: user.phoneNumber,
  });
}
