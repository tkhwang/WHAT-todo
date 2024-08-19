import { firestore } from "firebase-admin"

export const COLLECTIONS = {
  USERS: "users",
  TODOS: "todos",
}

export class FirestoreTimestamp extends firestore.Timestamp {}
