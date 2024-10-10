import { COLLECTIONS, ITask, UserType } from "@whatTodo/models";
import { useEffect, useMemo } from "react";
import firestore from "@react-native-firebase/firestore";
import { useAtomValue } from "jotai";

import { useFirestore } from "@/hooks/useFirestore";
import { ITaskFS } from "@/types";
import { myUserIdAtom } from "@/states/me";

import { useUserTasks } from "../useUserTasks";

export function useTasksSideEffect(userType: UserType, listId: string) {
  const myUserId = useAtomValue(myUserIdAtom);

  const { convert, setDocs } = useFirestore<ITaskFS, ITask>();

  const { data: userTasks } = useUserTasks(userType, listId);

  const taskIds = useMemo(() => {
    return (userTasks ?? []).map((userTodo) => userTodo.id);
  }, [userTasks]);

  useEffect(
    function setupTasksEffect() {
      if (!taskIds || (taskIds && taskIds.length === 0)) return undefined;

      const key = [COLLECTIONS.TASKS, listId];
      const unsubscribe = firestore()
        .collection(COLLECTIONS.TASKS)
        .where(firestore.FieldPath.documentId(), "in", taskIds)
        /*
         *    userIds       'array-contains' myUserId
         *    supervisorIds 'array-contains' myUserId
         *    expertId      '=='             myUserId
         */
        .where(
          userType === "user"
            ? "userIds"
            : userType === "supervisor"
              ? "supervisorIds"
              : "expertId",
          userType === "expert" ? "==" : "array-contains",
          myUserId,
        )
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
    [convert, myUserId, setDocs, taskIds, userType],
  );
}
