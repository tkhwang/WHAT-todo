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
        <View className={"flex-row gap-4 items-center bg-gray-200 px-2 py-1 rounded-2xl"}>
          {/* Task w/ TaskTypeIcon */}
          <View className={"flex flex-row flex-1 gap-2  justify-center items-center"}>
            <TaskTypeIcon taskType={item.taskType} />
            <View className={"flex-1 ml-2"}>
              <Text className={"text-xl font-medium flex-wrap"}>{item.task}</Text>
            </View>
            <Pressable className={"ml-auto px-6"} onPress={() => handleClickRemove(item)}>
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
        <View className={"flex w-full rounded-3xl"}>
          <FlatList
            ref={listRef}
            data={todoTasks}
            renderItem={renderItem}
            ItemSeparatorComponent={ItemSeparator}
            ListFooterComponent={
              <View className={"pb-20 mt-6"}>
                <AddTaskForm setTodoTasks={setTodoTasks} listRef={listRef} />
              </View>
            }
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
