import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { COLLECTIONS, DeleteTaskRequest, DeleteTaskResponse, ITask } from "@whatTodo/models";

import { httpClient } from "@/utils/httpClient";

export function useDeleteTask(onDelete?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (requestDto: DeleteTaskRequest) => {
      const response = await httpClient.post<DeleteTaskRequest, AxiosResponse<DeleteTaskResponse>>(
        "/tasks/deleteTask",
        requestDto,
      );
      return response.data;
    },
    onMutate({ taskId }) {
      const previousValue = queryClient.getQueryData<ITask[]>([COLLECTIONS.TASKS]);
      const deletedTasks = (previousValue ?? []).filter((task) => task.id !== taskId);
      queryClient.setQueryData([COLLECTIONS.TASKS], deletedTasks);

      if (onDelete) onDelete();

      return { previousValue };
    },
    onSuccess: () => {},
    onError(error, { taskId }, context) {
      queryClient.setQueryData([COLLECTIONS.TASKS], context?.previousValue);
    },
  });
}
