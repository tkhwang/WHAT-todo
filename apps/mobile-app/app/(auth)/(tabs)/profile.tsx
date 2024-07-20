import { Button, StyleSheet, View, Text } from "react-native"

import { useAuth } from "@/context/AuthProvider"
import { useEffect } from "react"

export default function TabTwoScreen() {
  const { credential, logout } = useAuth()

  useEffect(() => {
    console.log("two", credential)
  }, [])

  if (!credential) return <Text>Loading...</Text>

  return (
    <View className="flex-1 flex flex-col justify-center px-4 items-center">
      <Text>Account</Text>
      <Text>{credential?.user || "No username"}</Text>
      <Button title="Log out" onPress={logout} />
    </View>
  )
}
