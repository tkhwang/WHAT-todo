import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { COLLECTIONS } from "@whatTodo/models";
import { useRouter } from "expo-router";
import { useCallback } from "react";

import { useAuth } from "@/context/AuthProvider";

export function usePlatformSignInAndCheckUser() {
  const { login, setUser } = useAuth();
  const router = useRouter();

  const platformSignInAndNavigateToSignupIfNotRegistered = useCallback(
    async (credential: FirebaseAuthTypes.AuthCredential) => {
      try {
        const user = await login(credential);

        if (user) {
          const userDocRef = await firestore().collection(COLLECTIONS.USERS).doc(user.uid).get();
          console.log("🚀 ~ handlePressSignin ~ userDocRef.exists:", userDocRef.exists);

          // signin
          if (userDocRef.exists) {
            const userDoc = {
              id: userDocRef.id,
              ...userDocRef.data(),
            };
            setUser(userDoc);
            // signup
          } else {
            // TODO: check duplicate navigation
            router.replace({
              pathname: "/(public)/signup",
              params: {
                email: user.email,
                uid: user.uid,
              },
            });
            console.log(`[+][usePlatformSignInAndCheckUser] replace to /signup`);
          }
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(`[-][AppleLogin]:handlePress failed with error: ${error.message}`);
          setUser(null);
        }
      }
    },
    [login, router, setUser],
  );

  return {
    platformSignInAndNavigateToSignupIfNotRegistered,
  };
}
