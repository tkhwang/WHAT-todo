import { View } from "react-native";
import { Dispatch, SetStateAction } from "react";

import { IUserFS } from "@/types";

import SearchUser from "./SearchUser";

interface Props {
  searchText?: string;
  searchedUsers?: IUserFS[];
  setSelectedUsers: Dispatch<SetStateAction<IUserFS[]>>;
}

export default function SearchUserLists({ searchText, searchedUsers, setSelectedUsers }: Props) {
  return (
    <View className={"flex flex-col gap-2"}>
      {searchText
        ? (searchedUsers ?? []).map((user: IUserFS, index: number) => (
            <SearchUser
              key={`${user.id}`}
              index={index}
              searchedUser={user}
              setSelectedUsers={setSelectedUsers}
            />
          ))
        : null}
    </View>
  );
}
