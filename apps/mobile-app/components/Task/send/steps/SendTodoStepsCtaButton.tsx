import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { SEND_TODO_STEPS } from "@whatTodo/models";

import Button from "@/components/Button/Button";
import { appTheme } from "@/constants/uiConsts";
import { IUserFS } from "@/types";

interface Props {
  selectedUsers: IUserFS[];
  sendTodoSteps: string;
}

export default function SendTodoStepsCtaButton({ selectedUsers, sendTodoSteps }: Props) {
  const { t } = useTranslation();

  const generateText = (sendTodoSteps: string) => {
    if (sendTodoSteps === SEND_TODO_STEPS.SEARCH) return "NEXT";
    return "";
  };

  return (
    <View className={"flex flex-row py-4 gap-4"}>
      <View className={"flex flex-1"}>
        <Button
          title={"<"}
          color={appTheme.colors.primary}
          disabled={selectedUsers.length === 0}
          buttonStyle={{
            backgroundColor:
              selectedUsers.length > 0 ? appTheme.colors.primary : appTheme.colors.gray,
          }}
        />
      </View>
      <View className={"flex flex-1"}>
        <Button
          title={">"}
          color={appTheme.colors.primary}
          disabled={selectedUsers.length === 0}
          buttonStyle={{
            backgroundColor:
              selectedUsers.length > 0 ? appTheme.colors.primary : appTheme.colors.gray,
          }}
        />
      </View>
    </View>
  );
}
