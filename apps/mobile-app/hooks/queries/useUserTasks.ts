import { useQuery, useQueryClient } from "@tanstack/react-query";
import { COLLECTIONS, ITask } from "@whatTodo/models";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

import { myUserIdAtom } from "@/states/me";
import { FirestoreSnapshotListener } from "@/firestore/FirestoreSnapshotListner";
import { ITaskFS } from "@/types";

import { useFirestore } from "../useFirestore";

export function useUserTasks() {
  const queryClient = useQueryClient();

  const myUserId = useAtomValue(myUserIdAtom);

  const { convert, getDocs, setDocs } = useFirestore<ITaskFS, ITask>();

  useEffect(
    function setupUserTodosEffect() {
      const key = [COLLECTIONS.USERS, myUserId, COLLECTIONS.TASKS];
      const stringKey = key.join("/");

      if (FirestoreSnapshotListener.has(stringKey)) return;

      const unsubscribe = firestore()
        .collection(COLLECTIONS.USERS)
        .doc(myUserId)
        .collection(COLLECTIONS.TASKS)
        .onSnapshot((snpashot) => {
          if (!snpashot) return;

          const prvUserTasks = getDocs(key);
          if (!prvUserTasks) {
            const userTasks = snpashot.docs.map((doc) => {
              const userTodoDoc = doc.data() as ITaskFS;
              return convert(userTodoDoc, doc.id);
            });
            setDocs(key, userTasks);
          } else {
            snpashot.docChanges().forEach((change) => {
              if (change.type === "added") {
                const userTaskDoc = change.doc.data() as ITaskFS;
                const userTasks = [convert(userTaskDoc, change.doc.id), ...prvUserTasks];
                setDocs(key, userTasks);
              } else if (change.type === "modified") {
                const userTasksDoc = change.doc.data() as ITaskFS;
                const userTasks = prvUserTasks.map((userTodo) => {
                  if (userTodo.id === change.doc.id) return convert(userTasksDoc, change.doc.id);
                  return userTodo;
                });
                setDocs(key, userTasks);
              } else if (change.type === "removed") {
                const userTasks = prvUserTasks.filter((userTodo) => userTodo.id !== change.doc.id);
                setDocs(key, userTasks);
              }
            });
          }

          FirestoreSnapshotListener.set(stringKey, unsubscribe);
        });
    },
    [convert, getDocs, myUserId, queryClient, setDocs],
  );

  return useQuery<ITask[]>({
    queryKey: [COLLECTIONS.USERS, myUserId, COLLECTIONS.TASKS],
    queryFn: () => new Promise((): void => {}),
    enabled: !!myUserId,
    staleTime: Infinity,
  });
}
