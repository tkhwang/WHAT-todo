import { useQuery } from "@tanstack/react-query";
import { ITask } from "@whatTodo/models";
import { useAtomValue } from "jotai";

import { myUserIdAtom } from "@/states/me";

import { getUserTasksQueryOptions } from "./queryOptions/getUserTasksQueryOptions";
import { useUserTasksSideEffect } from "./sideEffect/useUserTasksSideEffect";

export function useUserTasks(listId: string) {
  const myUserId = useAtomValue(myUserIdAtom);

  useUserTasksSideEffect(listId);

  return useQuery<ITask[]>({
    ...getUserTasksQueryOptions(myUserId, listId),
    enabled: !!myUserId,
    staleTime: Infinity,
  });
}
