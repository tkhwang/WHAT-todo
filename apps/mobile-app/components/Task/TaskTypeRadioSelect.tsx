import { useTranslation } from "react-i18next";
import { TaskType } from "@whatTodo/models";

import Icon from "@/assets/icons";
import { appTheme } from "@/constants/uiConsts";

import RadioSelect from "../Radio/RadioSelect";

interface Props {
  taskType: TaskType;
  setTaskType: (taskType: TaskType) => void;
}

export default function TaskTypeRadioSelect({ taskType, setTaskType }: Props) {
  const { t } = useTranslation();

  return (
    <RadioSelect
      switchState={taskType}
      // @ts-expect-error : type error : string vs const union
      setSwitchState={setTaskType}
      // truthy
      truthyStateText={"todo"}
      truthyDisplayText={t("task.list.type.todo")}
      TruthyIcon={
        <Icon
          name={"checkmarkSquare"}
          size={26}
          strokeWidth={1.6}
          color={taskType === "todo" ? appTheme.colors.secondary : appTheme.colors.textLight}
        />
      }
      // falsy
      falseStateText={"not-todo"}
      falseDisplayText={t("task.list.type.notTodo")}
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
