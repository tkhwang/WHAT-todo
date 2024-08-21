import { ITodo } from "@whatTodo/models";
import { View } from "react-native";

import { Text } from "@/components/ui/text";

interface Props {
  todo: ITodo;
}

export default function TodoItem({ todo }: Props) {
  return (
    <View className={"flex-col"}>
      <Text className={"text-xl font-semibold"}>{todo.todo}</Text>
      <Text className={"text-base font-normal"}>{todo.updatedAt.toLocaleDateString()}</Text>
    </View>
  );
}
