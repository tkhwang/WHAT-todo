import { View } from "react-native";
import { Dispatch, SetStateAction } from "react";

import { IUserFS } from "@/types";

import SelectedUser from "./SelectedUser";

interface Props {
  selectedUsers: IUserFS[];
  setSelectedUsers: Dispatch<SetStateAction<IUserFS[]>>;
}

export default function SelectedUsers({ selectedUsers, setSelectedUsers }: Props) {
  return (
    <View className={"flex-row flex-wrap"}>
      {selectedUsers.map((user) => (
        <SelectedUser key={user.id} selectedUser={user} setSelectedUsers={setSelectedUsers} />
      ))}
    </View>
  );
}
