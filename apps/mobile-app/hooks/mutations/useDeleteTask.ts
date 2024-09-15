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
      const previousValue = queryClient.getQueryData([COLLECTIONS.TASKS, taskId]);

      queryClient.setQueryData([COLLECTIONS.TASKS, taskId], undefined);

      router.back();

      return { previousValue };
    },
    onSuccess: () => {
      // do nothing
    },
    onError(error, { taskId }, context) {
      console.error(`[-][useDeleteTask] optimistic delete failed: ${error}`);
      queryClient.setQueryData([COLLECTIONS.TASKS, taskId], context?.previousValue);
    },
  });
}
