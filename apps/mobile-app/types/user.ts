import { Timestamp } from "@react-native-firebase/firestore";
import { IUserCommon } from "@whatTodo/models";

export interface IUserFS extends IUserCommon {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface IUserTaskFS extends IUserCommon {
  isDone: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
