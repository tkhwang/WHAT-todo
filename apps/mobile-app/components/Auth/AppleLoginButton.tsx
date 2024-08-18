import { AppleButton, appleAuth } from "@invertase/react-native-apple-authentication";
import { useCallback, useState } from "react";
import { StyleSheet, Platform, View } from "react-native";
import auth from "@react-native-firebase/auth";
import { useSetAtom } from "jotai";

import { useColorScheme } from "@/lib/useColorScheme";
import { useAuth } from "@/context/AuthProvider";
import { appTheme } from "@/constants/uiConsts";
import { hp } from "@/helpers/common";
import { usePlatformSignInAndCheckUser } from "@/hooks/usePlatformSignInAndCheckUser";
import { authSignUpPlatformAtom } from "@/states/auth";

import Loading from "../Loading";

/**
 * handle platform sepcific auth : apple login
 *
 * @export
 * @return {*}
 */
export function AppleLoginButton() {
  const { isDarkColorScheme } = useColorScheme();

  const { setUser } = useAuth();
  const { platformSignInAndNavigateToSignupIfNotRegistered } = usePlatformSignInAndCheckUser();
  const [isLoading, setIsLoading] = useState(false);
  const setAuthSignUpPlatform = useSetAtom(authSignUpPlatformAtom);

  const handlePressSignin = useCallback(async () => {
    try {
      setAuthSignUpPlatform("apple");
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

      await platformSignInAndNavigateToSignupIfNotRegistered(appleCredential);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(`[-][AppleLogin]:handlePress failed with error: ${error.message}`);
        setIsLoading(false);
        setUser(null);
        setAuthSignUpPlatform(null);
      }
    }
  }, [platformSignInAndNavigateToSignupIfNotRegistered, setAuthSignUpPlatform, setUser]);

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
        buttonType={AppleButton.Type.CONTINUE}
        cornerRadius={15}
        style={styles.appleButton}
        onPress={handlePressSignin}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  appleButton: {
    height: hp(6.6),
    justifyContent: "center",
    alignItems: "center",
    borderCurve: "continuous",
    borderRadius: appTheme.radius.xl,
  },
});
