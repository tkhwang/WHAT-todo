import { useMutation } from "@tanstack/react-query";
import { AddTodoRequest, AddTodoResponse } from "@whatTodo/models";
import { AxiosResponse } from "axios";

import { httpClient } from "@/utils/httpClient";

import { useAddTodoReducer } from "../reducers/useAddTodoReducer";

export function useAddTodo() {
  const [, addTodoDispatch] = useAddTodoReducer();

  return useMutation({
    mutationFn: async (requestDto: AddTodoRequest) => {
      const response = await httpClient.post<AddTodoRequest, AxiosResponse<AddTodoResponse>>(
        "/todos/addTodo",
        requestDto,
      );
      return response.data;
    },
    onError(error) {
      addTodoDispatch({ type: "ERROR", addTodoErrorMessage: error.message });
    },
    onSuccess() {
      addTodoDispatch({ type: "UPLOAD_DONE" });
    },
  });
}
