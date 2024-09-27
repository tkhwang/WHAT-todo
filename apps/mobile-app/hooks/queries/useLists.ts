import { useQuery } from "@tanstack/react-query";
import { IList } from "@whatTodo/models";

import { useUserLists } from "./useUserLists";
import { useListsQueryOptions } from "./queryOptions/useListsQueryOptions";

export function useLists<TSelected = IList[]>(select?: (lists: IList[]) => TSelected) {
  const { data: userLists } = useUserLists();

  return useQuery<IList[], Error, TSelected>({
    ...useListsQueryOptions(),
    select,
    enabled: !!userLists && userLists.length > 0,
    staleTime: Infinity,
  });
}
