import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { COLLECTIONS, DeleteTaskRequest, DeleteTaskResponse, ITask } from "@whatTodo/models";

import { httpClient } from "@/utils/httpClient";

export function useDeleteTask() {
  const router = useRouter();
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

      router.back();

      return { previousValue };
    },
    onSuccess: () => {},
    onError(error, { taskId }, context) {
      queryClient.setQueryData([COLLECTIONS.TASKS], context?.previousValue);
    },
  });
}
