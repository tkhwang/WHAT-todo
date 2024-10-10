import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { IList, UserType } from "@whatTodo/models";

import { myUserIdAtom } from "@/states/me";

import { getUserListsQueryOptions } from "./queryOptions/getUserListsQueryOptions";
import { useUserListsSideEffects } from "./sideEffect/useUserListsSideEffect";

export function useUserLists<TSelected = IList[]>(
  userType: UserType,
  select?: (lists: IList[]) => TSelected,
) {
  const myUserId = useAtomValue(myUserIdAtom);

  useUserListsSideEffects(userType);

  return useQuery<IList[], Error, TSelected>({
    ...getUserListsQueryOptions(myUserId, userType),
    enabled: !!myUserId,
    staleTime: Infinity,
    select,
  });
}
