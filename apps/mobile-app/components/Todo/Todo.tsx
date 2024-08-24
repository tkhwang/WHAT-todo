import { Pressable, View } from "react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useTodo } from "@/hooks/queries/useTodo";
import { Text } from "@/components/ui/text";
import Icon from "@/assets/icons";

import { Checkbox } from "../ui/checkbox";

interface Props {
  todoId: string;
}

export default function Todo({ todoId }: Props) {
  const { t } = useTranslation();
  const { data: todo, isSuccess } = useTodo(todoId);

  const [checked, setChecked] = useState(false);

  const handlePress = () => {
    setChecked(!checked);
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
      <View className={"flex-row items-center gap-4"}>
        <Icon name={"calendar"} size={26} strokeWidth={1.6} />
        <Text className={"text-xl font-normal text-gray-500"}>{t("todo.addDueDate.title")}</Text>
      </View>
    </View>
  );
}
