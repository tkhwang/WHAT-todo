import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { IFirebaseBaseDoc } from "@/types/firestore";

export function useFirestore<T extends IFirebaseBaseDoc, M>() {
  const queryClient = useQueryClient();

  const convert = useCallback((doc: T, docId: string): M => {
    const { createdAt, updatedAt } = doc;
    return {
      ...doc,
      id: docId,
      createdAt: createdAt?.toDate(),
      updatedAt: updatedAt?.toDate(),
    } as M;
  }, []);

  const getDoc = useCallback(
    (key: string[]) => {
      const cachedDoc = queryClient.getQueryData<M>(key);
      return cachedDoc;
    },
    [queryClient],
  );

  const getDocs = useCallback(
    (key: string[]) => {
      const cachedDocs = queryClient.getQueryData<M[]>(key);
      return cachedDocs;
    },
    [queryClient],
  );

  const setDoc = useCallback(
    (key: string[], doc: M) => {
      queryClient.setQueryData(key, doc);
    },
    [queryClient],
  );

  const setDocs = useCallback(
    (key: string[], docs: M[]) => {
      queryClient.setQueryData(key, docs);
    },
    [queryClient],
  );

  return { convert, getDoc, getDocs, setDoc, setDocs };
}
