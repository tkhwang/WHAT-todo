import { Timestamp } from "@react-native-firebase/firestore";

export interface IFirebaseBaseDoc {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
