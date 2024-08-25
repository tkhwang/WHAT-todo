import { useMutation } from "@tanstack/react-query";
import { AddTaskRequest, AddTaskResponse } from "@whatTodo/models";
import { AxiosResponse } from "axios";

import { httpClient } from "@/utils/httpClient";
import { useTodoStore } from "@/stores/todo";

export function useAddTodo() {
  const { setIsLoading } = useTodoStore();

  return useMutation({
    mutationFn: async (requestDto: AddTaskRequest) => {
      const response = await httpClient.post<AddTaskRequest, AxiosResponse<AddTaskResponse>>(
        "/todos/addTodo",
        requestDto,
      );
      return response.data;
    },
    onMutate() {
      setIsLoading(true);
    },
    onError() {
      setIsLoading(false);
    },
    onSuccess() {
      setIsLoading(true);
    },
  });
}
