import { ITask } from "@whatTodo/models";
import { useCallback } from "react";

export function useSelectTaskByTaskId(taskId?: string) {
  const selectTaskByTaskId = useCallback(
    (data: ITask[]) => {
      if (!taskId) return undefined;

      return data.find((task) => task.id === taskId);
    },
    [taskId],
  );

  return { selectTaskByTaskId };
}
