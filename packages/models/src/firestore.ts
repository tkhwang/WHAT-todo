import { firebase } from "@react-native-firebase/firestore"

export const COLLECTIONS = {
  USERS: "users",
  TODOS: "todos",
}

export class FirestoreTimestamp extends firebase.firestore.Timestamp {}
