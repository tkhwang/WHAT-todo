import { ReactNode, createContext, useEffect, useContext, useState, useCallback } from "react";
import { Platform } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { COLLECTIONS } from "@/firebase/firebaseConsts";
import { useNavigation, useRouter } from "expo-router";
import { useAtom } from "jotai";
import { authIsSignedInAtom } from "@/states/auth";

type AuthProvider = {
  // credential: AppleAuthentication.AppleAuthenticationCredential | null;
  // setCredential: (credential: AppleAuthentication.AppleAuthenticationCredential | null) => void;
  user: FirebaseAuthTypes.User | null;
  setUser: (user: FirebaseAuthTypes.User | null) => void;
  login: () => Promise<AppleAuthentication.AppleAuthenticationCredential | null>;
  logout: () => void;
};

export const AuthContext = createContext<AuthProvider>({
  user: null,
  setUser: () => {},
  login: () => Promise.resolve(null),
  logout: () => {}
});

export function useAuth() {
  if (!useContext(AuthContext)) {
    throw new Error("useAuth must be used within a <AuthProvider />");
  }

  return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const navigation = useNavigation();
  const router = useRouter();
  // const [credential, setCredential] = useState<AppleAuthentication.AppleAuthenticationCredential | null>(null);

  // const [initializing, setInitializing] = useState(true);
  const [authIsSignedIn, setAuthIsSignedIn] = useAtom(authIsSignedInAtom);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const onAuthStateChanged = useCallback(async (user: FirebaseAuthTypes.User | null) => {
    console.log(`[+][onAuthStateChanged] user: ${JSON.stringify(user, null, 2)}`);

    if (user) {
      const userDocRef = await firestore().collection(COLLECTIONS.USERS).doc(user.uid).get();
      // signin
      if (userDocRef.exists) {
        // signup
      } else {
        if (authIsSignedIn) {
          router.replace("/(public)/signup");
        } else {
          router.replace("/(public)/signin");
        }
      }
    }

    // setUser(user);
    // if (initializing) setInitializing(false);
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
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
