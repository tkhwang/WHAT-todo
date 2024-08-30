import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { COLLECTIONS, ITask } from "@whatTodo/models";

export function useTask(taskId: string) {
  const key = useMemo(() => {
    return [COLLECTIONS.TASKS, taskId];
  }, [taskId]);

  return useQuery<ITask>({
    queryKey: key,
    queryFn: () => new Promise((): void => {}),
    enabled: !!taskId,
    staleTime: Infinity,
  });
}
