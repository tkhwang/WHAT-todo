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

  const [searchText, setSearchText] = useState("");
  const [userType, setUserType] = useState<"user" | "supervisor">("user");
  const [selectedUsers, setSelectedUsers] = useState<IUserFS[]>([]);
  const [selectedSupervisors, setSelectedSupervisors] = useState<IUserFS[]>([]);

  const [areUsersSelectionDone, setAreUsersSelectionDone] = useState(false);

  const debouncedSearchText = useDebounce(searchText, SEARCH_USER_INPUT_DEBOUNCE_TIME);
  const { data: searchedUsers } = useSearchUsers(debouncedSearchText);

  const cleanupSelection = () => {
    setSearchText("");
    setSelectedUsers([]);
    setSelectedSupervisors([]);
    setAreUsersSelectionDone(false);
    setUserType("user");
  };

  const onBackPress = () => cleanupSelection();

  useEffect(() => {
    return () => {
      cleanupSelection();
    };
  }, []);

  return (
    <ScreenWrapper>
      <View className={"flex flex-1 flex-col p-4 gap-4"}>
        <Header title={t("title.expert.sendTodo")} showBackButton onBackPress={onBackPress} />
        {/* Title: Search User */}

        {/* Selected User */}
        <View className={"flex flex-col gap-2"}>
          <Text className={"text-xl font-semibold"}>{`${t("sendTodo.user.type.user")}:`}</Text>
          <SelectedUsers selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
        </View>

        {/* Selected Supervisors */}
        <View className={"flex flex-col gap-2"}>
          <Text
            className={"text-xl font-semibold"}
          >{`${t("sendTodo.user.type.supervisor")}:`}</Text>
          <SelectedUsers
            selectedUsers={selectedSupervisors}
            setSelectedUsers={setSelectedSupervisors}
          />
        </View>

        {!areUsersSelectionDone && (
          <SearchAndSelectUsers
            searchText={searchText}
            setSearchText={setSearchText}
            searchedUsers={searchedUsers}
            // user type
            userType={userType}
            setUserType={setUserType}
            // selectedUsers
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
            // selectedSupervisors
            selectedSupervisors={selectedSupervisors}
            setSelectedSupervisors={setSelectedSupervisors}
            // user selection one flag
            setAreUsersSelectionDone={setAreUsersSelectionDone}
          />
        )}
      </View>
    </ScreenWrapper>
  );
}
