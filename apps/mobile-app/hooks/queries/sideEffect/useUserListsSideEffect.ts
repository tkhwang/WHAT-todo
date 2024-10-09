import { useEffect } from "react";
import { COLLECTIONS, IList, UserType } from "@whatTodo/models";
import { useAtomValue } from "jotai";
import firestore from "@react-native-firebase/firestore";

import { IListFS } from "@/types";
import { myUserIdAtom } from "@/states/me";
import { FirestoreSnapshotListener } from "@/firestore/FirestoreSnapshotListner";

import { useFirestore } from "../../useFirestore";

export function useUserListsSideEffects(userType: UserType) {
  const myUserId = useAtomValue(myUserIdAtom);

  const { convert, getDocs, setDocs } = useFirestore<IListFS, IList>();

  useEffect(
    function setupUserListsEffect() {
      const key = [COLLECTIONS.USERS, myUserId, COLLECTIONS.LISTS, userType];
      const stringKey = key.join("/");

      if (FirestoreSnapshotListener.has(stringKey)) return;

      const unsubscribe = firestore()
        .collection(COLLECTIONS.USERS)
        .doc(myUserId)
        .collection(COLLECTIONS.LISTS)
        .where("userType", "==", userType)
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
    [convert, getDocs, myUserId, setDocs, userType],
  );
}
