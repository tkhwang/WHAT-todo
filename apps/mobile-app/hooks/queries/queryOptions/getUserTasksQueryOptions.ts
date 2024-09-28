import { COLLECTIONS, ITask } from "@whatTodo/models";

export function getUserTasksQueryOptions(myUserId: string, listId: string) {
  return {
    queryKey: [COLLECTIONS.USERS, myUserId, COLLECTIONS.TASKS, listId],
    queryFn: (): Promise<ITask[]> => new Promise((): void => {}),
  };
}
