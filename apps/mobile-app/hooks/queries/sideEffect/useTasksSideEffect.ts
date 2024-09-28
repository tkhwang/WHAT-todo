import { COLLECTIONS, ITask } from "@whatTodo/models";
import { useEffect, useMemo } from "react";
import firestore from "@react-native-firebase/firestore";

import { useFirestore } from "@/hooks/useFirestore";
import { ITaskFS } from "@/types";

import { useUserTasks } from "../useUserTasks";

export function useTasksSideEffect(listId: string) {
  const { convert, setDocs } = useFirestore<ITaskFS, ITask>();

  const { data: userTasks } = useUserTasks(listId);

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
}
