import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { Memberships, Tenant } from "../../models/Tenant";

export const tenantsCollection = firestore().collection(
  "tenants"
) as FirebaseFirestoreTypes.CollectionReference<Tenant>;

function membershipCollection(tenantId: string): FirebaseFirestoreTypes.CollectionReference<Memberships> {
  return firestore().collection(
    `tenants/${tenantId}/memberships`
  ) as FirebaseFirestoreTypes.CollectionReference<Memberships>;
}

export function createTenant(tenant: Tenant) {
  return tenantsCollection.add({
    ...tenant,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
}

export function createMembership(membership: Memberships, tenantId: string, userId: string) {
  return membershipCollection(tenantId)
    .doc(userId)
    .set({
      ...membership,
    });
}

export function updateTenant(tenant: Tenant) {
  return tenantsCollection.add({
    ...tenant,
  });
}
