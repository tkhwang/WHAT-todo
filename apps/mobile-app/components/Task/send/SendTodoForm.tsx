import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { Dispatch, SetStateAction, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IAddTask } from "@whatTodo/models";

import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import Icon from "@/assets/icons";
import { cn } from "@/lib/utils";
import { useColorScheme } from "@/lib/useColorScheme";

import AddTaskForm from "../add/AddTaskForm";
import TaskTypeIcon from "../TaskTypeIcon";

const ItemSeparator = () => <View style={{ height: 8 }} />;

interface Props {
  todoListTitle: string;
  setTodoListTitle: (title: string) => void;
  todoTasks: IAddTask[];
  setTodoTasks: Dispatch<SetStateAction<IAddTask[]>>;
}

export default function SendTodoForm({
  todoListTitle,
  setTodoListTitle,
  todoTasks,
  setTodoTasks,
}: Props) {
  const { isDarkColorScheme } = useColorScheme();
  const { t } = useTranslation();

  const listRef = useRef<FlatList<IAddTask>>(null);

  const handleClickRemove = useCallback(
    (task: IAddTask) => {
      setTodoTasks((prv: IAddTask[]) => {
        return prv.filter((t) => t.id !== task.id);
      });
    },
    [setTodoTasks],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: IAddTask; index: number }) => {
      return (
        <View
          className={cn(
            "flex-row gap-4 items-center rounded-2xl px-4 py-3",
            isDarkColorScheme ? "bg-gray-800" : "bg-gray-200",
          )}
        >
          <View className={"flex flex-row flex-1 gap-2  justify-center items-center"}>
            {/* Icon: TaskType */}
            <TaskTypeIcon taskType={item.taskType} />

            {/* Task */}
            <View className={"flex-1 ml-2"}>
              <Text className={"text-xl font-medium flex-wrap"}>{item.task}</Text>
            </View>

            {/* Right: remove icon */}
            <Pressable className={"ml-auto"} onPress={() => handleClickRemove(item)}>
              <Icon name={"cancelCircle"} size={26} strokeWidth={1.6} />
            </Pressable>
          </View>
        </View>
      );
    },
    [handleClickRemove],
  );

  return (
    <KeyboardAvoidingView
      className={"flex-1 w-full"}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className={"flex flex-col flex-1 w-full items-center gap-8"}>
        {/* List Title */}
        <View className={"flex w-full flex-row items-center gap-4"}>
          <Text className={"w-16 text-xl font-normal text-gray-500"}>
            {t("sendTodo.list.title")}
          </Text>
          <Input
            className={"flex-1"}
            placeholder={t("sendTodo.list.title.placeholder")}
            value={todoListTitle}
            onChangeText={setTodoListTitle}
            aria-labelledby={"inputLabel"}
            aria-errormessage={"inputError"}
          />
        </View>

        {/* Task List */}
        <View className={"flex-1 w-full rounded-3xl"}>
          <FlatList
            ref={listRef}
            data={todoTasks}
            renderItem={renderItem}
            ItemSeparatorComponent={ItemSeparator}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "flex-start",
            }}
          />
        </View>

        <View className={"mt-auto pb-0 w-full"}>
          <AddTaskForm setTodoTasks={setTodoTasks} listRef={listRef} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
