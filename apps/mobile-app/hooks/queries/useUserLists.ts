import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { IList } from "@whatTodo/models";

import { myUserIdAtom } from "@/states/me";

import { useUserListsQueryOptions } from "./queryOptions/useUserListsQueryOptions";

export function useUserLists() {
  const myUserId = useAtomValue(myUserIdAtom);

  return useQuery<IList[]>({
    ...useUserListsQueryOptions(),
    enabled: !!myUserId,
    staleTime: Infinity,
  });
}
