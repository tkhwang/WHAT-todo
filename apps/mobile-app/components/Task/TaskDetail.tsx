import { Pressable, View } from "react-native";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useDocument } from "react-query-firestore";
import { COLLECTIONS, ITask } from "@whatTodo/models";

import { Text } from "@/components/ui/text";
import Icon from "@/assets/icons";
import { useDueDateStore } from "@/stores/dueDate";

import { Checkbox } from "../ui/checkbox";
import AddDueDateBottomSheet from "./add/AddDueDateBottomSheet";

interface Props {
  taskId: string;
}

export default function TaskDetail({ taskId }: Props) {
  const { t } = useTranslation();

  const { data: task } = useDocument<ITask>(`${COLLECTIONS.TASKS}/${taskId}`);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [checked, setChecked] = useState(false);

  const init = useDueDateStore((state) => state.init);

  const handlePress = () => {
    setChecked(!checked);
  };

  const handleDueDatePress = () => {
    init();
    bottomSheetModalRef.current?.present();
  };

  if (!task) return null;

  return (
    <View className={"flex-1 flex-col p-4 gap-4"}>
      {/* title */}
      <Pressable className={"flex-row gap-4 items-center"} onPress={handlePress}>
        <Checkbox checked={checked} onCheckedChange={setChecked} />
        <Text className={"text-2xl font-bold"}>{task.task}</Text>
      </Pressable>

      {/* due date */}
      <Pressable className={"flex-row items-center gap-4"} onPress={handleDueDatePress}>
        <Icon name={"calendar"} size={26} strokeWidth={1.6} />
        <Text className={"text-xl font-normal text-gray-500"}>{t("todo.addDueDate.title")}</Text>
      </Pressable>

      {/* note */}
      <Pressable className={"flex-row items-center gap-4"} onPress={handleDueDatePress}>
        <Icon name={"noteEdit"} size={26} strokeWidth={1.6} />
      </Pressable>

      <AddDueDateBottomSheet todoId={taskId} bottomSheetModalRef={bottomSheetModalRef} />
    </View>
  );
}
