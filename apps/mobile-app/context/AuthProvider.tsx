import { ReactNode, createContext, useEffect } from "react";
import { useContext, useState } from "react";
import { router, useSegments } from "expo-router";
import * as AppleAuthentication from "expo-apple-authentication";
import { Platform } from "react-native";

type AuthProvider = {
  credential: AppleAuthentication.AppleAuthenticationCredential | null;
  login: () => Promise<AppleAuthentication.AppleAuthenticationCredential | null>;
  logout: () => void;
};

function useProtectedRoute(credential: AppleAuthentication.AppleAuthenticationCredential | null) {
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    console.log(`[*] inAuthGroup: ${inAuthGroup}`);

    if (!credential && inAuthGroup) {
      router.replace("/login");
    } else if (credential && !inAuthGroup) {
      router.replace("/(auth)/(tabs)/");
    }
  }, [credential, segments]);
}

export const AuthContext = createContext<AuthProvider>({
  credential: null,
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
  const [credential, setCredential] = useState<AppleAuthentication.AppleAuthenticationCredential | null>(null);

  const appleLogin = async () => {
    let credential: AppleAuthentication.AppleAuthenticationCredential | null = null;
    try {
      credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL
        ]
      });
      setCredential(credential);
      return credential;
    } catch (error) {
      console.error(`[-][login] failed: ${error}`);
      return null;
    }
  };

  const googleLogin = async () => {
    return Promise.resolve(null);
  };

  const login = Platform.OS === "ios" ? appleLogin : googleLogin;

  const logout = () => {
    setCredential(null);
  };

  useProtectedRoute(credential);

  return <AuthContext.Provider value={{ credential, login, logout }}>{children}</AuthContext.Provider>;
}
