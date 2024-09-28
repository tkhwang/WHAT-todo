import { COLLECTIONS, ITask } from "@whatTodo/models";

export function getTasksQueryOptions() {
  return {
    queryKey: [COLLECTIONS.TASKS],
    queryFn: (): Promise<ITask[]> => new Promise((): void => {}),
  };
}
