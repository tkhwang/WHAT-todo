import { ITask } from "@whatTodo/models";
import { Pressable, View } from "react-native";
import { useRouter } from "expo-router";

import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { useColorScheme } from "@/lib/useColorScheme";
import Icon from "@/assets/icons";
import { getDateWithDayOfWeek } from "@/utils";
import { TASK_OPTIMISTIC_ADD_KEY } from "@/constants/appConsts";
import { useUserTasks } from "@/hooks/queries/useUserTasks";
import { useSelectUserTaskByTaskId } from "@/hooks/queries/select/useSelectUserTaskByTaskId";

import TaskTypeIcon from "./TaskTypeIcon";

interface Props {
  listId: string;
  task: ITask;
}

export default function TaskListItem({ listId, task }: Props) {
  const router = useRouter();

  const { isDarkColorScheme } = useColorScheme();

  const { selectUserTaskByTaskId } = useSelectUserTaskByTaskId(task.id);
  const { data: userTask } = useUserTasks(listId, selectUserTaskByTaskId);

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
        userTask?.isDone ? "border-dashed" : "",
        task.id.startsWith(TASK_OPTIMISTIC_ADD_KEY) && "opacity-80",
      )}
      onPress={handlePress}
    >
      <View className={"flex-row gap-4 items-center w-full"}>
        {/* todo description */}
        <View className={"flex-1 flex-row gap-2 justify-between items-center"}>
          {/* Task w/ TaskTypeIcon */}
          <View className={"flex-1 flex-row gap-2  justify-start items-center"}>
            <TaskTypeIcon taskType={task.taskType} />
            <Text
              className={cn(
                "text-xl font-medium flex-shrink",
                userTask?.isDone ? "line-through" : "",
              )}
              numberOfLines={1}
              ellipsizeMode={"tail"}
            >
              {task.task}
            </Text>
          </View>

          {/* Note */}
          {(task.dueDate || task.note) && (
            <View className={"flex-row gap-2 "}>
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
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}
