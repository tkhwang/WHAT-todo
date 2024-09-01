import { useMutation, useQueryClient } from "@tanstack/react-query";
import { COLLECTIONS, ITask, UpdateTaskRequest } from "@whatTodo/models";
import firestore from "@react-native-firebase/firestore";

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ taskId }: UpdateTaskRequest) => {
      const cache = queryClient.getQueryData<ITask>([COLLECTIONS.TASKS, taskId]);
      if (!cache) throw new Error(`Task (${taskId}) not found`);

      const { isLocalUpdated = false, ...cachedTask } = cache;
      if (!isLocalUpdated) return {};

      const taskRef = firestore().collection(COLLECTIONS.TASKS).doc(taskId);
      const taskSnapshot = await taskRef.get();
      if (!taskSnapshot.exists) throw new Error("Task not found");

      const updatedTask = {
        ...cachedTask,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      };
      await taskRef.update(updatedTask);
      console.log("🚀 ~ mutationFn: ~ updatedTask:", updatedTask);

      return cachedTask;
    },
    onMutate: async ({ taskId }) => {
      const previousTask = queryClient.getQueryData<ITask>([COLLECTIONS.TASKS, taskId]);
      if (!previousTask) throw new Error(`Task (${taskId}) not found`);

      const updatedTask = {
        ...previousTask,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      };

      queryClient.setQueryData([COLLECTIONS.TASKS, taskId], updatedTask);
      return { previousTask };
    },
    onError: (error, { taskId }, context) => {
      queryClient.setQueryData([COLLECTIONS.TASKS, taskId], context?.previousTask);
    },
  });
}
