import { useTranslation } from "react-i18next";
import { TaskType } from "@whatTodo/models";

import Icon from "@/assets/icons";
import { appTheme } from "@/constants/uiConsts";

import RadioSwitch from "../Switch/RadioSwitch";

interface Props {
  taskType: TaskType;
  toggleTaskType: () => void;
}

export default function TaskTypeSwitch({ taskType, toggleTaskType }: Props) {
  const { t } = useTranslation();

  return (
    <RadioSwitch
      switchState={taskType === "todo"}
      toggleSwitchState={toggleTaskType}
      switchStateNativeId={"todo"}
      // truthy
      truthyText={t("task.list.type.todo")}
      TruthyIcon={
        <Icon
          name={"checkmarkSquare"}
          size={26}
          strokeWidth={1.6}
          color={taskType === "todo" ? appTheme.colors.secondary : appTheme.colors.textLight}
        />
      }
      // falsy
      falseText={t("task.list.type.notTodo")}
      FalsyIcon={
        <Icon
          name={"noteRemove"}
          size={26}
          strokeWidth={1.6}
          color={taskType === "todo" ? appTheme.colors.textLight : appTheme.colors.primary}
        />
      }
    />
  );
}
