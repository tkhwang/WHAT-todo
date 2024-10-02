import { FlatList, Pressable, View } from "react-native";
import { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IAddTask } from "@whatTodo/models";

import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { appTheme } from "@/constants/uiConsts";
import Button from "@/components/Button/Button";
import Icon from "@/assets/icons";

import AddTaskForm from "./AddTaskForm";
import TaskTypeIcon from "../TaskTypeIcon";

const ItemSeparator = () => <View style={{ height: 8 }} />;

export default function SendTodoForm() {
  const { t } = useTranslation();

  const listRef = useRef<FlatList<IAddTask>>(null);

  const [todoListTitle, setTodoListTitle] = useState("");
  const [todoTasks, setTodoTasks] = useState<IAddTask[]>([]);

  const isReadyToSend = useMemo(() => {
    return todoListTitle.length > 0 && todoTasks.length > 0;
  }, [todoListTitle.length, todoTasks.length]);

  const handleClickRemove = (task: IAddTask) => {
    setTodoTasks((prv: IAddTask[]) => {
      return prv.filter((t) => t.id !== task.id);
    });
  };

  const renderItem = useCallback(({ item, index }: { item: IAddTask; index: number }) => {
    return (
      <View className={"flex-row gap-4 items-center"}>
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
  }, []);

  return (
    <View className={"flex flex-col flex-1 w-full items-center gap-8"}>
      {/* List Title */}
      <View className={"flex w-full flex-row items-center gap-4"}>
        <Text className={"w-16 text-xl font-normal text-gray-500"}>{t("sendTodo.list.title")}</Text>
        <Input
          className={"flex-1"}
          placeholder={t("sendTodo.list.title.placeholder")}
          value={todoListTitle}
          onChangeText={setTodoListTitle}
          aria-labelledby={"inputLabel"}
          aria-errormessage={"inputError"}
        />
      </View>

      {todoTasks.length > 0 && (
        <View className={"flex w-full bg-gray-200 rounded-3xl p-4 max-h-44 min-h-16"}>
          <FlatList
            ref={listRef}
            data={todoTasks}
            renderItem={renderItem}
            ItemSeparatorComponent={ItemSeparator}
          />
        </View>
      )}

      <AddTaskForm setTodoTasks={setTodoTasks} listRef={listRef} />

      <View className={"flex w-full mt-auto"}>
        <Button
          title={t("sendTodo.cta.send-todo")}
          color={appTheme.colors.primary}
          buttonStyle={{
            backgroundColor: isReadyToSend ? appTheme.colors.primary : appTheme.colors.gray,
          }}
          disabled={!isReadyToSend}
        />
      </View>
    </View>
  );
}
