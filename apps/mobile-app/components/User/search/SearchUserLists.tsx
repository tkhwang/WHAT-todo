import { View } from "react-native";
import { Dispatch, SetStateAction } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useTranslation } from "react-i18next";

import { Text } from "@/components/ui/text";
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
  const { t } = useTranslation();

  const debouncedSearchText = useDebounce(searchText, SEARCH_USER_INPUT_DEBOUNCE_TIME);
  const { data: searchedUsers, isLoading } = useSearchUsers(debouncedSearchText);

  return (
    <View className={"flex flex-col gap-2 flex-1"}>
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
      ) : (
        <View className={"items-center justify-center flex-1"}>
          <Text className={"text-center"}>{t("sendTodo.search.placeholder")}</Text>
        </View>
      )}
    </View>
  );
}
