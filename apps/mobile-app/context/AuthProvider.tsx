import { ReactNode, createContext, useEffect, useContext, useState } from "react";
import { Platform } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

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
  // const [credential, setCredential] = useState<AppleAuthentication.AppleAuthenticationCredential | null>(null);

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    // setUser(user);
    if (initializing) setInitializing(false);
  }

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
