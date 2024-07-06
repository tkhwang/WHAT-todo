import { Text, View } from "react-native"
import { greetingFromUi } from "@expertTodo/ui"
import { greetingFromModels } from "@expertTodo/models"

export default function Index() {
  return (
    <View className="flex-1 w-full h-full justify-center items-center bg-yellow-200">
      <Text>{greetingFromUi}</Text>
      <Text>{greetingFromModels}</Text>
    </View>
  )
}
