import { useMutation } from "@tanstack/react-query";
import { AuthSignupRequest, AuthSignupResponse, COLLECTIONS } from "@whatTodo/models";
import { AxiosResponse } from "axios";
import firestore from "@react-native-firebase/firestore";

import { httpClient } from "@/utils/httpClient";
import { useAuth } from "@/context/AuthProvider";

export function useAuthSignup() {
  const { user, setUser } = useAuth();

  return useMutation({
    mutationFn: async (requestDto: AuthSignupRequest) => {
      const response = await httpClient.post<AuthSignupRequest, AxiosResponse<AuthSignupResponse>>(
        "/auth/signup",
        requestDto,
      );
      return response.data;
    },
    onSuccess: async (data, variables, context) => {
      const { id } = variables;

      const userDocRef = await firestore().collection(COLLECTIONS.USERS).doc(id).get();
      if (!userDocRef.exists) return;

      const userDoc = {
        id: userDocRef.id,
        ...userDocRef.data(),
      };

      setUser(userDoc);
    },
  });
}
