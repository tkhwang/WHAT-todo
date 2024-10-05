import { useQuery } from "@tanstack/react-query";
import { IUserTask } from "@whatTodo/models";
import { useAtomValue } from "jotai";

import { myUserIdAtom } from "@/states/me";

import { getUserTasksQueryOptions } from "./queryOptions/getUserTasksQueryOptions";
import { useUserTasksSideEffect } from "./sideEffect/useUserTasksSideEffect";

export function useUserTasks<TSelected = IUserTask[]>(
  listId: string,
  select?: (data: IUserTask[]) => TSelected,
) {
  const myUserId = useAtomValue(myUserIdAtom);

  useUserTasksSideEffect(listId);

  return useQuery<IUserTask[], Error, TSelected>({
    ...getUserTasksQueryOptions(myUserId, listId),
    enabled: !!myUserId,
    staleTime: Infinity,
    select,
  });
}
