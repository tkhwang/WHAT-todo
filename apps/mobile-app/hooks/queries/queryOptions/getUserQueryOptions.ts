import { COLLECTIONS } from "@whatTodo/models";

import { IUserFS } from "@/types";

export function getUserQueryOptions(userId?: string) {
  return {
    queryKey: [COLLECTIONS.USERS, userId],
    queryFn: (): Promise<IUserFS> => new Promise((): void => {}),
  };
}
