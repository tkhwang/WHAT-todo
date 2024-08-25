import { AxiosResponse } from "axios";
import { useMutation } from "@tanstack/react-query";
import { DeleteTaskRequest, DeleteTaskResponse } from "@whatTodo/models/src/todo/dto/delete-task.dto";
import { useRouter } from "expo-router";

import { httpClient } from "@/utils/httpClient";

export function useDeleteTask() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (requestDto: DeleteTaskRequest) => {
      const response = await httpClient.post<DeleteTaskRequest, AxiosResponse<DeleteTaskResponse>>(
        "/todos/deleteTask",
        requestDto,
      );
      return response.data;
    },
    onSuccess: () => {
      router.back();
    },
  });
}
