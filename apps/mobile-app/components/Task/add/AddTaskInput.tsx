import React, { RefObject, useCallback, useState } from "react";
import { TextInput, View } from "react-native";
import { useTranslation } from "react-i18next";
import { AddTaskRequest } from "@whatTodo/models";
import { useAtomValue } from "jotai";

import Icon from "@/assets/icons";
import Input from "@/components/Input";
import { useTaskStore } from "@/stores/todo";
import Loading from "@/components/Loading";
import { appTheme } from "@/constants/uiConsts";
import { useAddTask } from "@/hooks/mutations/useAddTask";
import { currentListIdAtom } from "@/states/list";

interface Props {
  inputRef: RefObject<TextInput>;
}

export default function AddTaskInput({ inputRef }: Props) {
  const { t } = useTranslation();

  const currentListId = useAtomValue(currentListIdAtom);

  const [showButttons, setShowButttons] = useState(false);
  const { task, isLoading, updateTask, reset } = useTaskStore();
  const { mutate: addTaskMutate } = useAddTask();

  const onChangeTask = useCallback(
    (task: string) => {
      updateTask(task);
    },
    [updateTask],
  );

  const handleSubmitTask = useCallback(() => {
    if (!task) return;
    if (!currentListId) return;

    const newTaskDto: AddTaskRequest = {
      task,
      listId: currentListId,
      taskType: "todo",
    };

    addTaskMutate(newTaskDto);
    setShowButttons(false);

    reset();
  }, [addTaskMutate, currentListId, reset, task]);

  const handleFocus = () => {
    setShowButttons(true);
    // inputRef.current?.focus();
  };

  const handleBlur = () => {
    setShowButttons(false);
  };

  return (
    <View className={"w-screen p-4 mb-1 gap-4"}>
      <Input
        inputRef={inputRef}
        value={task}
        onChangeText={onChangeTask}
        icon={<Icon name={"plusSign"} size={26} strokeWidth={1.6} />}
        placeholder={t("todo.add.task")}
        aria-labelledby={"inputLabel"}
        aria-errormessage={"inputError"}
        fontSize={15}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onSubmitEditing={handleSubmitTask}
      />
      {showButttons && (
        <View className={"flex-row gap-6 mx-2"}>
          <Icon name={"calendar"} size={22} strokeWidth={1.5} />
          <Icon name={"alertCircle"} size={22} strokeWidth={1.5} />
          <Icon name={"noteEdit"} size={22} strokeWidth={1.5} />
        </View>
      )}
    </View>
  );
}
