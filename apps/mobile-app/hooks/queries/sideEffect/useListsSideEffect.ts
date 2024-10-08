import { useEffect, useMemo } from "react";
import firestore from "@react-native-firebase/firestore";
import { COLLECTIONS, UserType } from "@whatTodo/models";

import { useFirestore } from "@/hooks/useFirestore";
import { IListFS } from "@/types";

import { useUserLists } from "../useUserLists";

export function useListsSideEffect(userType: UserType) {
  const { convert, setDoc, setDocs } = useFirestore();

  const { data: userLists } = useUserLists(userType);

  const listIds = useMemo(() => {
    return (userLists ?? []).map((userList) => userList.id);
  }, [userLists]);

  useEffect(
    function useListsEffect() {
      if (!listIds.length) return undefined;

      const key = [COLLECTIONS.LISTS, userType];
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
    [convert, listIds, setDoc, setDocs, userType],
  );
}
