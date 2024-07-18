import { Platform } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import { supabase } from "../utils/supabase";
import { useAuth } from "@/context/AuthProvider";

export function Auth() {
  const { login } = useAuth();

  if (Platform.OS === "ios")
    return (
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={{ width: 200, height: 64 }}
        onPress={async () => {
          try {
            // const credential = await AppleAuthentication.signInAsync({
            //   requestedScopes: [
            //     AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
            //     AppleAuthentication.AppleAuthenticationScope.EMAIL,
            //   ],
            // })
            const credential = await login();
            console.log("[+][Auth] credential:", credential);

            // Sign in via Supabase Auth.
            if (credential && credential.identityToken) {
              const {
                error,
                data: { user }
              } = await supabase.auth.signInWithIdToken({
                provider: "apple",
                token: credential.identityToken
              });
              console.log(JSON.stringify({ error, user }, null, 2));
              if (!error) {
                // User is signed in.
              }
            } else {
              throw new Error("No identityToken.");
            }
          } catch (error: unknown) {
            if (error instanceof Error) {
              if ((error as any).code === "ERR_REQUEST_CANCELED") {
                // handle that the user canceled the sign-in flow
              } else {
                // handle other errors
              }
            }
          }
        }}
      />
    );
  return <>{/* Implement Android Auth options. */}</>;
}
