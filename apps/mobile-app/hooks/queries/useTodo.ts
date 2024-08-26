import { useEffect, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { COLLECTIONS, ITodo } from "@whatTodo/models";

import { updateTodoCache } from "@/services/Todo/updateTodoCache";

export function useTodo(todoId: string) {
  const queryClient = useQueryClient();

  const queryKey = useMemo(() => {
    return [COLLECTIONS.TASKS, todoId];
  }, [todoId]);

  useEffect(
    function setupTodosEffect() {
      const unsubscribe = updateTodoCache(todoId, queryClient);

      return () => {
        unsubscribe();
      };
    },
    [queryClient, queryKey, todoId],
  );

  return useQuery<ITodo>({
    queryKey,
    queryFn: () => new Promise((): void => {}),
    enabled: !!todoId,
    staleTime: Infinity,
  });
}
