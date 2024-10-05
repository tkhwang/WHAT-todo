import { IUserTask } from "@whatTodo/models";
import { useCallback } from "react";

export function useSelectUserTaskByTaskId(taskId?: string) {
  const selectUserTaskByTaskId = useCallback(
    (data: IUserTask[]) => {
      if (!taskId) return undefined;

      return data.find((userTask) => userTask.id === taskId);
    },
    [taskId],
  );

  return { selectUserTaskByTaskId };
}
