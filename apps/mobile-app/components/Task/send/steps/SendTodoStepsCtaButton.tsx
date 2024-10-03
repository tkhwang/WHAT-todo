import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { IAddTask, SEND_TODO_STEPS } from "@whatTodo/models";
import { Dispatch, SetStateAction } from "react";

import Button from "@/components/Button/Button";
import { appTheme } from "@/constants/uiConsts";
import { IUserFS } from "@/types";

interface Props {
  todoListTitle: string;
  todoTasks: IAddTask[];
  selectedUsers: IUserFS[];
  sendTodoSteps: string;
  setSendTodoSteps: Dispatch<SetStateAction<string>>;
}

export default function SendTodoStepsCtaButton({
  todoListTitle,
  todoTasks,
  selectedUsers,
  sendTodoSteps,
  setSendTodoSteps,
}: Props) {
  const { t } = useTranslation();

  const handlePressPrevious = (sendTodoSteps: string) => {
    if (sendTodoSteps === SEND_TODO_STEPS.SELECT) {
      setSendTodoSteps(SEND_TODO_STEPS.SEARCH);
    }
  };

  const handlePressNext = (sendTodoSteps: string) => {
    if (sendTodoSteps === SEND_TODO_STEPS.SEARCH) {
      setSendTodoSteps(SEND_TODO_STEPS.SELECT);
    }
  };

  return (
    <View className={"flex flex-row py-4 gap-4"}>
      <View className={"flex flex-1"}>
        <Button
          title={"<"}
          color={appTheme.colors.primary}
          buttonStyle={{
            backgroundColor:
              sendTodoSteps === SEND_TODO_STEPS.SEARCH
                ? appTheme.colors.gray
                : appTheme.colors.primary,
          }}
          disabled={sendTodoSteps === SEND_TODO_STEPS.SEARCH}
          onPress={() => handlePressPrevious(sendTodoSteps)}
        />
      </View>
      <View className={"flex flex-1"}>
        <Button
          title={sendTodoSteps === SEND_TODO_STEPS.SELECT ? t("sendTodo.cta.send-todo") : ">"}
          color={appTheme.colors.primary}
          buttonStyle={{
            backgroundColor:
              (sendTodoSteps === SEND_TODO_STEPS.SEARCH && selectedUsers.length > 0) ||
              (sendTodoSteps === SEND_TODO_STEPS.SELECT &&
                todoListTitle.length > 0 &&
                todoTasks.length > 0)
                ? appTheme.colors.primary
                : appTheme.colors.gray,
          }}
          onPress={() => handlePressNext(sendTodoSteps)}
        />
      </View>
    </View>
  );
}
