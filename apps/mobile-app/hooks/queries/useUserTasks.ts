import { useQuery, useQueryClient } from "@tanstack/react-query";
import { COLLECTIONS, ITask } from "@whatTodo/models";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

import { myUserIdAtom } from "@/states/me";
import { FirestoreSnapshotListener } from "@/firestore/FirestoreSnapshotListner";

export function useUserTasks() {
  const queryClient = useQueryClient();

  const myUserId = useAtomValue(myUserIdAtom);

  useEffect(
    function setupUserTodosEffect() {
      const convert = (userTaskDoc: ITask, docId: string) => {
        const { createdAt, updatedAt } = userTaskDoc;
        return {
          ...userTaskDoc,
          id: docId,
          createdAt: createdAt.toDate(),
          updatedAt: updatedAt.toDate(),
        };
      };

      const getUserTasks = () => {
        const cachedUserTodos = queryClient.getQueryData<ITask[]>([COLLECTIONS.USERS, myUserId, COLLECTIONS.TASKS]);
        return cachedUserTodos;
      };

      const setUserTasks = (userTasks: ITask[]) => {
        queryClient.setQueryData([COLLECTIONS.USERS, myUserId, COLLECTIONS.TASKS], userTasks);
      };

      const key = `${COLLECTIONS.USERS}/${myUserId}/${COLLECTIONS.TASKS}`;
      if (FirestoreSnapshotListener.has(key)) return;

      const unsubscribe = firestore()
        .collection(COLLECTIONS.USERS)
        .doc(myUserId)
        .collection(COLLECTIONS.TASKS)
        .onSnapshot((snpashot) => {
          if (!snpashot) return;

          const prvUserTasks = getUserTasks();
          if (!prvUserTasks) {
            const userTasks = snpashot.docs.map((doc) => {
              const userTodoDoc = doc.data() as ITask;
              return convert(userTodoDoc, doc.id);
            });
            setUserTasks(userTasks);
          } else {
            snpashot.docChanges().forEach((change) => {
              if (change.type === "added") {
                const userTaskDoc = change.doc.data() as ITask;
                const userTasks = [convert(userTaskDoc, change.doc.id), ...prvUserTasks];
                setUserTasks(userTasks);
              } else if (change.type === "modified") {
                const userTasksDoc = change.doc.data() as ITask;
                const userTasks = prvUserTasks.map((userTodo) => {
                  if (userTodo.id === change.doc.id) return convert(userTasksDoc, change.doc.id);
                  return userTodo;
                });
                setUserTasks(userTasks);
              } else if (change.type === "removed") {
                const userTasks = prvUserTasks.filter((userTodo) => userTodo.id !== change.doc.id);
                setUserTasks(userTasks);
              }
            });
          }

          FirestoreSnapshotListener.set(key, unsubscribe);
        });
    },
    [myUserId, queryClient],
  );

  return useQuery<ITask[]>({
    queryKey: [COLLECTIONS.USERS, myUserId, COLLECTIONS.TASKS],
    queryFn: () => new Promise((): void => {}),
    enabled: !!myUserId,
    staleTime: Infinity,
  });
}
