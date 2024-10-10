import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { ITask, UserType } from "@whatTodo/models";

import { useUserTasks } from "./useUserTasks";
import { getTasksQueryOptions } from "./queryOptions/getTasksQueryOptions";
import { useTasksSideEffect } from "./sideEffect/useTasksSideEffect";

export function useTasks<TSelected = ITask[]>(
  userType: UserType,
  listId: string,
  select?: (tasks: ITask[]) => TSelected,
) {
  const { data: userTasks } = useUserTasks(userType, listId);
  console.log(
    `[+][useTasks] userTasks: ${JSON.stringify(
      userTasks?.map((userTask) => ({ id: userTask.id, task: userTask.task })),
    )}`,
  );

  const taskIds = useMemo(() => {
    return (userTasks ?? []).map((userTodo) => userTodo.id);
  }, [userTasks]);

  useTasksSideEffect(userType, listId);

  return useQuery<ITask[], Error, TSelected>({
    ...getTasksQueryOptions(),
    enabled: !!taskIds && taskIds.length > 0,
    staleTime: Infinity,
    select,
  });
}
