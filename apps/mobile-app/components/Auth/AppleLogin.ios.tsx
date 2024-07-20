import { View } from "react-native"
import * as AppleAuthentication from "expo-apple-authentication"
import { useAuth } from "@/context/AuthProvider"

function AppleLogin() {
  const { credential, setCredential, login } = useAuth()
  return (
    <View className="flex-1 justify-center items-center">
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={{ width: 200, height: 44 }}
        onPress={async () => {
          try {
            const credential = await login()
            console.log("🚀 ~ onPress={ ~ credential:", credential)
            setCredential(credential)
            // signed in
          } catch (e) {
            if (e.code === "ERR_REQUEST_CANCELED") {
              // handle that the user canceled the sign-in flow
            } else {
              // handle other errors
            }
          }
        }}
      />
    </View>
  )
}

export default AppleLogin
