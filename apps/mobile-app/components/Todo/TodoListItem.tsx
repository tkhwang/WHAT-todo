import { ITodo } from "@whatTodo/models";
import { Pressable, View } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

import { Text } from "@/components/ui/text";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useColorScheme } from "@/lib/useColorScheme";
import { appTheme } from "@/constants/uiConsts";

interface Props {
  todo: ITodo;
}

export default function TodoListItem({ todo }: Props) {
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
          <Text className={"text-xl font-medium"}>{todo.todo}</Text>
          <Text className={"text-sm font-normal"}>{"Tasks..."}</Text>
        </View>
      </View>
      {/* <Text className={"text-base font-normal"}>{todo.updatedAt.toLocaleDateString()}</Text> */}
    </Pressable>
  );
}
