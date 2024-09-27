import { COLLECTIONS, IList } from "@whatTodo/models";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

import { useFirestore } from "@/hooks/useFirestore";
import { myUserIdAtom } from "@/states/me";
import { IListFS } from "@/types";
import { FirestoreSnapshotListener } from "@/firestore/FirestoreSnapshotListner";

export const useUserListsQueryOptions = () => {
  const myUserId = useAtomValue(myUserIdAtom);

  const { convert, getDocs, setDocs } = useFirestore<IListFS, IList>();

  useEffect(
    function setupUserListsEffect() {
      const key = [COLLECTIONS.USERS, myUserId, COLLECTIONS.LISTS];
      const stringKey = key.join("/");

      if (FirestoreSnapshotListener.has(stringKey)) return;

      const unsubscribe = firestore()
        .collection(COLLECTIONS.USERS)
        .doc(myUserId)
        .collection(COLLECTIONS.LISTS)
        .onSnapshot((snapshot) => {
          if (!snapshot) return;

          const prvUserLists = getDocs(key);
          if (!prvUserLists) {
            const userLists = snapshot.docs.map((doc) => {
              const userListDoc = doc.data() as IListFS;
              return convert(userListDoc, doc.id);
            });
            setDocs(key, userLists);
          } else {
            snapshot.docChanges().forEach((change) => {
              if (change.type === "added") {
                const userListDoc = change.doc.data() as IListFS;
                const userLists = [convert(userListDoc, change.doc.id), ...prvUserLists];
                setDocs(key, userLists);
              } else if (change.type === "modified") {
                const userListDoc = change.doc.data() as IListFS;
                const userLists = prvUserLists.map((userList) => {
                  if (userList.id === change.doc.id) return convert(userListDoc, change.doc.id);
                  return userList;
                });
                setDocs(key, userLists);
              } else if (change.type === "removed") {
                const userLists = prvUserLists.filter((userList) => userList.id !== change.doc.id);
                setDocs(key, userLists);
              }
            });
          }
        });

      FirestoreSnapshotListener.set(stringKey, unsubscribe);
    },
    [convert, getDocs, myUserId, setDocs],
  );

  return {
    queryKey: [COLLECTIONS.USERS, myUserId, COLLECTIONS.LISTS],
    queryFn: (): Promise<IList[]> => new Promise((): void => {}),
  };
};
