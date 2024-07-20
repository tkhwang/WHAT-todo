import { useAuth } from "@/context/AuthProvider"
import { View, Text, Button } from "react-native"

export function Auth() {
  const { login } = useAuth()

  return (
    <View className="flex-1 justify-center items-center">
      <Button title="Fake Login" onPress={login} />
    </View>
  )
}
