import { ReactNode, createContext, useEffect, useContext, useState, useCallback } from "react";
import { Platform } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useRouter } from "expo-router";
import { useAtom } from "jotai";
import { COLLECTIONS } from "@whatTodo/models";

import { authIsSignedInAtom } from "@/states/auth";
import { updateHttpClientBearerToken } from "@/utils/httpClient";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

type AuthProvider = {
  user: FirebaseAuthTypes.User | null;
  setUser: (user: FirebaseAuthTypes.User | null) => void;
  login: () => Promise<AppleAuthentication.AppleAuthenticationCredential | null>;
  logout: () => void;
};

export const AuthContext = createContext<AuthProvider>({
  user: null,
  setUser: () => {},
  login: () => Promise.resolve(null),
  logout: () => {},
});

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

  const onAuthStateChanged = useCallback(async (user: FirebaseAuthTypes.User | null) => {
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
  }, []);

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

  useEffect(function setupOnAuthStateChanged() {
    const onAuthStateChangedSubscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return onAuthStateChangedSubscriber;
  }, []);

  useEffect(function setupOnIdTokenChanged() {
    const onIdTokenChangedSubscriber = auth().onIdTokenChanged(onIdTokenChanged);
    return onIdTokenChangedSubscriber;

    return () => {
      onIdTokenChangedSubscriber();
    };
  }, []);

  const appleLogin = async () => {
    return Promise.resolve(null);
  };

  const googleLogin = async () => {
    return Promise.resolve(null);
  };

  const login = Platform.OS === "ios" ? appleLogin : googleLogin;

  const logout = () => {
    setUser(null);
  };

  useProtectedRoute(user);

  return <AuthContext.Provider value={{ user, setUser, login, logout }}>{children}</AuthContext.Provider>;
}
