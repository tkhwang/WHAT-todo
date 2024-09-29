import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";

import { Text } from "@/components/ui/text";
import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import Header from "@/components/MainLayout/Header";
import Input from "@/components/Input";
import Icon from "@/assets/icons";

export default function SendTodo() {
  const { t } = useTranslation();

  const [searchText, setSearchText] = useState("");
  const inputRef = useRef(null);

  return (
    <ScreenWrapper>
      <View className={"flex flex-1 flex-col p-4 gap-4"}>
        <Header title={t("title.expert.sendTodo")} showBackButton />
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
      </View>
    </ScreenWrapper>
  );
}
