import { COLLECTIONS, IUserTask } from "@whatTodo/models";

export function getUserTasksQueryOptions(myUserId: string, listId: string) {
  return {
    queryKey: [COLLECTIONS.USERS, myUserId, COLLECTIONS.TASKS, listId],
    queryFn: (): Promise<IUserTask[]> => new Promise((): void => {}),
  };
}
