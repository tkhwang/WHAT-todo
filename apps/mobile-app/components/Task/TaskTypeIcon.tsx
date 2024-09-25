import { TaskType } from "@whatTodo/models";

import Icon from "@/assets/icons";
import { appTheme } from "@/constants/uiConsts";

interface Props {
  taskType: TaskType;
}

export default function TaskTypeIcon({ taskType }: Props) {
  return (
    <Icon
      name={taskType === "todo" ? "checkmarkSquare" : "noteRemove"}
      size={26}
      strokeWidth={1.6}
      color={taskType === "todo" ? appTheme.colors.secondary : appTheme.colors.primary}
    />
  );
}
