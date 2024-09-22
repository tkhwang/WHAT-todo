import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import firestore from "@react-native-firebase/firestore";
import { COLLECTIONS, IList } from "@whatTodo/models";

import { IListFS } from "@/types";

import { useUserLists } from "./useUserLists";
import { useFirestore } from "../useFirestore";

export function useLists<TSelected = IList[]>(select?: (lists: IList[]) => TSelected) {
  const { data: userLists } = useUserLists();

  const { convert, setDoc, setDocs } = useFirestore();

  const listIds = useMemo(() => {
    return (userLists ?? []).map((userList) => userList.id);
  }, [userLists]);

  useEffect(
    function useListsEffect() {
      if (!listIds.length) return undefined;

      const key = [COLLECTIONS.LISTS];
      const unusbscribe = firestore()
        .collection(COLLECTIONS.LISTS)
        .where(firestore.FieldPath.documentId(), "in", listIds)
        .onSnapshot((snapshot) => {
          if (!snapshot) return;

          const lists = snapshot.docs.map((doc) => {
            const listDoc = doc.data() as IListFS;
            return convert(listDoc, doc.id);
          });
          setDocs(key, lists);
        });

      return () => {
        unusbscribe();
      };
    },
    [convert, listIds, setDoc, setDocs],
  );

  return useQuery<IList[], Error, TSelected>({
    queryKey: [COLLECTIONS.LISTS],
    queryFn: () => new Promise((): void => {}),
    select,
    enabled: !!userLists && userLists.length > 0,
    staleTime: Infinity,
  });
}
