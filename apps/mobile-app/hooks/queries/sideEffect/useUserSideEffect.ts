import { useEffect } from "react";
import { COLLECTIONS } from "@whatTodo/models";
import firestore from "@react-native-firebase/firestore";

import { useFirestore } from "@/hooks/useFirestore";
import { IUserFS } from "@/types";

export function useUserSideEffect(userId?: string) {
  const { convert, setDoc } = useFirestore();

  useEffect(() => {
    if (!userId) return () => null;

    const key = [COLLECTIONS.USERS, userId];

    const unsubscribe = firestore()
      .collection(COLLECTIONS.USERS)
      .doc(userId)
      .onSnapshot((snapshot) => {
        if (!snapshot) return;

        const userDoc = snapshot.data() as IUserFS;
        const user = convert(userDoc, snapshot.id);
        setDoc(key, user);
      });

    return () => unsubscribe();
  }, [convert, setDoc, userId]);
}
