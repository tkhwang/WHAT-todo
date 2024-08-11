import { useMutation } from "@tanstack/react-query";
import { AuthVerifyIdRequest, AuthVerifyIdResonse } from "@whatTodo/models";
import { AxiosResponse } from "axios";

import { httpClient } from "@/utils/httpClient";

export function useAuthVerifyId() {
  return useMutation({
    mutationFn: async (requestDto: AuthVerifyIdRequest) => {
      const response = await httpClient.post<AuthVerifyIdRequest, AxiosResponse<AuthVerifyIdResonse>>(
        "/auth/verifyId",
        requestDto,
      );
      return response.data;
    },
    onError: (error) => {
      console.error(`[-][useAuthVerifyId] /auth/verifyId faild : ${error.message}`);
    },
  });
}
