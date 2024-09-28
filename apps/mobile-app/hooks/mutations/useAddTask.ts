import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddTaskRequest, AddTaskResponse, COLLECTIONS, ITask } from "@whatTodo/models";
import { AxiosResponse } from "axios";

import { httpClient } from "@/utils/httpClient";
import { TASK_OPTIMISTIC_ADD_KEY } from "@/constants/appConsts";

export function useAddTask() {
  const queryClient = useQueryClient();

  // const { setIsLoading } = useTaskStore();

  return useMutation({
    mutationFn: async (requestDto: AddTaskRequest) => {
      const response = await httpClient.post<AddTaskRequest, AxiosResponse<AddTaskResponse>>(
        "/tasks/addTask",
        requestDto,
      );
      return response.data;
    },
    async onMutate(newTask: AddTaskRequest) {
      // setIsLoading(true);

      await queryClient.cancelQueries({ queryKey: [COLLECTIONS.TASKS] });

      const previousTasks = queryClient.getQueryData<ITask[]>([COLLECTIONS.TASKS]);

      const newTaskWithDummyId = {
        ...newTask,
        id: `${TASK_OPTIMISTIC_ADD_KEY}-${new Date().getTime()}`,
      };

      queryClient.setQueryData([COLLECTIONS.TASKS], (old: ITask[]) => {
        if (!old) return [];
        return [newTaskWithDummyId, ...old];
      });

      return { previousTasks };
    },
    onError(error, variables, context) {
      queryClient.setQueryData([COLLECTIONS.TASKS], context?.previousTasks);
    },
    onSuccess(newTaskFromServer, newTask, context) {
      queryClient.setQueryData([COLLECTIONS.TASKS], (old: ITask[]) => {
        if (!old) return [];

        return old.map((task: ITask) => {
          if (task === newTask) return newTaskFromServer;
          return task;
        });
      });
    },
    onSettled() {
      // setIsLoading(false);
    },
  });
}
