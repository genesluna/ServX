import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export interface User {
  name?: string | null;
  email?: string | null;
  photoURL?: string | null;
  phoneNumber?: string | null;
  activeTenant?: {
    tenantId?: string | null;
    tenantName?: string | null;
  };
  createdAt?: FirebaseFirestoreTypes.FieldValue | null;
}
