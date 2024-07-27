import * as AppleAuthentication from "expo-apple-authentication";
import { router, useSegments } from "expo-router";
import { useEffect } from "react";

export function useProtectedRoute(credential: AppleAuthentication.AppleAuthenticationCredential | null) {
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
