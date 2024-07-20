import { useAuth } from "@/context/AuthProvider"
import { useCallback } from "react"
import { View, Text, Button } from "react-native"

export function Auth() {
  const { login, setCredential } = useAuth()

  const fakeLogin = useCallback(() => {
    setCredential({ user: "test@whattodo.ai" })
  }, [])

  return (
    <View className="flex-1 justify-center items-center">
      <Button title="Fake Login" onPress={fakeLogin} />
    </View>
  )
}
