import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { IList } from "@whatTodo/models";

import { myUserIdAtom } from "@/states/me";

import { getUserListsQueryOptions } from "./queryOptions/getUserListsQueryOptions";
import { useUserListsSideEffects } from "./sideEffect/useUserListsSideEffect";

export function useUserLists() {
  const myUserId = useAtomValue(myUserIdAtom);

  useUserListsSideEffects();

  return useQuery<IList[]>({
    ...getUserListsQueryOptions(myUserId),
    enabled: !!myUserId,
    staleTime: Infinity,
  });
}
