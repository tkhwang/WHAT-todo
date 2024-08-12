import { AppleButton, appleAuth } from "@invertase/react-native-apple-authentication";
import { useCallback, useState } from "react";
import { StyleSheet, Platform, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useAtom } from "jotai";
import { useRouter } from "expo-router";
import { COLLECTIONS } from "@whatTodo/models";

import Loading from "../Loading";

import { authIsSignedInAtom } from "@/states/auth";
import { useColorScheme } from "@/lib/useColorScheme";
import { useAuth } from "@/context/AuthProvider";
import { appTheme } from "@/constants/uiConsts";
import { hp } from "@/helpers/common";

export function AppleLogin() {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const { isDarkColorScheme } = useColorScheme();

  const [authIsSignedIn, setAuthIsSignedIn] = useAtom(authIsSignedInAtom);

  const handlePressSignin = useCallback(async () => {
    try {
      setIsLoading(true);

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
        setIsLoading(false);
        setUser(null);
      }
    }
  }, [router, setAuthIsSignedIn, setUser]);

  if (Platform.OS !== "ios") return null;

  if (isLoading) {
    return (
      <View style={[styles.appleButton, { backgroundColor: "white" }]}>
        <Loading size={"large"} color={appTheme.colors.primary} />
      </View>
    );
  }

  return (
    <View>
      <AppleButton
        buttonStyle={isDarkColorScheme ? AppleButton.Style.WHITE : AppleButton.Style.BLACK}
        buttonType={AppleButton.Type.SIGN_IN}
        style={styles.appleButton}
        onPress={handlePressSignin}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  appleButton: {
    backgroundColor: appTheme.colors.primary,
    height: hp(6.6),
    justifyContent: "center",
    alignItems: "center",
    borderCurve: "continuous",
    borderRadius: appTheme.radius.xl,
  },
});
