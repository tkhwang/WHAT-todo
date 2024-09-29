import { Timestamp } from "@react-native-firebase/firestore";
import { IUserCommon } from "@whatTodo/models";

export interface IUserFS extends IUserCommon {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
