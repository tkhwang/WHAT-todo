import { Keyboard, KeyboardAvoidingView, Platform, Pressable, TextInput, View } from "react-native";
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { Text } from "@/components/ui/text";
import Icon from "@/assets/icons";
import { cn } from "@/lib/utils";
import { useTask } from "@/hooks/queries/useTask";
import { useToggleTaskIsDone } from "@/hooks/mutations/useToggleTaskIsDone";
import { useList } from "@/hooks/queries/useList";
import { useUpdateTask } from "@/hooks/mutations/useUpdateTask";

import { Checkbox } from "../ui/checkbox";
import AddDueDateBottomSheet from "./add/AddDueDateBottomSheet";
import { Textarea } from "../ui/textarea";

interface Props {
  taskId: string;
  setHandleBackPress: Dispatch<SetStateAction<void>>;
}

export default function TaskDetail({ taskId, setHandleBackPress }: Props) {
  const { t } = useTranslation();

  const { data: task } = useTask(taskId);
  const { data: list } = useList(task?.listId ?? "");

  const inputRef = useRef<TextInput>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [checked, setChecked] = useState(false);
  const [note, setNote] = useState("");

  const { mutate: updateTaskMutate } = useUpdateTask();
  const { mutateAsync: toggleTaskIsDoneMutation } = useToggleTaskIsDone();

  useEffect(() => {
    setHandleBackPress(() => {
      updateTaskMutate({ taskId });
    });
    console.log("[+][TaskDetail] setHandleBackPress");
  }, [setHandleBackPress, taskId, updateTaskMutate]);

  useEffect(() => {
    if (task) setChecked(task.isDone);
  }, [task]);

  const handlePress = useCallback(async () => {
    setChecked((prv) => !prv);
    await toggleTaskIsDoneMutation({ taskId });
  }, [taskId, toggleTaskIsDoneMutation]);

  const handleDueDatePress = () => {
    Keyboard.dismiss();
    bottomSheetModalRef.current?.present();
  };

  const handleBlur = () => {
    Keyboard.dismiss();
  };

  if (!task) return null;

  return (
    <KeyboardAvoidingView
      className={"flex-1 w-screen"}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className={"flex-1 flex-col gap-8 justify-end"}>
        {/* title */}
        <View className={"flex-row pt-4 pl-1 gap-4 items-center"}>
          <Checkbox checked={checked} onCheckedChange={handlePress} />
          <Text className={cn("text-3xl font-bold", checked ? "line-through" : "")}>
            {task.task}
          </Text>
        </View>

        {/* list */}
        <View className={"flex-row items-center gap-4"}>
          <Icon name={"leftToRightListBullet"} size={26} strokeWidth={1.6} />
          <Text className={"text-xl font-normal text-gray-500"}>{t("task.list.title")}</Text>
          <Text className={"text-xl font-normal text-gray-500"}>{list?.title}</Text>
        </View>

        {/* due date */}
        <Pressable className={"flex-row items-center gap-4"} onPress={handleDueDatePress}>
          <Icon name={"calendar"} size={26} strokeWidth={1.6} />
          <Text className={"text-xl font-normal text-gray-500"}>{t("todo.addDueDate.title")}</Text>
        </Pressable>

        {/* note */}
        <View className={"flex-row items-center gap-4"}>
          <Icon name={"noteEdit"} size={26} strokeWidth={1.6} />
          <Textarea
            ref={inputRef}
            className={"w-full"}
            placeholder={t("task.note.addNote.placehold")}
            value={note}
            onBlur={handleBlur}
            onChangeText={setNote}
            autoFocus={false}
            aria-labelledby={"textareaLabel"}
          />
        </View>
        <View className={"flex-1"} />

        <AddDueDateBottomSheet todoId={taskId} bottomSheetModalRef={bottomSheetModalRef} />
      </View>
    </KeyboardAvoidingView>
  );
}
