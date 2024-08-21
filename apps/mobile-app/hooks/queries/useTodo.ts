import { useEffect, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { COLLECTIONS } from "@whatTodo/models";

import { updateTodoCache } from "@/services/Todo/updateTodoCache";

export function useTodo(todoId: string) {
  const queryClient = useQueryClient();

  const queryKey = useMemo(() => {
    return [COLLECTIONS.TODOS, todoId];
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

  return useQuery({
    queryKey,
    queryFn: () => new Promise((): void => {}),
    enabled: !!todoId,
    staleTime: Infinity,
  });
}
