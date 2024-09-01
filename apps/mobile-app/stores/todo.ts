import {
  COLLECTIONS,
  INIT_TASKSTORE_STATE,
  ITask,
  TaskStoreActions,
  TaskStoreState,
} from "@whatTodo/models";
import { create } from "zustand";
import uuid from "react-native-uuid";
import { QueryClient } from "@tanstack/react-query";

import { TASK_OPTIMISTIC_ADD_KEY } from "@/constants/appConsts";

export const useTaskStore = create<TaskStoreState & TaskStoreActions>((set, get) => ({
  ...INIT_TASKSTORE_STATE,
  load: (task: ITask) => {
    set({
      id: task.id,
      task: task.task,
      listId: task.listId,
      userId: task.userId,
      isDone: task.isDone,
      isLoading: false,
      ...(task.dueDate && { dueDate: task.dueDate }),
      ...(task.note && { note: task.note }),
    });
  },
  new: (userId: string, listId: string) => {
    set({
      id: `${TASK_OPTIMISTIC_ADD_KEY}-${uuid.v4()}`,
      userId,
      listId,
      task: "",
      isDone: false,
      isLoading: false,
    });
  },
  setDueDate: (dueDate: Date) => set({ dueDate }),
  updateTask: (task: string) => set({ task }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  toggleIsDone: () => set({ isDone: !get().isDone }),
  reset: () => set(INIT_TASKSTORE_STATE),
  saveToFirestore: async (cachedTask: ITask) => {
    const { task, isDone, listId, userId, dueDate, note } = get();
    const {
      task: prvTask,
      isDone: prvIsDone,
      listId: prvListId,
      userId: prvUserId,
      dueDate: prvDueDate,
      note: prvNote,
    } = cachedTask;

    if (
      task === prvTask &&
      isDone === prvIsDone &&
      listId === prvListId &&
      userId === prvUserId &&
      dueDate === prvDueDate &&
      note === prvNote
    ) {
      return;
    }

    const updatedTask = {
      task,
      isDone,
      listId,
      userId,
      ...(dueDate && { dueDate }),
      ...(note && { note }),
    };
  },
}));
