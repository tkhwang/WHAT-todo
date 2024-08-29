import { Pressable, View } from "react-native";
import { useState } from "react";
import { ITask } from "@whatTodo/models";
import { useRouter } from "expo-router";

import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { useToggleTaskIsDone } from "@/hooks/mutations/useToggleTaskIsDone";
import { useColorScheme } from "@/lib/useColorScheme";

import { Checkbox } from "../ui/checkbox";

interface Props {
  todo: ITask;
}

export function TaskListDoneItem({ todo }: Props) {
  const router = useRouter();

  const { isDarkColorScheme } = useColorScheme();
  const [checked, setChecked] = useState(true);

  const { mutateAsync: toggleTaskIsDoneMutation } = useToggleTaskIsDone();

  const handlePressCheck = async () => {
    await toggleTaskIsDoneMutation({ taskId: todo.id });
    setChecked(!checked);
  };

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
        <Checkbox checked={checked} onCheckedChange={handlePressCheck} />

        {/* todo description */}
        <View className={"flex-col gap-1 justify-center"}>
          <Text className={"text-xl font-medium"}>{todo.task}</Text>
        </View>
      </View>
    </Pressable>
  );
}
