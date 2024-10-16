import { useMutation, useQueryClient } from "@tanstack/react-query";
import { COLLECTIONS, IUserTask, ToggleTaskIsDoneRequest } from "@whatTodo/models";
import firestore from "@react-native-firebase/firestore";
import { useAtomValue } from "jotai";

import { myUserIdAtom } from "@/states/me";

export function useToggleUserTaskIsDone(listId: string) {
  const queryClient = useQueryClient();
  const myUserId = useAtomValue(myUserIdAtom);

  return useMutation({
    mutationFn: async ({ taskId }: ToggleTaskIsDoneRequest) => {
      const userTaskRef = firestore()
        .collection(COLLECTIONS.USERS)
        .doc(myUserId)
        .collection(COLLECTIONS.TASKS)
        .doc(taskId);

      const taskSnapshot = await userTaskRef.get();
      if (!taskSnapshot.exists) throw new Error("Task not found");

      const taskData = taskSnapshot.data();

      await userTaskRef.set({
        ...taskData,
        isDone: !taskData?.isDone,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
    },
    // TODO: check optimistic update
    // onMutate: async ({ taskId }) => {
    //   const key = [COLLECTIONS.USERS, myUserId, COLLECTIONS.TASKS, listId];

    //   await queryClient.cancelQueries({ queryKey: key });
    //   const previousTasks = queryClient.getQueryData(key);

    //   queryClient.setQueryData(key, (prv: IUserTask[]) => {
    //     if (!prv) return [];

    //     return prv.map((userTask: IUserTask) => {
    //       if (userTask.id !== taskId) return userTask;

    //       return {
    //         ...userTask,
    //         isDone: !userTask.isDone,
    //       };
    //     });
    //   });

    //   return { previousTasks };
    // },
    // onError: (_, { taskId }, context) => {
    //   const key = [COLLECTIONS.USERS, myUserId, COLLECTIONS.TASKS, listId];
    //   queryClient.setQueryData(key, context?.previousTasks);
    // },
  });
}
