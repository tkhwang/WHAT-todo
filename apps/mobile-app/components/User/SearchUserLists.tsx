import { View } from "react-native";

import { IUserFS } from "@/types";

import SearchUser from "./SearchUser";

interface Props {
  searchText?: string;
  searchedUsers?: IUserFS[];
}

export default function SearchUserLists({ searchText, searchedUsers }: Props) {
  return (
    <View className={"flex flex-col"}>
      {searchText
        ? (searchedUsers ?? []).map((user: IUserFS, index: number) => (
            <SearchUser key={`${user.id}`} index={index} searchedUser={user} />
          ))
        : null}
    </View>
  );
}
