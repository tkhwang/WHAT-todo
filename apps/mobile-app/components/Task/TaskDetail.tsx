import { Pressable, TextInput, View } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { Text } from "@/components/ui/text";
import Icon from "@/assets/icons";
import { useDueDateStore } from "@/stores/dueDate";
import { cn } from "@/lib/utils";
import { useTask } from "@/hooks/queries/useTask";
import { useToggleTaskIsDone } from "@/hooks/mutations/useToggleTaskIsDone";

import { Checkbox } from "../ui/checkbox";
import AddDueDateBottomSheet from "./add/AddDueDateBottomSheet";
import { Textarea } from "../ui/textarea";

interface Props {
  taskId: string;
}

export default function TaskDetail({ taskId }: Props) {
  const { t } = useTranslation();

  const { data: task } = useTask(taskId);

  const inputRef = useRef<TextInput>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [checked, setChecked] = useState(false);
  const [note, setNote] = useState("");

  const init = useDueDateStore((state) => state.init);

  const { mutateAsync: toggleTaskIsDoneMutation } = useToggleTaskIsDone();

  useEffect(() => {
    if (task) setChecked(task.isDone);
  }, [task]);

  const handlePress = useCallback(async () => {
    setChecked((prv) => !prv);
    await toggleTaskIsDoneMutation({ taskId });
  }, [taskId, toggleTaskIsDoneMutation]);

  const handleDueDatePress = () => {
    init();
    bottomSheetModalRef.current?.present();
  };

  if (!task) return null;

  return (
    <View className={"flex-1 flex-col gap-8"}>
      {/* title */}
      <View className={"flex-row pt-4 pl-1 gap-4 items-center"}>
        <Checkbox checked={checked} onCheckedChange={handlePress} />
        <Text className={cn("text-3xl font-bold", checked ? "line-through" : "")}>{task.task}</Text>
      </View>

      {/* due date */}
      <Pressable className={"flex-row items-center gap-4"} onPress={handleDueDatePress}>
        <Icon name={"calendar"} size={26} strokeWidth={1.6} />
        <Text className={"text-xl font-normal text-gray-500"}>{t("todo.addDueDate.title")}</Text>
      </Pressable>

      {/* note */}
      <Pressable className={"flex-row items-center gap-4"} onPress={handleDueDatePress}>
        <Icon name={"noteEdit"} size={26} strokeWidth={1.6} />
        <Textarea
          ref={inputRef}
          className={"flex-1"}
          placeholder={t("task.note.addNote.placehold")}
          value={note}
          onChangeText={setNote}
          aria-labelledby={"textareaLabel"}
        />
      </Pressable>

      <AddDueDateBottomSheet todoId={taskId} bottomSheetModalRef={bottomSheetModalRef} />
    </View>
  );
}
