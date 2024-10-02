import { View } from "react-native";
import { SEND_TODO_STEPS } from "@whatTodo/models";

import { Text } from "@/components/ui/text";

interface Props {
  sendTodoSteps: string;
}

export default function SendTodoStepsTitle({ sendTodoSteps }: Props) {
  const generateTitle = (sendTodoSteps: string) => {
    if (sendTodoSteps === SEND_TODO_STEPS.SEARCH) return "[1] SEARCH";
    if (sendTodoSteps === SEND_TODO_STEPS.SELECT) return "[2] SELECT";
    return "";
  };

  return (
    <View className={"flex flex-row w-full gap-4 items-center"}>
      <Text className={"text-xl font-semibold"}>{"Steps:"}</Text>
      <Text className={"text-xl"}>{generateTitle(sendTodoSteps)}</Text>
      <View className={"flex-1 h-px bg-gray-300"} />
    </View>
  );
}
