import { View } from "react-native";
import { Dispatch, SetStateAction, useRef } from "react";
import { useTranslation } from "react-i18next";

import { IUserFS } from "@/types";
import Icon from "@/assets/icons";
import { appTheme } from "@/constants/uiConsts";

import Input from "../Input";
import SearchUserLists from "./search/SearchUserLists";
import Button from "../Button/Button";
import UserTypeSwitch from "./UserTypeSwitch";

interface Props {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  searchedUsers?: IUserFS[];
  selectedUsers: IUserFS[];
  setSelectedUsers: Dispatch<SetStateAction<IUserFS[]>>;
  setAreUsersSelected: Dispatch<SetStateAction<boolean>>;
  isUserTypeUser: boolean;
  toggleUserType: () => void;
}

export default function SearchAndSelectUsers({
  searchText,
  setSearchText,
  searchedUsers,
  selectedUsers,
  setSelectedUsers,
  setAreUsersSelected,
  isUserTypeUser,
  toggleUserType,
}: Props) {
  const { t } = useTranslation();

  const inputRef = useRef(null);

  const handlePressToCompleteToUsers = () => {
    setAreUsersSelected(true);
  };

  return (
    <>
      {/* User name search input */}
      <Input
        inputRef={inputRef}
        icon={<Icon name={"user"} size={26} strokeWidth={1.6} />}
        placeholder={t("title.expert.sendTodo.searchText.placeholder")}
        onChangeText={(value) => setSearchText(value)}
        autoCapitalize={"none"}
        value={searchText}
        fontSize={18}
      />

      {/* UserType select switch */}
      <View className={"flex flex-row items-center w-full justify-center"}>
        <UserTypeSwitch isUserTypeUser={isUserTypeUser} toggleUserType={toggleUserType} />
      </View>

      {/* Searched User */}
      <SearchUserLists
        searchText={searchText}
        searchedUsers={searchedUsers}
        setSelectedUsers={setSelectedUsers}
      />

      <View className={"flex flex-1"} />

      {/* Button CTA */}
      <Button
        title={t("sendTodo.cta.completeUsers-and-compose-todos")}
        color={appTheme.colors.primary}
        disabled={selectedUsers.length === 0}
        buttonStyle={{
          backgroundColor:
            selectedUsers.length === 0 ? appTheme.colors.gray : appTheme.colors.primary,
        }}
        onPress={handlePressToCompleteToUsers}
      />
    </>
  );
}
