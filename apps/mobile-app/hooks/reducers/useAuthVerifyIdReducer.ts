import { APP_ERRORS } from "@whatTodo/models";
import { useReducer } from "react";
import { useTranslation } from "react-i18next";
import { useAuthVerifyId } from "@/hooks/mutations/useAuthVerifyId";

// action
type ActionAuthVerifyIdUpdate = { type: "update"; id: string };
type ActionAuthVerifyIdVerify = { type: "verify"; id: string };
export type ActionAuthVerifyId = ActionAuthVerifyIdUpdate | ActionAuthVerifyIdVerify;

// state
export type StateAuthVerifyIdNames = "SHORT" | "READY" | "LONG" | "VERIFIED";
export interface StateAuthVerifyId {
  state: StateAuthVerifyIdNames;
  id: string;
  idError: string;
}

export function useAuthVerifyIdReducer() {
  const { t } = useTranslation();

  function getNextStateAndError(idText: string): { state: StateAuthVerifyIdNames; idError: string } {
    if (!idText || idText.length < 3) return { state: "SHORT", idError: t("auth.id.error.short") };
    if (idText.length > 32) return { state: "LONG", idError: t("auth.id.error.long") };
    return { state: "READY", idError: "" };
  }

  const authVerifyIdReducer = (current: StateAuthVerifyId, action: ActionAuthVerifyId): StateAuthVerifyId => {
    const currentState = current.state;
    const { state: nextState, idError } = getNextStateAndError(action.id);

    switch (action.type) {
      case "update":
        return { state: nextState, id: action.id, idError };
      case "verify":
        if (currentState === "READY") {
          return { state: "VERIFIED", id: action.id, idError };
        }
        return { state: nextState, id: action.id, idError };

      default:
        throw new Error(APP_ERRORS.AUTH.VERITY_ID_UNKNOWN_ACTION);
    }
  };

  return useReducer(authVerifyIdReducer, { state: "SHORT", id: "", idError: "" });
}
