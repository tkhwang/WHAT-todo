import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { DeleteTaskRequest } from "@whatTodo/models";

import { Text } from "@/components/ui/text";
import Icon from "@/assets/icons";
import { cn } from "@/lib/utils";
import { useTask } from "@/hooks/queries/useTask";
import { useToggleTaskIsDone } from "@/hooks/mutations/useToggleTaskIsDone";
import { useList } from "@/hooks/queries/useList";
import { useUpdateTask } from "@/hooks/mutations/useUpdateTask";
import { useDeleteTask } from "@/hooks/mutations/useDeleteTask";
import { appTheme } from "@/constants/uiConsts";

import { Checkbox } from "../ui/checkbox";
import AddDueDateBottomSheet from "./add/AddDueDateBottomSheet";
import { Textarea } from "../ui/textarea";
import Header from "../MainLayout/Header";
import Loading from "../Loading";

interface Props {
  taskId: string;
}

export default function TaskDetail({ taskId }: Props) {
  const { t } = useTranslation();

  const { data: task } = useTask(taskId);
  const { data: list } = useList(task?.listId ?? "");
  const today = new Date();

  const inputRef = useRef<TextInput>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [checked, setChecked] = useState(false);
  const [note, setNote] = useState("");

  const { mutateAsync: toggleTaskIsDoneMutation } = useToggleTaskIsDone();
  const { mutate: updateTaskMutate } = useUpdateTask();
  const { mutateAsync, isPending } = useDeleteTask();

  useEffect(() => {
    if (task) {
      setChecked(task.isDone);
      setNote(task.note ?? "");
    }

    return () => {
      setNote("");
    };
  }, [task]);

  const handleBackPress = () => {
    const updateTaskRequestDto = {
      ...task,
      isDone: checked,
      note: note === "" ? undefined : note,
    };

    updateTaskMutate(updateTaskRequestDto);
  };

  const handleToggleIsDone = useCallback(async () => {
    setChecked((prv) => !prv);
    await toggleTaskIsDoneMutation({ taskId });
  }, [taskId, toggleTaskIsDoneMutation]);

  const handleDelete = async () => {
    const requestDto: DeleteTaskRequest = { taskId };
    await mutateAsync(requestDto);
  };

  const handleDueDatePress = () => {
    Keyboard.dismiss();
    bottomSheetModalRef.current?.present();
  };

  const handleBlur = () => {
    Keyboard.dismiss();
  };

  if (!task) return null;

  return (
    <View className={"flex-1 px-4"}>
      {/* Header */}
      <Header title={t("screen.task.title")} showBackButton onBackPress={handleBackPress} />
      {isPending ? (
        <View style={styles.logoutButton}>
          <Loading size={"small"} color={appTheme.colors.rose} />
        </View>
      ) : (
        <TouchableOpacity style={styles.logoutButton} onPress={handleDelete}>
          <Icon name={"delete"} color={appTheme.colors.rose} onPress={handleDelete} />
        </TouchableOpacity>
      )}
      <KeyboardAvoidingView
        className={"flex-1 w-screen"}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className={"flex-1 flex-col gap-8 justify-end"}>
          {/* title */}
          <View className={"flex-row pt-4 pl-1 gap-4 items-center"}>
            <Checkbox checked={checked} onCheckedChange={handleToggleIsDone} />
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
            <Text className={"text-xl font-normal text-gray-500"}>
              {t("todo.addDueDate.title")}
            </Text>
          </Pressable>

          {/* note */}
          <View className={"flex-row items-center gap-4"}>
            <Icon name={"noteEdit"} size={26} strokeWidth={1.6} />
            <Textarea
              ref={inputRef}
              className={"w-full p-4 mr-4"}
              style={{ marginRight: 16 }}
              placeholder={t("task.note.addNote.placehold")}
              value={note}
              onBlur={handleBlur}
              onChangeText={setNote}
              autoFocus={false}
              aria-labelledby={"textareaLabel"}
            />
          </View>
          <View className={"flex-1"} />

          <AddDueDateBottomSheet
            todoId={taskId}
            bottomSheetModalRef={bottomSheetModalRef}
            today={today}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    position: "absolute",
    right: 16,
    padding: 6,
    borderRadius: appTheme.radius.sm,
    backgroundColor: "#fee2e2",
  },
});
