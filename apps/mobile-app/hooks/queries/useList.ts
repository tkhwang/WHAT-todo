import { useQuery } from "@tanstack/react-query";
import { COLLECTIONS, IList } from "@whatTodo/models";
import { useEffect, useMemo } from "react";
import firestore from "@react-native-firebase/firestore";

import { IListFS } from "@/types";

import { useFirestore } from "../useFirestore";

export function useList(listId: string) {
  const key = useMemo(() => {
    return [COLLECTIONS.LISTS, listId];
  }, [listId]);

  const { convert, setDoc } = useFirestore<IListFS, IList>();

  useEffect(
    function setupListEffect() {
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

      return () => unsubscribe();
    },
    [convert, key, listId, setDoc],
  );

  return useQuery<IList>({
    queryKey: key,
    queryFn: () => new Promise((): void => {}),
    enabled: !!listId,
    staleTime: Infinity,
  });
}
