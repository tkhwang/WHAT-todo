import { useMutation } from "@tanstack/react-query";
import { COLLECTIONS, ToggleTaskIsDoneRequest } from "@whatTodo/models";
import firestore from "@react-native-firebase/firestore";

export function useToggleTaskIsDone() {
  return useMutation({
    mutationFn: async ({ taskId }: ToggleTaskIsDoneRequest) => {
      const taskRef = firestore().collection(COLLECTIONS.TASKS).doc(taskId);

      const taskSnapshot = await taskRef.get();
      if (!taskSnapshot.exists) throw new Error("Task not found");

      const taskData = taskSnapshot.data();
      const toggledIsDone = !taskData?.isDone;

      await taskRef.update({ isDone: toggledIsDone });
    },
  });
}
