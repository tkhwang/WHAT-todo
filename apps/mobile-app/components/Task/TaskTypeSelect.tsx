import { useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { Text } from "@/components/ui/text";
import Icon from "@/assets/icons";
import { appTheme } from "@/constants/uiConsts";
import { cn } from "@/lib/utils";

import { Switch } from "../ui/switch";

export default function TaskTypeSelect() {
  const { t } = useTranslation();

  const [isTodoType, setIsTodoType] = useState(true);

  return (
    <View className={"flex flex-row items-center justify-center flex-1 gap-4"}>
      <View className={"flex flex-row flex-1 gap-2"}>
        <Text
          className={cn("flex-1 text-xl text-right", isTodoType ? "font-normal" : "font-semibold")}
        >
          {t("task.list.type.notTodo")}
        </Text>
        <Icon
          name={"noteRemove"}
          size={26}
          strokeWidth={1.6}
          color={isTodoType ? appTheme.colors.textLight : appTheme.colors.primary}
        />
      </View>
      <Switch
        className={"flex-1"}
        checked={isTodoType}
        onCheckedChange={setIsTodoType}
        nativeID={"todo"}
      />
      <View className={"flex flex-row flex-1 gap-2"}>
        <Icon
          name={"checkmarkSquare"}
          size={26}
          strokeWidth={1.6}
          color={isTodoType ? appTheme.colors.secondary : appTheme.colors.textLight}
        />
        <Text
          className={cn("flex-1  text-xl text-left", isTodoType ? "font-semibold" : "font-normal")}
        >
          {t("task.list.type.todo")}
        </Text>
      </View>
    </View>
  );
}
