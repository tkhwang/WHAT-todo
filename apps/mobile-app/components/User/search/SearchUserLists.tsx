import { View } from "react-native";
import { Dispatch, SetStateAction } from "react";
import { useDebounce } from "@uidotdev/usehooks";

import { IUserFS } from "@/types";
import { useSearchUsers } from "@/hooks/queries/useSearchUsers";
import { SEARCH_USER_INPUT_DEBOUNCE_TIME } from "@/constants/appConsts";

import SearchUser from "./SearchUser";
import SearchUserSkeletonLists from "./SearchUserSkeletonLists";

interface Props {
  searchText?: string;
  setSearchText: Dispatch<SetStateAction<string>>;

  userType: "user" | "supervisor";
  setSelectedUsers: Dispatch<SetStateAction<IUserFS[]>>;
  setSelectedSupervisors: Dispatch<SetStateAction<IUserFS[]>>;
}

export default function SearchUserLists({
  searchText,
  setSearchText,
  userType,
  setSelectedUsers,
  setSelectedSupervisors,
}: Props) {
  const debouncedSearchText = useDebounce(searchText, SEARCH_USER_INPUT_DEBOUNCE_TIME);
  const { data: searchedUsers, isLoading } = useSearchUsers(debouncedSearchText);

  return (
    <View className={"flex flex-col gap-2"}>
      {searchText ? (
        isLoading ? (
          <SearchUserSkeletonLists />
        ) : (
          (searchedUsers ?? []).map((user: IUserFS, index: number) => (
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
        )
      ) : null}
    </View>
  );
}
