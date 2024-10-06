import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { IAddTask, SEND_TODO_STEPS, SendTodoRequest } from "@whatTodo/models";
import { Dispatch, SetStateAction } from "react";
import { useAtomValue } from "jotai";

import Button from "@/components/Button/Button";
import { appTheme } from "@/constants/uiConsts";
import { IUserFS } from "@/types";
import { useSendTodo } from "@/hooks/mutations/useSendTodo";
import { myUserIdAtom } from "@/states/me";

interface Props {
  sendTodoSteps: string;
  setSendTodoSteps: Dispatch<SetStateAction<string>>;
  todoListTitle: string;
  todoTasks: IAddTask[];
  selectedUsers: IUserFS[];
  selectedSupervisors: IUserFS[];
}

export default function SendTodoStepsCtaButton({
  sendTodoSteps,
  setSendTodoSteps,
  todoListTitle,
  todoTasks,
  selectedUsers,
  selectedSupervisors,
}: Props) {
  const { t } = useTranslation();

  const myUserId = useAtomValue(myUserIdAtom);

  const { mutate: sendTodoMutate } = useSendTodo();

  const handlePressPrevious = (sendTodoSteps: string) => {
    if (sendTodoSteps === SEND_TODO_STEPS.SELECT) {
      setSendTodoSteps(SEND_TODO_STEPS.SEARCH);
    }
  };

  const handlePressNext = (sendTodoSteps: string) => {
    if (sendTodoSteps === SEND_TODO_STEPS.SEARCH) {
      setSendTodoSteps(SEND_TODO_STEPS.SELECT);
    } else {
      const sendTodoDto: SendTodoRequest = {
        todoListTitle,
        todoTasks: todoTasks.map(({ id, ...todoTask }) => ({ ...todoTask })),
        expertId: myUserId,
        userIds: selectedUsers.map((selectedUser) => selectedUser.id),
        supervisorIds: selectedSupervisors.map((selectedSupervisor) => selectedSupervisor.id),
      };
      console.log("🚀 ~ handlePressNext ~ sendTodoDto:", JSON.stringify(sendTodoDto, null, 2));
      sendTodoMutate(sendTodoDto);
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
          disabled={sendTodoSteps === SEND_TODO_STEPS.SEARCH && selectedUsers.length === 0}
          onPress={() => handlePressNext(sendTodoSteps)}
        />
      </View>
    </View>
  );
}
