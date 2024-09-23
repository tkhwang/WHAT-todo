import { ITask } from "@whatTodo/models";
import { Pressable, View } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

import { Text } from "@/components/ui/text";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useColorScheme } from "@/lib/useColorScheme";
import { useToggleTaskIsDone } from "@/hooks/mutations/useToggleTaskIsDone";
import Icon from "@/assets/icons";
import { getDateWithDayOfWeek } from "@/utils";
import { TASK_OPTIMISTIC_ADD_KEY } from "@/constants/appConsts";

interface Props {
  listId: string;
  task: ITask;
}

export default function TaskListItem({ listId, task }: Props) {
  const router = useRouter();

  const { isDarkColorScheme } = useColorScheme();
  const [checked, setChecked] = useState(false);

  const { mutateAsync: toggleTaskIsDoneMutation } = useToggleTaskIsDone();

  const handlePressCheck = async () => {
    await toggleTaskIsDoneMutation({ taskId: task.id });
    setChecked(!checked);
  };

  const handlePress = () => {
    router.push(`/(auth)/(tabs)/todos/${listId}/${task.id}`);
  };

  return (
    <Pressable
      className={cn(
        "flex-col justify-center py-1 p-4 rounded-xl border shadow-sm",
        isDarkColorScheme
          ? "border-gray-600 bg-gray-900 shadow-slate-500"
          : "border-gray-400 bg-gray-100 shadow-slate-400",
        task.id.startsWith(TASK_OPTIMISTIC_ADD_KEY) && "opacity-50",
      )}
      onPress={handlePress}
    >
      <View className={"flex-row gap-4 items-center"}>
        {/* checkbox */}
        <Checkbox checked={checked} onCheckedChange={handlePressCheck} />

        {/* todo description */}
        <View className={"flex-col gap-2 justify-center"}>
          <Text className={"text-xl font-medium"}>{task.task}</Text>
          <View className={"flex-row gap-2"}>
            {task.dueDate && (
              <View className={"flex-row gap-1 items-center"}>
                <Icon name={"calendar"} size={18} strokeWidth={1.5} />
                <Text className={"text-base font-normal text-gray-500"}>
                  {getDateWithDayOfWeek(task.dueDate, 0)}
                </Text>
              </View>
            )}
            {task.note && (
              <View className={"flex-row gap-1 items-center"}>
                <Icon name={"noteEdit"} size={18} strokeWidth={1.5} />
                <Text className={"text-base font-normal text-gray-500"}>{"Note"}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
}
