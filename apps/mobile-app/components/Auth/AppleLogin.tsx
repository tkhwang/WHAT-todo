import { AppleButton, appleAuth } from "@invertase/react-native-apple-authentication";
import { useCallback } from "react";
import { Platform, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useAtom } from "jotai";
import { useRouter } from "expo-router";
import { COLLECTIONS } from "@whatTodo/models";

import { authIsSignedInAtom } from "@/states/auth";
import { useColorScheme } from "@/lib/useColorScheme";
import { useAuth } from "@/context/AuthProvider";

export function AppleLogin() {
  const router = useRouter();
  const { user, setUser } = useAuth();

  const { isDarkColorScheme } = useColorScheme();

  const [authIsSignedIn, setAuthIsSignedIn] = useAtom(authIsSignedInAtom);

  const handlePressSignin = useCallback(async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      if (!appleAuthRequestResponse.identityToken) {
        throw new Error("Apple Sign-In failed - no identify token returned");
      }

      const { identityToken, nonce } = appleAuthRequestResponse;
      const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

      // apple signin
      const { user } = await auth().signInWithCredential(appleCredential);
      setAuthIsSignedIn(true);

      if (user) {
        const userDocRef = await firestore().collection(COLLECTIONS.USERS).doc(user.uid).get();

        // signin
        if (userDocRef.exists) {
          const user = {
            id: userDocRef.id,
            ...userDocRef.data(),
          };
          setUser(user);
          // signup
        } else {
          router.replace({
            pathname: "/(public)/signup",
            params: {
              email: user.email,
              uid: user.uid,
            },
          });
          console.log(`[+][handlePressSignin] replace to /signup`);
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(`[-][AppleLogin]:handlePress failed with error: ${error.message}`);
        setUser(null);
      }
    }
  }, []);

  if (Platform.OS !== "ios") return null;

  return (
    <View>
      <AppleButton
        buttonStyle={isDarkColorScheme ? AppleButton.Style.WHITE : AppleButton.Style.BLACK}
        buttonType={AppleButton.Type.SIGN_IN}
        style={{
          width: 160,
          height: 44,
        }}
        onPress={handlePressSignin}
      />
    </View>
  );
}
