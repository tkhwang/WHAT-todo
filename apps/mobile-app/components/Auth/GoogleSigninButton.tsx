import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { View } from "react-native";
import { useCallback, useState } from "react";

import { appTheme } from "@/constants/uiConsts";
import { useAuth } from "@/context/AuthProvider";
import { usePlatformSignInAndCheckUser } from "@/hooks/usePlatformSignInAndCheckUser";

import Button from "../Button/Button";

GoogleSignin.configure({
  scopes: ["https://www.googleapis.com/auth/drive"],
  webClientId: process.env.EXPO_PUBLIC_FIREBASE_WEB_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_FIREBASE_IOS_CLIENT_ID,
  offlineAccess: true,
  forceCodeForRefreshToken: true,
  profileImageSize: 120,
});

export default function GoogleSigninButton() {
  const { user, login, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const { platformSignInAndNavigateToSignupIfNotRegistered } = usePlatformSignInAndCheckUser();

  const handlePressSignin = useCallback(async () => {
    setIsLoading(true);

    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      await platformSignInAndNavigateToSignupIfNotRegistered(googleCredential);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(`[-][GoogleSigninButton] failed: ${error.message}`);
        setIsLoading(false);
        setUser(null);
      }
    }
  }, [platformSignInAndNavigateToSignupIfNotRegistered, setUser]);

  return (
    <View>
      <Button
        onPress={handlePressSignin}
        title={"Google Signin"}
        color={appTheme.colors.primary}
        loading={false}
        buttonStyle={{ backgroundColor: appTheme.colors.primary }}
      />
    </View>
  );
}
