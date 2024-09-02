import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { COLLECTIONS, ITask } from "@whatTodo/models";
import firestore from "@react-native-firebase/firestore";

import { ITaskFS } from "@/types";

import { useFirestore } from "../useFirestore";

export function useTask(taskId: string) {
  const { convert, setDoc } = useFirestore<ITaskFS, ITask>();

  const key = useMemo(() => {
    return [COLLECTIONS.TASKS, taskId];
  }, [taskId]);

  useEffect(
    function setupTaskEffect() {
      const unsubscribe = firestore()
        .collection(COLLECTIONS.TASKS)
        .doc(taskId)
        .onSnapshot((doc) => {
          const taskDoc = {
            id: doc.id,
            ...doc.data(),
          } as ITaskFS;
          const task = {
            ...convert(taskDoc, doc.id),
            ...(taskDoc.dueDate ? { dueDate: taskDoc.dueDate?.toDate() } : {}),
          };
          setDoc(key, task);
        });

      return function clearTaskEffect() {
        unsubscribe();
      };
    },
    [convert, key, setDoc, taskId],
  );

  return useQuery<ITask>({
    queryKey: key,
    queryFn: () => new Promise((): void => {}),
    enabled: !!taskId,
    staleTime: Infinity,
  });
}
