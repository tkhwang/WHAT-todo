import { useEffect, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { COLLECTIONS, ITask } from "@whatTodo/models";

import { updateTaskCache } from "@/services/Task/updateTaskCache";

export function useTask(taskId: string) {
  const queryClient = useQueryClient();

  const queryKey = useMemo(() => {
    return [COLLECTIONS.TASKS, taskId];
  }, [taskId]);

  useEffect(
    function setupTodosEffect() {
      const unsubscribe = updateTaskCache(taskId, queryClient);

      return () => {
        unsubscribe();
      };
    },
    [queryClient, queryKey, taskId],
  );

  return useQuery<ITask>({
    queryKey,
    queryFn: () => new Promise((): void => {}),
    enabled: !!taskId,
    staleTime: Infinity,
  });
}
