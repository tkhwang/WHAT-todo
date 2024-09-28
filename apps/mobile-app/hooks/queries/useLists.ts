import { useQuery } from "@tanstack/react-query";
import { IList } from "@whatTodo/models";

import { useUserLists } from "./useUserLists";
import { getListsQueryOptions } from "./queryOptions/getListsQueryOptions";
import { useListsSideEffect } from "./sideEffect/useListsSideEffect";

export function useLists<TSelected = IList[]>(select?: (lists: IList[]) => TSelected) {
  const { data: userLists } = useUserLists();

  useListsSideEffect();

  return useQuery<IList[], Error, TSelected>({
    ...getListsQueryOptions(),
    select,
    enabled: !!userLists && userLists.length > 0,
    staleTime: Infinity,
  });
}
