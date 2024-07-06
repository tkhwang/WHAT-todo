import { Text, View } from "react-native"
import { greetingFromUi } from "@expertTodo/ui"
import { greetingFromModels } from "@expertTodo/models"

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{greetingFromUi}</Text>
      <Text>{greetingFromModels}</Text>
    </View>
  )
}
