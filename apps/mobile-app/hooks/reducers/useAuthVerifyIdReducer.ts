import { APP_ERRORS } from "@whatTodo/models";
import { useReducer } from "react";
import { useTranslation } from "react-i18next";

// action
type ActionAuthVerifyIdUpdate = { type: "update"; id: string };
type ActionAuthVerifyIdVerify = { type: "verify"; id: string };
type ActionAuthVerifyIdDuplicate = { type: "duplicate"; id: string };
export type ActionAuthVerifyId = ActionAuthVerifyIdUpdate | ActionAuthVerifyIdVerify | ActionAuthVerifyIdDuplicate;

// state
export type StateAuthVerifyIdNames = "SHORT" | "READY" | "LONG" | "DUPLICATE" | "VERIFIED";
export interface StateAuthVerifyId {
  state: StateAuthVerifyIdNames;
  id: string;
  idError: string;
}

export function useAuthVerifyIdReducer() {
  const { t } = useTranslation();

  function getNextStateAndError(action: ActionAuthVerifyId): { state: StateAuthVerifyIdNames; idError: string } {
    const { type, id: idText } = action;

    if (type === "duplicate") return { state: "DUPLICATE", idError: t("auth.id.error.duplicate") };

    if (!idText || idText.length < 3) return { state: "SHORT", idError: t("auth.id.error.short") };
    if (idText.length > 32) return { state: "LONG", idError: t("auth.id.error.long") };

    return { state: "READY", idError: "" };
  }

  const authVerifyIdReducer = (current: StateAuthVerifyId, action: ActionAuthVerifyId): StateAuthVerifyId => {
    const currentState = current.state;
    const { state: nextState, idError } = getNextStateAndError(action);

    switch (action.type) {
      case "update":
        return { state: nextState, id: action.id, idError };
      case "verify":
        if (currentState === "READY") {
          return { state: "VERIFIED", id: action.id, idError };
        }
        return { state: nextState, id: action.id, idError };
      case "duplicate":
        return { state: "DUPLICATE", id: action.id, idError };

      default:
        throw new Error(APP_ERRORS.AUTH.VERITY_ID_UNKNOWN_ACTION);
    }
  };

  return useReducer(authVerifyIdReducer, { state: "SHORT", id: "", idError: "" });
}
