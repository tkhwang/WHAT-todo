import { useQuery } from "@tanstack/react-query";

import { IUserFS } from "@/types";

import { getUserQueryOptions } from "./queryOptions/getUserQueryOptions";
import { useUserSideEffect } from "./sideEffect/useUserSideEffect";

export function useUser(userId?: string) {
  useUserSideEffect(userId);

  return useQuery<IUserFS, Error>({
    ...getUserQueryOptions(userId),
    enabled: !!userId,
    staleTime: Infinity,
  });
}
