import React, { RefObject, useCallback, useState } from "react";
import { TextInput, View } from "react-native";
import { useTranslation } from "react-i18next";
import { AddTaskRequest } from "@whatTodo/models";
import { useAtomValue } from "jotai";

import Icon from "@/assets/icons";
import Input from "@/components/Input";
import { useTodoStore } from "@/stores/todo";
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
  const { task, isLoading, updateTask, reset } = useTodoStore();
  const { mutateAsync: addTaskMutationAsync } = useAddTask();

  const onChangeTask = useCallback(
    (task: string) => {
      updateTask(task);
    },
    [updateTask],
  );

  const handleSubmitTask = useCallback(async () => {
    if (!task) return;
    if (!currentListId) return;

    const newTaskDto: AddTaskRequest = {
      task,
      listId: currentListId,
    };

    await addTaskMutationAsync(newTaskDto);
    setShowButttons(false);

    reset();
  }, [addTaskMutationAsync, currentListId, reset, task]);

  const handleFocus = () => {
    setShowButttons(true);
    // inputRef.current?.focus();
  };

  const handleBlur = () => {
    setShowButttons(false);
  };

  return (
    <View className={"w-screen p-4 mb-1 gap-4"}>
      {isLoading ? (
        <Loading size={"small"} color={appTheme.colors.primary} />
      ) : (
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
      )}
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
