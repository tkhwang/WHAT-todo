import { httpClient } from "@/utils/httpClient";
import { useMutation } from "@tanstack/react-query";
import { AuthSignupRequest, AuthSignupResponse } from "@whatTodo/models";
import { AxiosResponse } from "axios";

export function useAuthSignup() {
  return useMutation({
    mutationFn: async (requestDto: AuthSignupRequest) => {
      const response = await httpClient.post<AuthSignupRequest, AxiosResponse<AuthSignupResponse>>(
        "/auth/signup",
        requestDto
      );
      return response.data;
    }
  });
}
