import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { Dispatch, SetStateAction, useRef } from "react";
import { useTranslation } from "react-i18next";

import { IUserFS } from "@/types";
import Icon from "@/assets/icons";

import Input from "../../../Input";
import SearchUserLists from "../../../User/search/SearchUserLists";
import UserTypeSwitch from "../../../User/UserTypeSwitch";

interface Props {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  userType: "user" | "supervisor";
  setUserType: (userType: "user" | "supervisor") => void;
  selectedUsers: IUserFS[];
  setSelectedUsers: Dispatch<SetStateAction<IUserFS[]>>;
  selectedSupervisors: IUserFS[];
  setSelectedSupervisors: Dispatch<SetStateAction<IUserFS[]>>;
  setAreUsersSelectionDone: Dispatch<SetStateAction<boolean>>;
}

export default function SendTodoStepsSearch({
  searchText,
  setSearchText,
  selectedUsers,
  setSelectedUsers,
  setSelectedSupervisors,
  setAreUsersSelectionDone,
  userType,
  setUserType,
}: Props) {
  const { t } = useTranslation();

  const inputRef = useRef(null);

  const handlePressToCompleteToUsers = () => {
    setAreUsersSelectionDone(true);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1 }}>
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
            <UserTypeSwitch userType={userType} setUserType={setUserType} />
          </View>

          {/* Searched User */}
          <SearchUserLists
            searchText={searchText}
            setSearchText={setSearchText}
            userType={userType}
            setSelectedUsers={setSelectedUsers}
            setSelectedSupervisors={setSelectedSupervisors}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
