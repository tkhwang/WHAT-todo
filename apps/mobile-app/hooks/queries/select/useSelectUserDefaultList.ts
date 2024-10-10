import { IList } from "@whatTodo/models";
import { useCallback } from "react";

export function useSelectUserDefaultList() {
  const selectUserDefaultList = useCallback((data?: IList[]) => {
    if (!data) return undefined;

    return data.find((list) => list.listType === "defaultUserList");
  }, []);

  return { selectUserDefaultList };
}
