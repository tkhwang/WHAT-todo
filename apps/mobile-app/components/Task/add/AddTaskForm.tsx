import { FlatList, View } from "react-native";
import { Dispatch, RefObject, SetStateAction, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { IAddTask } from "@whatTodo/models";

import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { appTheme } from "@/constants/uiConsts";
import Button from "@/components/Button/Button";

import TaskTypeRadioSelect from "../TaskTypeRadioSelect";

interface Props {
  setTodoTasks: Dispatch<SetStateAction<IAddTask[]>>;
  listRef: RefObject<FlatList<IAddTask>>;
}

export default function AddTaskForm({ setTodoTasks, listRef }: Props) {
  const { t } = useTranslation();

  const [task, setTask] = useState("");
  const [taskType, setTaskType] = useState<"todo" | "not-todo">("todo");

  const handleCleanup = useCallback(() => {
    setTask("");
    setTaskType("todo");
  }, []);

  const handleClickPress = () => {
    const newTask = {
      id: new Date().getTime(),
      task,
      taskType,
    };
    setTodoTasks((prv: IAddTask[]) => [...prv, newTask]);

    setTimeout(() => {
      listRef.current?.scrollToEnd({ animated: true });
    }, 100);

    handleCleanup();
  };

  return (
    <View className={"flex flex-col w-full items-center gap-4"}>
      {/* Task */}
      <View className={"flex w-full flex-row items-center gap-4"}>
        <Text className={"w-16 text-xl font-normal text-gray-500"}>{t("sendTodo.task.title")}</Text>
        <Input
          className={"flex-1"}
          placeholder={t("sendTodo.list.title.placeholder")}
          value={task}
          onChangeText={setTask}
          aria-labelledby={"inputLabel"}
          aria-errormessage={"inputError"}
        />
      </View>

      {/* TaskType */}
      <View className={"flex-row"}>
        <TaskTypeRadioSelect taskType={taskType} setTaskType={setTaskType} />
      </View>

      <View className={"flex w-full"}>
        <Button
          onPress={handleClickPress}
          title={t("sendTodo.cta.add-to-task")}
          color={appTheme.colors.primary}
          buttonStyle={{
            backgroundColor: task.length === 0 ? appTheme.colors.gray : appTheme.colors.secondary,
          }}
          disabled={task.length === 0}
        />
      </View>
    </View>
  );
}
