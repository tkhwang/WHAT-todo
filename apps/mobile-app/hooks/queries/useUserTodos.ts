import { useQuery, useQueryClient } from "@tanstack/react-query";
import { COLLECTIONS, ITodo } from "@whatTodo/models";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

import { myUserIdAtom } from "@/states/me";
import { FirestoreSnapshotListener } from "@/firestore/FirestoreSnapshotListner";

export function useUserTodos() {
  const queryClient = useQueryClient();

  const myUserId = useAtomValue(myUserIdAtom);

  useEffect(
    function setupUserTodosEffect() {
      const convert = (userTodoDoc: ITodo, docId: string) => {
        const { createdAt, updatedAt } = userTodoDoc;
        return {
          ...userTodoDoc,
          id: docId,
          createdAt: createdAt.toDate(),
          updatedAt: updatedAt.toDate(),
        };
      };

      const getUserTodos = () => {
        const cachedUserTodos = queryClient.getQueryData<ITodo[]>([COLLECTIONS.USERS, myUserId, COLLECTIONS.TODOS]);
        return cachedUserTodos;
      };

      const setUserTodos = (userTodos: ITodo[]) => {
        queryClient.setQueryData([COLLECTIONS.USERS, myUserId, COLLECTIONS.TODOS], userTodos);
      };

      const key = `${COLLECTIONS.USERS}/${myUserId}/${COLLECTIONS.TODOS}`;
      if (FirestoreSnapshotListener.has(key)) return;

      const unsubscribe = firestore()
        .collection(COLLECTIONS.USERS)
        .doc(myUserId)
        .collection(COLLECTIONS.TODOS)
        .onSnapshot((snpashot) => {
          if (!snpashot) return;

          const prvUserTodos = getUserTodos();
          if (!prvUserTodos) {
            const userTodos = snpashot.docs.map((doc) => {
              const userTodoDoc = doc.data() as ITodo;
              return convert(userTodoDoc, doc.id);
            });
            setUserTodos(userTodos);
          } else {
            snpashot.docChanges().forEach((change) => {
              if (change.type === "added") {
                const userTodoDoc = change.doc.data() as ITodo;
                const userTodos = [convert(userTodoDoc, change.doc.id), ...prvUserTodos];
                setUserTodos(userTodos);
              } else if (change.type === "modified") {
                const userTodosDoc = change.doc.data() as ITodo;
                const userTodos = prvUserTodos.map((userTodo) => {
                  if (userTodo.id === change.doc.id) return convert(userTodosDoc, change.doc.id);
                  return userTodo;
                });
                setUserTodos(userTodos);
              } else if (change.type === "removed") {
                const userTodos = prvUserTodos.filter((userTodo) => userTodo.id !== change.doc.id);
                setUserTodos(userTodos);
              }
            });
          }

          FirestoreSnapshotListener.set(key, unsubscribe);
        });
    },
    [myUserId, queryClient],
  );

  return useQuery<ITodo[]>({
    queryKey: [COLLECTIONS.USERS, myUserId, COLLECTIONS.TODOS],
    queryFn: () => new Promise((): void => {}),
    enabled: !!myUserId,
    staleTime: Infinity,
  });
}
