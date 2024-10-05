import { COLLECTIONS, ITask } from "@whatTodo/models";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

import { useFirestore } from "@/hooks/useFirestore";
import { myUserIdAtom } from "@/states/me";
import { IUserTaskFS } from "@/types";
import { FirestoreSnapshotListener } from "@/firestore/FirestoreSnapshotListner";

export function useUserTasksSideEffect(listId: string) {
  const myUserId = useAtomValue(myUserIdAtom);

  const { convert, getDocs, setDocs } = useFirestore<IUserTaskFS, ITask>();

  useEffect(
    function setupUserTodosEffect() {
      const key = [COLLECTIONS.USERS, myUserId, COLLECTIONS.TASKS, listId];
      const stringKey = key.join("/");

      if (FirestoreSnapshotListener.has(stringKey)) return;

      const unsubscribe = firestore()
        .collection(COLLECTIONS.USERS)
        .doc(myUserId)
        .collection(COLLECTIONS.TASKS)
        .where("listId", "==", listId)
        .onSnapshot((snpashot) => {
          if (!snpashot) return;

          const prvUserTasks = getDocs(key);
          if (!prvUserTasks) {
            const userTasks = snpashot.docs.map((doc) => {
              const userTodoDoc = doc.data() as IUserTaskFS;
              return convert(userTodoDoc, doc.id);
            });
            setDocs(key, userTasks);
          } else {
            snpashot.docChanges().forEach((change) => {
              if (change.type === "added") {
                const userTaskDoc = change.doc.data() as IUserTaskFS;
                const userTasks = [convert(userTaskDoc, change.doc.id), ...prvUserTasks];
                setDocs(key, userTasks);
              } else if (change.type === "modified") {
                const userTasksDoc = change.doc.data() as IUserTaskFS;
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
    [convert, getDocs, listId, myUserId, setDocs],
  );
}
