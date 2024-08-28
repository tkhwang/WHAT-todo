import { useQueries, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { COLLECTIONS } from "@whatTodo/models";

import { updateTaskCache } from "@/services/Task/updateTaskCache";

import { useUserTasks } from "./useUserTasks";

export function useTasks(listId: string) {
  const queryClient = useQueryClient();

  const { data: userTasks } = useUserTasks(listId);

  const taskIds = useMemo(() => {
    return (userTasks ?? []).map((userTodo) => userTodo.id);
  }, [userTasks]);

  useEffect(
    function setupTodosEffect() {
      const unsubscribes: (() => void)[] = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const taskId of taskIds ?? []) {
        const unsubscribe = updateTaskCache(taskId, queryClient);
        unsubscribes.push(unsubscribe);
      }

      return () => {
        unsubscribes.forEach((unsubscribe) => unsubscribe());
      };
    },
    [queryClient, taskIds],
  );

  return useQueries({
    queries:
      taskIds?.map((taskId) => ({
        queryKey: [COLLECTIONS.TASKS, taskId],
        queryFn: () => new Promise((): void => {}),
        enabled: !!taskId,
        staleTime: Infinity,
      })) ?? [],
    combine: (results) => {
      const sortedTodosByUpdatedAt = results
        .flatMap((result) => (result.data ? [result.data] : []))
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      return {
        // data: results.flatMap((result) => (result.data ? [result.data] : [])),
        data: sortedTodosByUpdatedAt,
        arePending: results.some((result) => result.isPending),
      };
    },
  });
}
