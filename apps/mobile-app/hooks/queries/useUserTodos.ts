import { useQuery } from "@tanstack/react-query";
import { COLLECTIONS } from "@whatTodo/models";
import { useAtomValue } from "jotai";

import { myUserIdAtom } from "@/states/me";

export function useUserTodos() {
  const myUserId = useAtomValue(myUserIdAtom);

  return useQuery({
    queryKey: [COLLECTIONS.USERS, myUserId, COLLECTIONS.TODOS],
  });
}
