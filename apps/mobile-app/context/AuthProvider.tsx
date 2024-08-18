import { ReactNode, createContext, useEffect, useContext, useState, useCallback, useMemo } from "react";
import { Platform } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useRouter } from "expo-router";
import { useAtom, useSetAtom } from "jotai";
import { COLLECTIONS } from "@whatTodo/models";

import { authIsSignedInAtom } from "@/states/auth";
import { updateHttpClientBearerToken } from "@/utils/httpClient";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { myIdAtom } from "@/states/me";

type AuthProvider = {
  user: FirebaseAuthTypes.User | null;
  setUser: (user: FirebaseAuthTypes.User | null) => void;
  login: (
    appleCredential: FirebaseAuthTypes.AuthCredential,
  ) => Promise<AppleAuthentication.AppleAuthenticationCredential | null>;
  logout: () => void;
};

export const AuthContext = createContext<AuthProvider>({
  user: null,
  setUser: () => {},
  login: (appleCredential: FirebaseAuthTypes.AuthCredential) => Promise.resolve(null),
  logout: () => {},
});

/**
 * handle firebase auth
 *
 * @export
 * @return {*}
 */
export function useAuth() {
  if (!useContext(AuthContext)) {
    throw new Error("useAuth must be used within a <AuthProvider />");
  }

  return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [authIsSignedIn, setAuthIsSignedIn] = useAtom(authIsSignedInAtom);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const setMyId = useSetAtom(myIdAtom);

  const onAuthStateChanged = useCallback(
    async (user: FirebaseAuthTypes.User | null) => {
      console.log(`[+][onAuthStateChanged] user: ${JSON.stringify(user, null, 2)}`);

      if (user) {
        const userDocRef = await firestore().collection(COLLECTIONS.USERS).doc(user.uid).get();

        // signin
        if (userDocRef.exists) {
          const userDoc = {
            id: userDocRef.id,
            ...userDocRef.data(),
          };
          setUser(user);
          setMyId(userDoc.id);
          // signup
        } else {
          const pathname = authIsSignedIn ? "/(public)/signup" : "/(public)/signin";
          router.replace({
            pathname,
            params: {
              email: user.email,
              uid: user.uid,
            },
          });
          console.log(`[+][onAuthStateChanged] replace to ${pathname}`);
        }
      }
    },
    [authIsSignedIn, router, setMyId],
  );

  const onIdTokenChanged = useCallback(async (user: FirebaseAuthTypes.User | null) => {
    console.log(`[+][onIdTokenChanged] user: ${JSON.stringify(user, null, 2)}`);

    const userAuthToken = await user?.getIdToken();
    const idTokenResult = await user?.getIdTokenResult();

    if (user && userAuthToken) {
      if (idTokenResult?.token) {
        updateHttpClientBearerToken(idTokenResult?.token);
        console.log(`[+][onIdTokenChanged] httpClient token updated: ${idTokenResult?.token}`);
      }
    }
  }, []);

  useEffect(
    function setupOnAuthStateChanged() {
      const onAuthStateChangedSubscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return onAuthStateChangedSubscriber;
    },
    [onAuthStateChanged],
  );

  useEffect(
    function setupOnIdTokenChanged() {
      const onIdTokenChangedSubscriber = auth().onIdTokenChanged(onIdTokenChanged);
      return onIdTokenChangedSubscriber;

      return () => {
        onIdTokenChangedSubscriber();
      };
    },
    [onIdTokenChanged],
  );

  const appleLogin = async (appleCredential: FirebaseAuthTypes.AuthCredential) => {
    try {
      const { user } = await auth().signInWithCredential(appleCredential);
      setAuthIsSignedIn(true);
      return user;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(`[-][AppleLogin]:handlePress failed with error: ${error.message}`);
        setAuthIsSignedIn(false);
      }
    }
  };

  const googleLogin = async () => {
    return Promise.resolve(null);
  };

  const login = Platform.OS === "ios" ? appleLogin : googleLogin;

  const logout = useCallback(async () => {
    try {
      await auth().signOut();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(`[-][logout]:logout failed with error: ${error.message}`);
      }
    } finally {
      setUser(null);
      setAuthIsSignedIn(false);
    }
  }, [setAuthIsSignedIn]);

  useProtectedRoute(user);

  const contextValue = useMemo(() => ({ user, setUser, login, logout }), [user, setUser, login, logout]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
