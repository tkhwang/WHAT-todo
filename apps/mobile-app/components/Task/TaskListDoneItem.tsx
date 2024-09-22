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
  listId: string;
  task: ITask;
}

export function TaskListDoneItem({ listId, task }: Props) {
  const router = useRouter();

  const { isDarkColorScheme } = useColorScheme();
  const [checked, setChecked] = useState(true);

  const { mutate: toggleTaskIsDoneMutate } = useToggleTaskIsDone();

  const handlePressCheck = () => {
    toggleTaskIsDoneMutate({ taskId: task.id });
    setChecked(!checked);
  };

  const handlePress = () => {
    router.push(`/(auth)/(tabs)/todos/${listId}/${task.id}`);
  };

  return (
    <Pressable className={cn("flex-col justify-center py-2 px-2 rounded-xl")} onPress={handlePress}>
      <View className={"flex-row gap-4 items-center"}>
        {/* checkbox */}
        <Checkbox checked={checked} onCheckedChange={handlePressCheck} />

        {/* todo description */}
        <View className={"flex-col gap-1 justify-center"}>
          <Text className={"text-xl font-normal line-through"}>{task.task}</Text>
        </View>
      </View>
    </Pressable>
  );
}
