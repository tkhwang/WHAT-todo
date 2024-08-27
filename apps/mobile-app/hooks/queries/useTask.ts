import { useEffect, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { COLLECTIONS, ITask } from "@whatTodo/models";
import firestore from "@react-native-firebase/firestore";

import { IListFS } from "@/types";

import { useFirestore } from "../useFirestore";

export function useTask(taskId: string) {
  const queryClient = useQueryClient();

  const key = useMemo(() => {
    return [COLLECTIONS.TASKS, taskId];
  }, [taskId]);

  const { convert, setDoc } = useFirestore();

  useEffect(
    function setupTodosEffect() {
      const unsubscribe = firestore()
        .collection(COLLECTIONS.TASKS)
        .doc(taskId)
        .onSnapshot((doc) => {
          const taskDoc = {
            id: doc.id,
            ...doc.data(),
          } as IListFS;
          const list = convert(taskDoc, doc.id);
          setDoc(key, list);
        });

      return () => {
        unsubscribe();
      };
    },
    [queryClient, key, taskId, convert, setDoc],
  );

  return useQuery<ITask>({
    queryKey: key,
    queryFn: () => new Promise((): void => {}),
    enabled: !!taskId,
    staleTime: Infinity,
  });
}
