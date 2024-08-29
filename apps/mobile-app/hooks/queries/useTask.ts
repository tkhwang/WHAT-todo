import { useEffect, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { COLLECTIONS, ITask } from "@whatTodo/models";
import firestore from "@react-native-firebase/firestore";

import { ITaskFS } from "@/types";

import { useFirestore } from "../useFirestore";

export function useTask(taskId: string, isDone = false) {
  const queryClient = useQueryClient();

  const key = useMemo(() => {
    return [COLLECTIONS.TASKS, taskId];
  }, [taskId]);

  const { convert, setDoc } = useFirestore<ITaskFS, ITask>();

  useEffect(() => {
    const unsubscribe = firestore()
      .collection(COLLECTIONS.TASKS)
      .doc(taskId)
      .onSnapshot((doc) => {
        const taskDoc = {
          id: doc.id,
          ...doc.data(),
        } as ITaskFS;
        const list = convert(taskDoc, doc.id);
        if (list.isDone === isDone) {
          setDoc(key, list);
        }
      });

    return () => {
      unsubscribe();
    };
  }, [queryClient, key, taskId, convert, setDoc, isDone]);

  return useQuery<ITask>({
    queryKey: key,
    queryFn: () => new Promise((): void => {}),
    enabled: !!taskId,
    staleTime: Infinity,
  });
}
