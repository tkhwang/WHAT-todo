import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { DeleteTaskRequest, IList, ITask } from "@whatTodo/models";

import { Text } from "@/components/ui/text";
import Icon from "@/assets/icons";
import { cn } from "@/lib/utils";
import { useToggleTaskIsDone } from "@/hooks/mutations/useToggleTaskIsDone";
import { useUpdateTask } from "@/hooks/mutations/useUpdateTask";
import { useDeleteTask } from "@/hooks/mutations/useDeleteTask";
import { appTheme } from "@/constants/uiConsts";
import { useLists } from "@/hooks/queries/useLists";
import { useTasks } from "@/hooks/queries/useTasks";

import { Checkbox } from "../ui/checkbox";
import AddDueDateBottomSheet from "./add/AddDueDateBottomSheet";
import { Textarea } from "../ui/textarea";
import Header from "../MainLayout/Header";
import Loading from "../Loading";
import { Switch } from "../ui/switch";

interface Props {
  listId: string;
  taskId: string;
}

export default function TaskDetail({ listId, taskId }: Props) {
  const { t } = useTranslation();

  const { data: list } = useLists<IList | undefined>((lists: IList[]) =>
    lists.find((list) => list.id === listId),
  );

  const { data: task } = useTasks<ITask | undefined>(listId, (tasks) =>
    tasks.find((task) => task.id === taskId),
  );

  const inputRef = useRef<TextInput>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const today = new Date();

  const [checked, setChecked] = useState(false);
  const [isTodoType, setIsTodoType] = useState(true);

  const [note, setNote] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);

  const { mutate: toggleTaskIsDoneMutate } = useToggleTaskIsDone();
  const { mutate: updateTaskMutate } = useUpdateTask();
  const { mutate: deleteTaskMutate, isPending } = useDeleteTask();

  useEffect(() => {
    if (task) {
      setChecked(task.isDone);
      setNote(task.note ?? "");
      if (task.dueDate) setDueDate(task.dueDate);
    }

    return () => {
      setNote("");
      setDueDate(null);
    };
  }, [task]);

  const handleBackPress = () => {
    const updateTaskRequestDto = {
      ...task,
      isDone: checked,
      note: note === "" ? undefined : note,
      dueDate: dueDate === null ? undefined : dueDate,
    };

    updateTaskMutate(updateTaskRequestDto);
  };

  const handleToggleIsDone = useCallback(() => {
    setChecked((prv) => !prv);
    toggleTaskIsDoneMutate({ taskId });
  }, [taskId, toggleTaskIsDoneMutate]);

  const handleDelete = () => {
    const requestDto: DeleteTaskRequest = { taskId };
    deleteTaskMutate(requestDto);
  };

  const handleDueDatePress = () => {
    if (dueDate) return;

    Keyboard.dismiss();
    bottomSheetModalRef.current?.present();
  };

  const handleBlur = () => {
    Keyboard.dismiss();
  };

  if (!task || !list) return null;

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
            <Text className={"text-xl font-normal text-gray-500"}>{list.title}</Text>
          </View>

          {/* todo type */}
          <View className={"flex-row items-center gap-2"}>
            {isTodoType ? (
              <Icon
                name={"checkmarkSquare"}
                size={26}
                strokeWidth={1.6}
                color={appTheme.colors.secondary}
              />
            ) : (
              <Icon
                name={"noteRemove"}
                size={26}
                strokeWidth={1.6}
                color={appTheme.colors.primary}
              />
            )}
            <Text className={"text-xl font-normal text-gray-500"}>{t("task.list.type")}</Text>
            <View className={"flex flex-row items-center justify-center flex-1 gap-4"}>
              <Text
                className={cn(
                  "flex-1 text-xl text-right",
                  isTodoType ? "font-normal" : "font-semibold",
                )}
              >
                {t("task.list.type.notTodo")}
              </Text>
              <Switch
                className={"flex-1"}
                checked={isTodoType}
                onCheckedChange={setIsTodoType}
                nativeID={"todo"}
              />
              <Text
                className={cn(
                  "flex-1  text-xl text-left",
                  isTodoType ? "font-semibold" : "font-normal",
                )}
              >
                {t("task.list.type.todo")}
              </Text>
            </View>
          </View>

          {/* due date */}
          {/* <Pressable className={"flex-row  items-center gap-4"} onPress={handleDueDatePress}>
            <Icon name={"calendar"} size={26} strokeWidth={1.6} />
            <Text className={cn("text-xl font-normal", dueDate ? "" : "text-gray-400")}>
              {dueDate ? getDateWithDayOfWeek(dueDate, 0) : t("todo.addDueDate.title")}
            </Text>
            {dueDate && (
              <Pressable
                style={{ position: "absolute", right: 24 }}
                onPress={() => setDueDate(null)}
              >
                <Icon name={"cancelCircle"} size={26} strokeWidth={1.6} />
              </Pressable>
            )}
          </Pressable> */}

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
            setDueDate={setDueDate}
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
