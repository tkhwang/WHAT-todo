import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SendTodoRequest, SendTodoResponse } from "@whatTodo/models";

import { httpClient } from "@/utils";

export function useSendTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (requestDto: SendTodoRequest) => {
      const response = await httpClient.post<SendTodoRequest, AxiosResponse<SendTodoResponse>>(
        "/todos/sendTodo",
        requestDto,
      );
      return response.data;
    },
  });
}
