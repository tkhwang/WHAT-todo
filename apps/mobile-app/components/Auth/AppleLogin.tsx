import { useAuth } from "@/context/AuthProvider";
import { AppleButton } from "@invertase/react-native-apple-authentication";
import { useCallback } from "react";
import { Platform, View } from "react-native";

import auth from "@react-native-firebase/auth";
import { appleAuth } from "@invertase/react-native-apple-authentication";

export function AppleLogin() {
  const { user, setUser } = useAuth();

  const handlePress = useCallback(async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL]
      });

      if (!appleAuthRequestResponse.identityToken) {
        throw new Error("Apple Sign-In failed - no identify token returned");
      }

      const { identityToken, nonce } = appleAuthRequestResponse;
      const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
      console.log("🚀 ~ handlePress ~ appleCredential:", appleCredential);

      const { user } = await auth().signInWithCredential(appleCredential);
      // setUser(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(`[-][AppleLogin]:handlePress failed with error: ${error.message}`);
        setUser(null);
      }
    }
  }, []);

  if (Platform.OS !== "ios") return null;

  return (
    <View className="items-center justify-center flex-1">
      <AppleButton
        buttonStyle={AppleButton.Style.BLACK}
        buttonType={AppleButton.Type.SIGN_IN}
        style={{
          width: 160,
          height: 45
        }}
        onPress={handlePress}
      />
    </View>
  );
}
