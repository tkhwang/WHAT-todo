import { APP_ERRORS } from "@whatTodo/models";
import { useReducer } from "react";
import { useTranslation } from "react-i18next";

// action
type ActionAuthNameUpdate = { type: "update"; name: string };
export type ActionAuthName = ActionAuthNameUpdate;

// state
export type StateAuthNameNames = "SHORT" | "READY" | "LONG";
export interface StateAuthName {
  state: StateAuthNameNames;
  name: string;
  nameError: string;
}

export function useAuthNameReducer() {
  const { t } = useTranslation();

  function getNextStateAndError(nameText: string): {
    state: StateAuthNameNames;
    nameError: string;
  } {
    if (!nameText) return { state: "SHORT", nameError: t("auth.name.error.short") };
    if (nameText.length > 32) return { state: "LONG", nameError: t("auth.name.error.long") };
    return { state: "READY", nameError: "" };
  }

  const authNameReducer = (current: StateAuthName, action: ActionAuthName): StateAuthName => {
    const currentState = current.state;
    const { state: nextState, nameError } = getNextStateAndError(action.name);

    switch (action.type) {
      case "update":
        return {
          state: nextState,
          name: action.name,
          nameError,
        };
      default:
        throw new Error(APP_ERRORS.AUTH.VERITY_NAME_UNKNOWN_ACTION);
    }
  };

  return useReducer(authNameReducer, { state: "SHORT", name: "", nameError: "" });
}
