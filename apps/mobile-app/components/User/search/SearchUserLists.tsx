import { View } from "react-native";
import { Dispatch, SetStateAction } from "react";

import { IUserFS } from "@/types";

import SearchUser from "./SearchUser";

interface Props {
  searchText?: string;
  setSearchText: Dispatch<SetStateAction<string>>;

  userType: "user" | "supervisor";
  searchedUsers?: IUserFS[];
  setSelectedUsers: Dispatch<SetStateAction<IUserFS[]>>;
  setSelectedSupervisors: Dispatch<SetStateAction<IUserFS[]>>;
}

export default function SearchUserLists({
  searchText,
  setSearchText,
  userType,
  searchedUsers,
  setSelectedUsers,
  setSelectedSupervisors,
}: Props) {
  return (
    <View className={"flex flex-col gap-2"}>
      {searchText
        ? (searchedUsers ?? []).map((user: IUserFS, index: number) => (
            <SearchUser
              key={`${user.id}`}
              index={index}
              searchedUser={user}
              setSearchText={setSearchText}
              userType={userType}
              setSelectedUsers={setSelectedUsers}
              setSelectedSupervisors={setSelectedSupervisors}
            />
          ))
        : null}
    </View>
  );
}
