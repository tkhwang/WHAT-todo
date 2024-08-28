import { useQueries, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { COLLECTIONS, ITask } from "@whatTodo/models";
import firestore from "@react-native-firebase/firestore";

import { useUserTasks } from "./useUserTasks";
import { useFirestore } from "../useFirestore";
import { ITaskFS } from "@/types";

export function useTasks(listId: string, isDone = false) {
  const queryClient = useQueryClient();

  const { data: userTasks } = useUserTasks(listId);

  const { convert, getDoc, setDoc } = useFirestore<ITaskFS, ITask>();

  const taskIds = useMemo(() => {
    return (userTasks ?? []).map((userTodo) => userTodo.id);
  }, [userTasks]);

  useEffect(
    function setupTodosEffect() {
      const unsubscribes: (() => void)[] = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const taskId of taskIds ?? []) {
        const key = [COLLECTIONS.TASKS, taskId];
        const unsubscribe = firestore()
          .collection(COLLECTIONS.TASKS)
          .doc(taskId)
          .onSnapshot((doc) => {
            const taskDoc = {
              id: doc.id,
              ...doc.data(),
            } as ITaskFS;
            const task = convert(taskDoc, doc.id);
            setDoc(key, task);
          });

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
        queryFn: () => new Promise<ITask>((): void => {}),
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
