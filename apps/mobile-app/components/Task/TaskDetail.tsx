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
import { DeleteTaskRequest, IList, ITask, TaskType, UserType } from "@whatTodo/models";
import { useRouter } from "expo-router";

import { Text } from "@/components/ui/text";
import Icon from "@/assets/icons";
import { cn } from "@/lib/utils";
import { useUpdateTask } from "@/hooks/mutations/useUpdateTask";
import { useDeleteTask } from "@/hooks/mutations/useDeleteTask";
import { appTheme } from "@/constants/uiConsts";
import { useLists } from "@/hooks/queries/useLists";
import { useTasks } from "@/hooks/queries/useTasks";
import { useSelectTaskByTaskId } from "@/hooks/queries/select/useSelectTaskByTaskId";
import { useSelectListByListId } from "@/hooks/queries/select/useSelectListByListId";
import { useSelectUserTaskByTaskId } from "@/hooks/queries/select/useSelectUserTaskByTaskId";
import { useUserTasks } from "@/hooks/queries/useUserTasks";
import { useToggleUserTaskIsDone } from "@/hooks/mutations/useToggleUserTaskIsDone";

import { Checkbox } from "../ui/checkbox";
import AddDueDateBottomSheet from "./add/AddDueDateBottomSheet";
import { Textarea } from "../ui/textarea";
import Header from "../MainLayout/Header";
import Loading from "../Loading";
import TaskTypeRadioSelect from "./TaskTypeRadioSelect";

interface Props {
  userType: UserType;
  listId: string;
  taskId: string;
}

export default function TaskDetail({ userType, listId, taskId }: Props) {
  const router = useRouter();
  const { t } = useTranslation();

  const { selectListByListId } = useSelectListByListId(listId);
  const { data: list } = useLists<IList | undefined>(userType, selectListByListId);

  const { selectTaskByTaskId } = useSelectTaskByTaskId(taskId);
  const { data: task } = useTasks<ITask | undefined>(listId, selectTaskByTaskId);

  const { selectUserTaskByTaskId } = useSelectUserTaskByTaskId(taskId);
  const { data: userTask } = useUserTasks(listId, selectUserTaskByTaskId);

  const inputRef = useRef<TextInput>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const today = new Date();

  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [isDone, setIsDone] = useState(false);
  const [note, setNote] = useState("");
  const [taskType, setTaskType] = useState<TaskType>("todo");

  const { mutate: updateTaskMutate } = useUpdateTask();
  const { mutate: toggleTaskIsDoneMutate } = useToggleUserTaskIsDone();
  const { mutate: deleteTaskMutate, isPending } = useDeleteTask(() => router.back());

  const toggleIsDone = useCallback(() => {
    setIsDone((prv) => !prv);
    toggleTaskIsDoneMutate({ taskId });
  }, [taskId, toggleTaskIsDoneMutate]);

  useEffect(() => {
    if (task) {
      setNote(task.note ?? "");
      setTaskType(task.taskType);
    }
  }, [task]);

  useEffect(() => {
    if (userTask) {
      setIsDone(userTask.isDone);
    }
  }, [userTask]);

  const handleBackPress = () => {
    const updateTaskRequestDto = {
      ...task,
      isDone,
      note: note === "" ? undefined : note,
      dueDate: dueDate === null ? undefined : dueDate,
      taskType,
    };

    updateTaskMutate(updateTaskRequestDto);
  };

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
    <View className={"flex flex-1 px-4"}>
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
        <View className={"flex-1 flex-col gap-4 justify-end"}>
          {/* title */}
          <View className={"flex-row pt-4 pl-1 gap-4 items-center"}>
            <Checkbox checked={isDone} onCheckedChange={toggleIsDone} />
            <Text className={cn("text-3xl font-bold", isDone ? "line-through" : "")}>
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
          <View className={"flex-row items-center justify-start gap-2"}>
            {taskType === "todo" ? (
              <Icon name={"checkmarkSquare"} size={26} strokeWidth={1.6} />
            ) : (
              <Icon name={"noteRemove"} size={26} strokeWidth={1.6} />
            )}
            <Text className={"text-xl font-normal text-gray-500"}>{t("task.list.type")}</Text>
            <TaskTypeRadioSelect taskType={taskType} setTaskType={setTaskType} />
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
          <View className={"flex-row items-center gap-4 pr-4"}>
            <Icon name={"noteEdit"} size={26} strokeWidth={1.6} />
            <Textarea
              ref={inputRef}
              className={"flex-1 p-4"}
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
