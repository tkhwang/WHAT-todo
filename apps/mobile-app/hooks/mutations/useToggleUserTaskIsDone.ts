import { useMutation, useQueryClient } from "@tanstack/react-query";
import { COLLECTIONS, ITask, ToggleTaskIsDoneRequest } from "@whatTodo/models";
import firestore from "@react-native-firebase/firestore";
import { useAtomValue } from "jotai";

import { myUserIdAtom } from "@/states/me";

export function useToggleUserTaskIsDone() {
  const queryClient = useQueryClient();
  const myUserId = useAtomValue(myUserIdAtom);

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
      const key = [COLLECTIONS.TASKS];

      await queryClient.cancelQueries({ queryKey: [COLLECTIONS.TASKS] });
      const previousTask = queryClient.getQueryData(key);

      queryClient.setQueryData(key, (prv: ITask[]) => {
        if (!prv) return [];

        return prv.map((task) => {
          if (task.id !== taskId) return task;

          return {
            ...task,
            isDone: !task.isDone,
          };
        });
      });

      return { previousTask };
    },
    onError: (_, { taskId }, context) => {
      const key = [COLLECTIONS.TASKS];
      queryClient.setQueryData(key, context?.previousTask);
    },
  });
}
