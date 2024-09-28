import { COLLECTIONS, IList } from "@whatTodo/models";

export const getListsQueryOptions = () => {
  return {
    queryKey: [COLLECTIONS.LISTS],
    queryFn: (): Promise<IList[]> => new Promise((): void => {}),
  };
};
