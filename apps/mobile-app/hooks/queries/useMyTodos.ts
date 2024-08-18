import { useQuery } from "@tanstack/react-query";
import { COLLECTIONS } from "@whatTodo/models";
import { useAtomValue } from "jotai";

import { myIdAtom } from "@/states/me";

export function useMyTodos() {
  const myId = useAtomValue(myIdAtom);

  return useQuery({
    queryKey: [COLLECTIONS.USERS, myId, COLLECTIONS.TODOS],
  });
}
