import { IList } from "@whatTodo/models";
import { useCallback } from "react";

export function useSelectListByListId(listId?: string) {
  const selectListByListId = useCallback(
    (data: IList[]) => {
      if (!listId) return undefined;

      return data.find((list) => list.id === listId);
    },
    [listId],
  );

  return { selectListByListId };
}
