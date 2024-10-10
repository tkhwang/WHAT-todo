import React, { RefObject, useCallback, useState } from "react";
import { TextInput, View } from "react-native";
import { useTranslation } from "react-i18next";
import { AddTaskRequest, TaskType } from "@whatTodo/models";
import { useAtomValue } from "jotai";

import Icon from "@/assets/icons";
import Input from "@/components/Input";
import { useAddTask } from "@/hooks/mutations/useAddTask";
import { userDefaultListIdAtom } from "@/states/list";
import { myUserIdAtom } from "@/states/me";

import TaskTypeRadioSelect from "../TaskTypeRadioSelect";

interface Props {
  inputRef: RefObject<TextInput>;
}

export default function AddTaskInput({ inputRef }: Props) {
  const { t } = useTranslation();

  const myUserId = useAtomValue(myUserIdAtom);
  const userDefaultListId = useAtomValue(userDefaultListIdAtom);

  const [showButttons, setShowButttons] = useState(false);

  const [task, setTask] = useState("");
  const [taskType, setTaskType] = useState<TaskType>("todo");

  const toggleTaskType = useCallback(() => {
    setTaskType((prv) => (prv === "todo" ? "not-todo" : "todo"));
  }, []);

  const { mutate: addTaskMutate } = useAddTask();

  const onChangeTask = useCallback(
    (task: string) => {
      setTask(task);
    },
    [setTask],
  );

  const handleSubmitTask = useCallback(() => {
    if (!task) return;
    if (!userDefaultListId) return;

    const newTaskDto: AddTaskRequest = {
      task,
      listId: userDefaultListId,
      taskType,
      userIds: [myUserId],
      supervisorIds: [],
    };

    addTaskMutate(newTaskDto);
    setShowButttons(false);

    setTask("");
  }, [addTaskMutate, myUserId, task, taskType, userDefaultListId]);

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
          {/* <Icon name={"calendar"} size={22} strokeWidth={1.5} /> */}
          {/* <Icon name={"alertCircle"} size={22} strokeWidth={1.5} /> */}
          {/* <Icon name={"noteEdit"} size={22} strokeWidth={1.5} /> */}

          <TaskTypeRadioSelect taskType={taskType} setTaskType={setTaskType} />
        </View>
      )}
    </View>
  );
}
