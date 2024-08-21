import { QueryClient } from "@tanstack/react-query";
import { COLLECTIONS, ITodo } from "@whatTodo/models";
import firestore from "@react-native-firebase/firestore";

export function updateTodoCache(todoId: string, queryClient: QueryClient) {
  const queryKey = [COLLECTIONS.TODOS, todoId];

  const convert = (todoDoc: ITodo, docId: string) => {
    const { createdAt, updatedAt } = todoDoc;
    return {
      ...todoDoc,
      id: docId,
      createdAt: createdAt.toDate(),
      updatedAt: updatedAt.toDate(),
    };
  };

  const getTodo = () => {
    const cachedTodo = queryClient.getQueryData<ITodo>(queryKey);
    return cachedTodo;
  };

  const setTodo = (todo: ITodo) => {
    queryClient.setQueryData(queryKey, todo);
  };

  const unsubscribe = firestore()
    .collection(COLLECTIONS.TODOS)
    .doc(todoId)
    .onSnapshot((doc) => {
      const todoDoc = {
        ...doc.data(),
        id: doc.id,
      } as ITodo;
      const todo = convert(todoDoc, doc.id);
      setTodo(todo);
    });

  return unsubscribe;
}
