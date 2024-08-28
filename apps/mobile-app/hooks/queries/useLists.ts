import { useQueries } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import firestore from "@react-native-firebase/firestore";
import { COLLECTIONS, IList } from "@whatTodo/models";

import { IListFS } from "@/types";

import { useUserLists } from "./useUserLists";
import { useFirestore } from "../useFirestore";

export function useLists() {
  const { data: userLists } = useUserLists();

  const { convert, setDoc } = useFirestore();

  const listIds = useMemo(() => {
    return (userLists ?? []).map((userList) => userList.id);
  }, [userLists]);

  useEffect(
    function useListsEffect() {
      const unsubscribes: (() => void)[] = [];

      // eslint-disable-next-line no-restricted-syntax
      for (const listId of listIds) {
        const key = [COLLECTIONS.LISTS, listId];
        const unsubscribe = firestore()
          .collection(COLLECTIONS.LISTS)
          .doc(listId)
          .onSnapshot((doc) => {
            const listDoc = {
              id: doc.id,
              ...doc.data(),
            } as IListFS;
            const list = convert(listDoc, doc.id);
            setDoc(key, list);
          });

        unsubscribes.push(unsubscribe);
      }

      return () => {
        unsubscribes.forEach((unsubscribe) => unsubscribe());
      };
    },
    [convert, listIds, setDoc],
  );

  return useQueries({
    queries:
      listIds?.map((listId) => ({
        queryKey: [COLLECTIONS.LISTS, listId],
        queryFn: () => new Promise((): void => {}),
        enabled: !!listId,
        staleTime: Infinity,
      })) ?? [],

    combine: (results) => {
      const sortedListsByUpdatedAt = results
        .flatMap((result) => (result.data ? [result.data as IList] : []))
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      return {
        data: sortedListsByUpdatedAt,
        arePending: results.some((result) => result.isPending),
      };
    },
  });
}
