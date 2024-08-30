import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddTaskRequest, AddTaskResponse, COLLECTIONS, ITask } from "@whatTodo/models";
import { AxiosResponse } from "axios";
import uuid from "react-native-uuid";

import { httpClient } from "@/utils/httpClient";
import { useTaskStore } from "@/stores/todo";
import { TASK_OPTIMISTIC_ADD_KEY } from "@/constants/appConsts";

export function useAddTask() {
  const { setIsLoading } = useTaskStore();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (requestDto: AddTaskRequest) => {
      const response = await httpClient.post<AddTaskRequest, AxiosResponse<AddTaskResponse>>(
        "/tasks/addTask",
        requestDto,
      );
      return response.data;
    },
    onMutate: async (variables: AddTaskRequest) => {
      setIsLoading(true);

      await queryClient.cancelQueries({ queryKey: [COLLECTIONS.TASKS] });

      const previousTasks = queryClient.getQueryData([COLLECTIONS.TASKS]);
      const optimisticTask = { ...variables, id: `${TASK_OPTIMISTIC_ADD_KEY}-${uuid.v4()}` };
      queryClient.setQueryData([COLLECTIONS.TASKS], (prvs: ITask[] | undefined) => {
        if (!prvs) return [];
        return [...prvs, optimisticTask];
      });

      setIsLoading(false);
      return { previousTasks, optimisticTask };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData([COLLECTIONS.TASKS], context?.previousTasks);
    },
    onSuccess: (data, variables, context) => {
      // Replace the optimistic task with the actual task from the server
      queryClient.setQueryData<ITask[]>([COLLECTIONS.TASKS], (old) => {
        if (!old) return [];

        return old.map((task) =>
          task.id === context?.optimisticTask.id ? { ...task, id: task.id } : task,
        );
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });
}
