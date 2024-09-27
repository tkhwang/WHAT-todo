import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { Text } from "@/components/ui/text";
import Icon from "@/assets/icons";
import { appTheme } from "@/constants/uiConsts";
import { cn } from "@/lib/utils";
import { useTaskStore } from "@/stores/todo";

import { Switch } from "../ui/switch";

export default function TaskTypeSelect() {
  const { t } = useTranslation();

  const { taskType, setTaskType } = useTaskStore();

  const handleToggleTaskType = () => {
    setTaskType(taskType === "todo" ? "not-todo" : "todo");
  };

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
      <Switch
        checked={taskType === "todo"}
        onCheckedChange={handleToggleTaskType}
        nativeID={"todo"}
      />
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
