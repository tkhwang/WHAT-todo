import { View } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import { useAuth } from "@/context/AuthProvider";
import { supabase } from "@/lib/supabase";
import { useCallback } from "react";
import { router } from "expo-router";

function AppleLogin() {
  const { credential, setCredential, login } = useAuth();

  const handlePress = useCallback(async () => {
    let credential: AppleAuthentication.AppleAuthenticationCredential | null = null;

    try {
      credential = await login();
      if (!credential || !credential?.identityToken) return;

      setCredential(credential);

      const {
        error,
        data: { user }
      } = await supabase.auth.signInWithIdToken({
        provider: "apple",
        token: credential.identityToken
      });
      console.log(`[*][supabase|signInWithIdToken] ${JSON.stringify({ user, error }, null, 2)} `);
    } catch (e) {
      if (e.code === "ERR_REQUEST_CANCELED") {
        // handle that the user canceled the sign-in flow
      } else {
        // handle other errors
      }
    }
  }, []);

  return (
    <View className="flex-1 justify-center items-center">
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={{ width: 200, height: 44 }}
        onPress={handlePress}
      />
    </View>
  );
}

export default AppleLogin;
