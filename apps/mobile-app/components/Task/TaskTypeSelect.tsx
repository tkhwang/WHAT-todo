import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { TaskType } from "@whatTodo/models";

import { Text } from "@/components/ui/text";
import Icon from "@/assets/icons";
import { appTheme } from "@/constants/uiConsts";

import { Switch } from "../ui/switch";

interface Props {
  taskType: TaskType;
  toggleTaskType: () => void;
}

export default function TaskTypeSelect({ taskType, toggleTaskType }: Props) {
  const { t } = useTranslation();

  return (
    <View className={"flex flex-row items-center justify-center gap-1"}>
      {/* Left: DON'T DO */}
      <View className={"flex flex-row items-center gap-1 bg-gray-200 px-3 py-2 rounded-full"}>
        <Text className={"text-sm font-normal"}>{t("task.list.type.notTodo")}</Text>
        <Icon
          name={"noteRemove"}
          size={26}
          strokeWidth={1.6}
          color={taskType === "todo" ? appTheme.colors.textLight : appTheme.colors.primary}
        />
      </View>

      {/* Center: SWITCH */}
      <Switch checked={taskType === "todo"} onCheckedChange={toggleTaskType} nativeID={"todo"} />

      {/* RIGHT: TODO */}
      <View className={"flex flex-row items-center gap-1 bg-gray-200 px-3 py-2 rounded-full"}>
        <Icon
          name={"checkmarkSquare"}
          size={26}
          strokeWidth={1.6}
          color={taskType === "todo" ? appTheme.colors.secondary : appTheme.colors.textLight}
        />
        <Text className={"text-sm font-normal"}>{t("task.list.type.todo")}</Text>
      </View>
    </View>
  );
}
