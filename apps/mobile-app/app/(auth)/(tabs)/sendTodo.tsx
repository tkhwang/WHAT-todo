/* eslint-disable react/no-array-index-key */
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

import { Text } from "@/components/ui/text";
import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import Header from "@/components/MainLayout/Header";
import { useSearchUsers } from "@/hooks/queries/useSearchUsers";
import { SEARCH_USER_INPUT_DEBOUNCE_TIME } from "@/constants/appConsts";
import { IUserFS } from "@/types";
import SelectedUsers from "@/components/User/select/SelectedUsers";
import SearchAndSelectUsers from "@/components/User/SearchAndSelectUsers";

export default function SendTodo() {
  const { t } = useTranslation();

  const [areUsersSelected, setAreUsersSelected] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<IUserFS[]>([]);

  const debouncedSearchText = useDebounce(searchText, SEARCH_USER_INPUT_DEBOUNCE_TIME);
  const { data: searchedUsers } = useSearchUsers(debouncedSearchText);

  const onBackPress = () => setSearchText("");

  useEffect(() => {
    return () => {
      setSearchText("");
      setSelectedUsers([]);
    };
  }, []);

  return (
    <ScreenWrapper>
      <View className={"flex flex-1 flex-col p-4 gap-4"}>
        <Header title={t("title.expert.sendTodo")} showBackButton onBackPress={onBackPress} />

        {/* Title: Search User */}
        <Text className={"text-xl font-semibold"}>
          {`${t("title.expert.sendTodo.select.user.text")}:`}
        </Text>

        {/* Selected Users */}
        <SelectedUsers selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />

        {!areUsersSelected && (
          <SearchAndSelectUsers
            searchText={searchText}
            setSearchText={setSearchText}
            searchedUsers={searchedUsers}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
            setAreUsersSelected={setAreUsersSelected}
          />
        )}
      </View>
    </ScreenWrapper>
  );
}
