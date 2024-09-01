import { useMutation, useQueryClient } from "@tanstack/react-query";
import { COLLECTIONS, ITask, UpdateTaskRequest } from "@whatTodo/models";
import firestore from "@react-native-firebase/firestore";

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updateTaskRequestDto: UpdateTaskRequest) => {
      const { id: taskId } = updateTaskRequestDto;

      const cache = queryClient.getQueryData<ITask>([COLLECTIONS.TASKS, taskId]);
      if (!cache) throw new Error(`Task (${taskId}) not found`);

      const { isDone: prvIsDone, dueDate: prvDueDate, note: prvNote } = cache;
      const { isDone, dueDate, note } = updateTaskRequestDto;

      if (isDone === prvIsDone && dueDate === prvDueDate && note === prvNote) {
        return cache;
      }

      const taskRef = firestore().collection(COLLECTIONS.TASKS).doc(taskId);
      const taskSnapshot = await taskRef.get();
      if (!taskSnapshot.exists) throw new Error("Task not found");

      const updatedTask = {
        ...updateTaskRequestDto,
        isDone: updateTaskRequestDto.isDone,
        ...(updateTaskRequestDto.dueDate && { dueDate: updateTaskRequestDto.dueDate }),
        ...(updateTaskRequestDto.note && { note: updateTaskRequestDto.note }),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      };

      await taskRef.set(updatedTask);

      return cache;
    },
  });
}
