import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { DeleteTaskRequest } from "@whatTodo/models/src/todo/dto/delete-task.dto";

import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import TodoDetail from "@/components/Todo/TodoDetail";
import Header from "@/components/MainLayout/Header";
import Icon from "@/assets/icons";
import { appTheme } from "@/constants/uiConsts";
import { useDeleteTask } from "@/hooks/mutations/useDeleteTask";

export default function TodoScreen() {
  const { t } = useTranslation();

  const { id: taskId } = useLocalSearchParams() as { id: string };

  const { mutateAsync } = useDeleteTask();

  const handleDelete = async () => {
    const requestDto: DeleteTaskRequest = { taskId };
    await mutateAsync(requestDto);
  };

  return (
    <ScreenWrapper>
      <View className={"flex-1 px-4"}>
        <Header title={t("screen.task.title")} showBackButton />
        <TouchableOpacity style={styles.logoutButton} onPress={handleDelete}>
          <Icon name={"delete"} color={appTheme.colors.rose} onPress={handleDelete} />
        </TouchableOpacity>
        <TodoDetail todoId={taskId} />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    position: "absolute",
    right: 16,
    padding: 5,
    borderRadius: appTheme.radius.sm,
    backgroundColor: "#fee2e2",
  },
});
