import { ITodo } from "@whatTodo/models";
import { View } from "react-native";
import { useState } from "react";

import { Text } from "@/components/ui/text";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  todo: ITodo;
}

export default function TodoItem({ todo }: Props) {
  const [checked, setChecked] = useState(false);

  return (
    <View className={"flex-col justify-center py-2"}>
      <View className={"flex-row gap-2 items-center"}>
        <Checkbox checked={checked} onCheckedChange={setChecked} />
        <Text className={"text-xl font-semibold"}>{todo.todo}</Text>
      </View>
      <Text className={"text-base font-normal"}>{todo.updatedAt.toLocaleDateString()}</Text>
    </View>
  );
}
