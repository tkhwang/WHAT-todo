import { Auth } from "@/components/Auth/Auth"
import AppleLogin from "@/components/Auth/AppleLogin.ios"
import { View, Text } from "react-native"

export default function login() {
  return (
    <View className="flex-1 justify-center items-center">
      <Auth />
      <AppleLogin />
    </View>
  )
}
