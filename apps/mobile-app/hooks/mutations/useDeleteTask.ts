import { AxiosResponse } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { DeleteTaskRequest, DeleteTaskResponse } from "@whatTodo/models";

import { httpClient } from "@/utils/httpClient";

export function useDeleteTask() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (requestDto: DeleteTaskRequest) => {
      const response = await httpClient.post<DeleteTaskRequest, AxiosResponse<DeleteTaskResponse>>(
        "/tasks/deleteTask",
        requestDto,
      );
      return response.data;
    },
    onSuccess: () => {
      router.back();
    },
  });
}
