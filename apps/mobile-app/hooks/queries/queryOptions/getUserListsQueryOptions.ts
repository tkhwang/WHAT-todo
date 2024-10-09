import { COLLECTIONS, IList, UserType } from "@whatTodo/models";

export function getUserListsQueryOptions(myUserId: string, userType: UserType) {
  return {
    queryKey: [COLLECTIONS.USERS, myUserId, COLLECTIONS.LISTS, userType],
    queryFn: (): Promise<IList[]> => new Promise((): void => {}),
  };
}
