import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { DeleteTaskRequest } from "@whatTodo/models";
import { useState } from "react";

import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import TaskDetail from "@/components/Task/TaskDetail";
import Header from "@/components/MainLayout/Header";
import Icon from "@/assets/icons";
import { appTheme } from "@/constants/uiConsts";
import { useDeleteTask } from "@/hooks/mutations/useDeleteTask";
import Loading from "@/components/Loading";

export default function TodoScreen() {
  const { t } = useTranslation();

  const { id: taskId } = useLocalSearchParams() as { id: string };

  const { mutateAsync, isPending } = useDeleteTask();

  const [handleBackPress, setHandleBackPress] = useState(() => {});

  const handleDelete = async () => {
    const requestDto: DeleteTaskRequest = { taskId };
    await mutateAsync(requestDto);
  };

  const onBackPress = () => {
    console.log("[+][TodoScreen] onBackPress");
  };

  return (
    <ScreenWrapper>
      <View className={"flex-1 px-4"}>
        <Header title={t("screen.task.title")} showBackButton onBackPress={onBackPress} />
        {isPending ? (
          <View style={styles.iconButton}>
            <Loading size={"small"} color={appTheme.colors.rose} />
          </View>
        ) : (
          <TouchableOpacity style={styles.iconButton} onPress={handleDelete}>
            <Icon name={"delete"} color={appTheme.colors.rose} onPress={handleDelete} />
          </TouchableOpacity>
        )}
        <TaskDetail taskId={taskId} setHandleBackPress={setHandleBackPress} />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    position: "absolute",
    right: 16,
    padding: 6,
    borderRadius: appTheme.radius.sm,
    backgroundColor: "#fee2e2",
  },
});
