import { ITask } from "@whatTodo/models";
import { Pressable, View } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

import { Text } from "@/components/ui/text";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useColorScheme } from "@/lib/useColorScheme";

interface Props {
  todo: ITask;
}

export default function TaskListItem({ todo }: Props) {
  const { isDarkColorScheme } = useColorScheme();
  const [checked, setChecked] = useState(false);

  const router = useRouter();

  const handlePress = () => {
    router.push(`/(auth)/(tabs)/todos/${todo.id}`);
  };

  return (
    <Pressable
      className={cn("flex-col justify-center py-2 p-4 rounded-xl", isDarkColorScheme ? "bg-gray-900" : "bg-gray-200")}
      onPress={handlePress}
    >
      <View className={"flex-row gap-4 items-center"}>
        {/* checkbox */}
        <Checkbox checked={checked} onCheckedChange={setChecked} />

        {/* todo description */}
        <View className={"flex-col gap-1 justify-center"}>
          <Text className={"text-xl font-medium"}>{todo.task}</Text>
          <Text className={"text-sm font-normal"}>{"..."}</Text>
        </View>
      </View>
      {/* <Text className={"text-base font-normal"}>{todo.updatedAt.toLocaleDateString()}</Text> */}
    </Pressable>
  );
}
