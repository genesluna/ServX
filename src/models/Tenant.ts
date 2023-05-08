import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export interface Tenant {
  name?: string | null;
  email?: string | null;
  photoURL?: string | null;
  phoneNumber?: string | null;
  createdBy?: string | null;
  createdAt?: FirebaseFirestoreTypes.FieldValue | null;
}

export interface Memberships {
  tenantName?: string | null;
  tenantId?: string | null;
  name?: string | null;
  role?: string | null;
  active?: boolean | null;
}
