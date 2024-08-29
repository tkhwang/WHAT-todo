import { Timestamp } from "@react-native-firebase/firestore";
import { IListCommon } from "@whatTodo/models";

export interface IListFS extends IListCommon {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
