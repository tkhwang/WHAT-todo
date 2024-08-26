import { useEffect, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { COLLECTIONS, ITodo } from "@whatTodo/models";

import { updateTodoCache } from "@/services/Todo/updateTodoCache";

export function useTask(taskId: string) {
  const queryClient = useQueryClient();

  const queryKey = useMemo(() => {
    return [COLLECTIONS.TASKS, taskId];
  }, [taskId]);

  useEffect(
    function setupTodosEffect() {
      const unsubscribe = updateTodoCache(taskId, queryClient);

      return () => {
        unsubscribe();
      };
    },
    [queryClient, queryKey, taskId],
  );

  return useQuery<ITodo>({
    queryKey,
    queryFn: () => new Promise((): void => {}),
    enabled: !!taskId,
    staleTime: Infinity,
  });
}
