import { COLLECTIONS, IList } from "@whatTodo/models";

export function getUserListsQueryOptions(myUserId: string) {
  return {
    queryKey: [COLLECTIONS.USERS, myUserId, COLLECTIONS.LISTS],
    queryFn: (): Promise<IList[]> => new Promise((): void => {}),
  };
}
