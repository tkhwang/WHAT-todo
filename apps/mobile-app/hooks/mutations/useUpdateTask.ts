import { useMutation, useQueryClient } from "@tanstack/react-query";
import { COLLECTIONS, ITask, UpdateTaskRequest } from "@whatTodo/models";
import firestore from "@react-native-firebase/firestore";

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updateTaskRequestDto: UpdateTaskRequest) => {
      const { listId } = updateTaskRequestDto;
      const { id: taskId } = updateTaskRequestDto;

      const allCachedTasks = queryClient.getQueryData<ITask[]>([COLLECTIONS.TASKS, listId]);
      const cachedTask = allCachedTasks?.find((task) => task.id === taskId);
      if (!cachedTask) throw new Error(`Task (${taskId}) not found`);

      const { dueDate: prvDueDate, note: prvNote, taskType: prvTaskType } = cachedTask;
      const { dueDate, note, taskType } = updateTaskRequestDto;

      if (dueDate === prvDueDate && note === prvNote && prvTaskType === taskType) {
        console.log(`[+][useUpdateTask] nothing changed and skipped update`);
        return cachedTask;
      }

      const taskRef = firestore().collection(COLLECTIONS.TASKS).doc(taskId);
      const taskSnapshot = await taskRef.get();
      if (!taskSnapshot.exists) throw new Error("Task not found");

      const updatedTask = {
        ...updateTaskRequestDto,
        ...(updateTaskRequestDto.dueDate && { dueDate: updateTaskRequestDto.dueDate }),
        ...(updateTaskRequestDto.note && { note: updateTaskRequestDto.note }),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      };

      if (!updateTaskRequestDto.note || updateTaskRequestDto.note === "") delete updatedTask.note;
      if (!updateTaskRequestDto.dueDate) delete updatedTask.dueDate;

      await taskRef.set(updatedTask);

      return cachedTask;
    },
  });
}
