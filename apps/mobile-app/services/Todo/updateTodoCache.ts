import { QueryClient } from "@tanstack/react-query";
import { COLLECTIONS, ITask } from "@whatTodo/models";
import firestore from "@react-native-firebase/firestore";

export function updateTodoCache(todoId: string, queryClient: QueryClient) {
  const queryKey = [COLLECTIONS.TASKS, todoId];

  const convert = (todoDoc: ITask, docId: string) => {
    const { createdAt, updatedAt } = todoDoc;
    return {
      ...todoDoc,
      id: docId,
      createdAt: createdAt?.toDate(),
      updatedAt: updatedAt?.toDate(),
    };
  };

  const getTodo = () => {
    const cachedTodo = queryClient.getQueryData<ITask>(queryKey);
    return cachedTodo;
  };

  const setTodo = (todo: ITask) => {
    queryClient.setQueryData(queryKey, todo);
  };

  const unsubscribe = firestore()
    .collection(COLLECTIONS.TASKS)
    .doc(todoId)
    .onSnapshot((doc) => {
      const todoDoc = {
        ...doc.data(),
        id: doc.id,
      } as ITask;
      const todo = convert(todoDoc, doc.id);
      setTodo(todo);
    });

  return unsubscribe;
}
