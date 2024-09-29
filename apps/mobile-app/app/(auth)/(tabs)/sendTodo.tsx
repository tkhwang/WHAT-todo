/* eslint-disable react/no-array-index-key */
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

import { Text } from "@/components/ui/text";
import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import Header from "@/components/MainLayout/Header";
import Input from "@/components/Input";
import Icon from "@/assets/icons";
import { useSearchUsers } from "@/hooks/queries/useSearchUsers";
import { IUserFS } from "@/types";
import { SEARCH_USER_INPUT_DEBOUNCE_TIME } from "@/constants/appConsts";

export default function SendTodo() {
  const { t } = useTranslation();

  const inputRef = useRef(null);

  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, SEARCH_USER_INPUT_DEBOUNCE_TIME);

  const { data: searchedUsers } = useSearchUsers(debouncedSearchText);

  const onBackPress = () => setSearchText("");

  return (
    <ScreenWrapper>
      <View className={"flex flex-1 flex-col p-4 gap-4"}>
        <Header title={t("title.expert.sendTodo")} showBackButton onBackPress={onBackPress} />
        {/* Search User */}
        <Text className={"text-xl font-semibold"}>
          {`${t("title.expert.sendTodo.select.user.text")}:`}
        </Text>

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
        <View className={"flex flex-col"}>
          {searchText
            ? (searchedUsers ?? []).map((user: IUserFS, index: number) => (
                <View key={index} className={"flex py-2"}>
                  <Text key={`searched-user-name-${index}-${user.id}`}>{user.name}</Text>
                  <Text key={`searched-user-email-${index}-${user.id}`}>{user.email}</Text>
                  <Text key={`searched-user-whatTodoId-${index}-${user.id}`}>
                    {user.whatTodoId}
                  </Text>
                </View>
              ))
            : null}
        </View>
      </View>
    </ScreenWrapper>
  );
}
