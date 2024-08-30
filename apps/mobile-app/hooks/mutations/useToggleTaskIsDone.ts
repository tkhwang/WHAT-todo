import { useMutation, useQueryClient } from "@tanstack/react-query";
import { COLLECTIONS, ITask, ToggleTaskIsDoneRequest } from "@whatTodo/models";
import firestore from "@react-native-firebase/firestore";

export function useToggleTaskIsDone() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ taskId }: ToggleTaskIsDoneRequest) => {
      const taskRef = firestore().collection(COLLECTIONS.TASKS).doc(taskId);

      const taskSnapshot = await taskRef.get();
      if (!taskSnapshot.exists) throw new Error("Task not found");

      const taskData = taskSnapshot.data();

      await taskRef.set({
        ...taskData,
        isDone: !taskData?.isDone,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
    },
    onMutate: async ({ taskId }) => {
      const key = [COLLECTIONS.TASKS, taskId];

      await queryClient.cancelQueries({ queryKey: [COLLECTIONS.TASKS, taskId] });
      const previousTask = queryClient.getQueryData(key);

      queryClient.setQueryData(key, (prv: ITask) => ({
        ...prv,
        isDone: !prv?.isDone,
        updatedAt: new Date().toISOString(),
      }));

      return { previousTask };
    },
    onError: (_, { taskId }, context) => {
      const key = [COLLECTIONS.TASKS, taskId];
      queryClient.setQueryData(key, context?.previousTask);
    },
  });
}
