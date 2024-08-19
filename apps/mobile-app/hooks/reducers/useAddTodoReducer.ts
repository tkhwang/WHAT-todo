import { APP_ERRORS } from "@whatTodo/models";
import { useReducer } from "react";

// state
type StateAddTodoNames = "INITIAL" | "EDITING" | "UPLOADING" | "ERROR";
export interface StateAddTodo {
  state: StateAddTodoNames;
  isAddTodoLoading: boolean;
  addTodoError: string | null;
}

// action
type ActionAddTodoInitial = { type: "INITIAL" };
type ActionAddTodoEditing = { type: "EDITING" };
type ActionAddTodoUpload = { type: "UPLOAD" };
type ActionAddTodoUploadDone = { type: "UPLOAD_DONE" };
type ActionAddTodoError = { type: "ERROR"; addTodoErrorMessage: string };

export type ActionAddTodo =
  | ActionAddTodoInitial
  | ActionAddTodoEditing
  | ActionAddTodoUpload
  | ActionAddTodoUploadDone
  | ActionAddTodoError;

export function useAddTodoReducer() {
  function addTodoReducer(current: StateAddTodo, action: ActionAddTodo): StateAddTodo {
    switch (action.type) {
      case "INITIAL":
        return {
          state: "INITIAL",
          isAddTodoLoading: false,
          addTodoError: null,
        };
      case "EDITING":
        return {
          state: "EDITING",
          isAddTodoLoading: false,
          addTodoError: null,
        };
      case "UPLOAD":
        return {
          state: "UPLOADING",
          isAddTodoLoading: true,
          addTodoError: null,
        };
      case "UPLOAD_DONE":
        return {
          state: "INITIAL",
          isAddTodoLoading: false,
          addTodoError: null,
        };
      case "ERROR":
        return {
          state: "ERROR",
          addTodoError: action.addTodoErrorMessage,
          isAddTodoLoading: false,
        };

      default:
        throw new Error(APP_ERRORS.AddTodo.ADD_TODO_UNKNOWN_ACTION);
    }
  }

  return useReducer(addTodoReducer, {
    state: "INITIAL",
    isAddTodoLoading: false,
    addTodoError: null,
  });
}
