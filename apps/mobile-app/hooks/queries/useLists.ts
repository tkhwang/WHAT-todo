import { useQuery } from "@tanstack/react-query";
import { IList, UserType } from "@whatTodo/models";

import { useUserLists } from "./useUserLists";
import { getListsQueryOptions } from "./queryOptions/getListsQueryOptions";
import { useListsSideEffect } from "./sideEffect/useListsSideEffect";

export function useLists<TSelected = IList[]>(
  userType: UserType,
  select?: (lists: IList[]) => TSelected,
) {
  const { data: userLists } = useUserLists(userType);

  useListsSideEffect(userType);

  return useQuery<IList[], Error, TSelected>({
    ...getListsQueryOptions(userType),
    select,
    enabled: !!userLists && userLists.length > 0,
    staleTime: Infinity,
  });
}
