import { Timestamp } from "@react-native-firebase/firestore";
import { ITaskCommon } from "@whatTodo/models";

export interface ITaskFS extends ITaskCommon {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
