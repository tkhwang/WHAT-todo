import { View } from "react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import Button from "@/components/Button/Button";
import { appTheme } from "@/constants/uiConsts";

export default function SendTodoForm() {
  const { t } = useTranslation();

  const [todoListTitle, setTodoListTitle] = useState("");

  return (
    <View className={"flex flex-col flex-1 w-full items-center gap-4"}>
      {/* List Title */}
      <View className={"flex w-full flex-row items-center gap-4"}>
        <Text className={"w-16 text-xl font-normal text-gray-500"}>{t("sendTodo.list.title")}</Text>
        <Input
          className={"flex-1"}
          placeholder={t("sendTodo.list.title.placeholder")}
          value={todoListTitle}
          onChangeText={setTodoListTitle}
          aria-labelledby={"inputLabel"}
          aria-errormessage={"inputError"}
        />
      </View>

      <View className={"flex flex-1 w-full"}>
        <Button
          // onPress={handleClickRegister}
          title={t("sendTodo.cta.add-to-task")}
          color={appTheme.colors.primary}
          buttonStyle={{
            backgroundColor:
              todoListTitle.length === 0 ? appTheme.colors.gray : appTheme.colors.primary,
          }}
          disabled={todoListTitle.length === 0}
        />
      </View>
    </View>
  );
}
