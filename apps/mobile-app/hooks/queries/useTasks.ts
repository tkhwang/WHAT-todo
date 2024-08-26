import { useQueries, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { COLLECTIONS } from "@whatTodo/models";

import { updateTodoCache } from "@/services/Todo/updateTodoCache";

import { useUserTasks } from "./useUserTasks";

export function useTodos() {
  const queryClient = useQueryClient();

  const { data: userTodos } = useUserTasks();

  const todoIds = useMemo(() => {
    return (userTodos ?? []).map((userTodo) => userTodo.id);
  }, [userTodos]);

  useEffect(
    function setupTodosEffect() {
      const unsubscribes: (() => void)[] = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const todoId of todoIds ?? []) {
        const unsubscribe = updateTodoCache(todoId, queryClient);
        unsubscribes.push(unsubscribe);
      }

      return () => {
        unsubscribes.forEach((unsubscribe) => unsubscribe());
      };
    },
    [queryClient, todoIds],
  );

  return useQueries({
    queries:
      todoIds?.map((todoId) => ({
        queryKey: [COLLECTIONS.TASKS, todoId],
        queryFn: () => new Promise((): void => {}),
        enabled: !!todoId,
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
