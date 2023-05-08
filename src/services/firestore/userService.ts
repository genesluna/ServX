import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { User } from "../../models/User";

export const usersCollection = firestore().collection("users") as FirebaseFirestoreTypes.CollectionReference<User>;

export function createUser(user: User, userId: string): Promise<void> {
  return usersCollection.doc(userId).set({
    ...user,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
}
export function updateUser(user: User) {
  return usersCollection.add({
    ...user,
  });
}
