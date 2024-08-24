import { Pressable, View } from "react-native";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { useTodo } from "@/hooks/queries/useTodo";
import { Text } from "@/components/ui/text";
import Icon from "@/assets/icons";
import { useDueDateStore } from "@/store/dueDate";

import { Checkbox } from "../ui/checkbox";
import AddDueDateBottomSheet from "./add/AddDueDateBottomSheet";

interface Props {
  todoId: string;
}

export default function TodoDetail({ todoId }: Props) {
  const { t } = useTranslation();
  const { data: todo, isSuccess } = useTodo(todoId);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [checked, setChecked] = useState(false);
  const { dueDate } = useDueDateStore();

  const handlePress = () => {
    setChecked(!checked);
  };

  const handleDueDatePress = () => {
    bottomSheetModalRef.current?.present();
  };

  if (!isSuccess) return null;

  return (
    <View className={"flex-1 flex-col p-4 gap-4"}>
      {/* title */}
      <Pressable className={"flex-row gap-4 items-center"} onPress={handlePress}>
        <Checkbox checked={checked} onCheckedChange={setChecked} />
        <Text className={"text-2xl font-bold"}>{todo.todo}</Text>
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

      <AddDueDateBottomSheet todoId={todoId} bottomSheetModalRef={bottomSheetModalRef} />
    </View>
  );
}
