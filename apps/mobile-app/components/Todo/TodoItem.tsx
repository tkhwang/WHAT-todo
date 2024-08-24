import { ITodo } from "@whatTodo/models";
import { Pressable, View } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

import { Text } from "@/components/ui/text";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  todo: ITodo;
}

export default function TodoItem({ todo }: Props) {
  const [checked, setChecked] = useState(false);

  const router = useRouter();

  const handlePress = () => {
    router.push(`/(auth)/(tabs)/todos/${todo.id}`);
  };

  return (
    <View className={"flex-col justify-center py-2"}>
      <View className={"flex-row gap-2 items-center"}>
        <Checkbox checked={checked} onCheckedChange={setChecked} />
        <Pressable onPress={handlePress}>
          <Text className={"text-xl font-semibold"}>{todo.todo}</Text>
        </Pressable>
      </View>
      <Text className={"text-base font-normal"}>{todo.updatedAt.toLocaleDateString()}</Text>
    </View>
  );
}
