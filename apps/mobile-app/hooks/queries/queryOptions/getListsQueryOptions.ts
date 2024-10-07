import { COLLECTIONS, IList, UserType } from "@whatTodo/models";

export const getListsQueryOptions = (userType: UserType) => {
  return {
    queryKey: [COLLECTIONS.LISTS, userType],
    queryFn: (): Promise<IList[]> => new Promise((): void => {}),
  };
};
