import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { COLLECTIONS, ITask } from "@whatTodo/models";
import firestore from "@react-native-firebase/firestore";

import { ITaskFS } from "@/types";

import { useUserTasks } from "./useUserTasks";
import { getTasksQueryOptions } from "./queryOptions/getTasksQueryOptions";
import { useFirestore } from "../useFirestore";

export function useTasks<TSelected = ITask[]>(
  listId: string,
  select?: (tasks: ITask[]) => TSelected,
) {
  const { data: userTasks } = useUserTasks(listId);

  const { convert, setDocs } = useFirestore<ITaskFS, ITask>();

  const taskIds = useMemo(() => {
    return (userTasks ?? []).map((userTodo) => userTodo.id);
  }, [userTasks]);

  useEffect(
    function setupTasksEffect() {
      if (!taskIds.length) return undefined;

      const key = [COLLECTIONS.TASKS];
      const unsubscribe = firestore()
        .collection(COLLECTIONS.TASKS)
        .where(firestore.FieldPath.documentId(), "in", taskIds)
        .onSnapshot((snapshot) => {
          if (!snapshot) return;

          const tasks = snapshot.docs.map((doc) => {
            const taskDoc = doc.data() as ITaskFS;
            return convert(taskDoc, doc.id);
          });

          setDocs(key, tasks);
        });

      return function cleanUpTasksEffect() {
        unsubscribe();
      };
    },
    [convert, setDocs, taskIds],
  );

  return useQuery<ITask[], Error, TSelected>({
    ...getTasksQueryOptions(),
    select,
    enabled: !!taskIds && taskIds.length > 0,
    staleTime: Infinity,
  });
}
