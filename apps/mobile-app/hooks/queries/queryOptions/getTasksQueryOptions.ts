import { COLLECTIONS, ITask } from "@whatTodo/models";

export function getTasksQueryOptions(listId: string) {
  return {
    queryKey: [COLLECTIONS.TASKS, listId],
    queryFn: (): Promise<ITask[]> => new Promise((): void => {}),
  };
}
