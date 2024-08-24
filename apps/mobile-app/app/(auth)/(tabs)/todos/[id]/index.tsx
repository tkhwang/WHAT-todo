import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, StyleSheet, View } from "react-native";

import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import TodoDetail from "@/components/Todo/TodoDetail";
import Header from "@/components/MainLayout/Header";
import Icon from "@/assets/icons";
import { appTheme } from "@/constants/uiConsts";

export default function TodoScreen() {
  const { id: todoId } = useLocalSearchParams() as { id: string };

  const { t } = useTranslation();

  const handleDelete = () => {};

  return (
    <ScreenWrapper>
      <View className={"flex-1 px-4"}>
        <Header title={t("screen.task.title")} showBackButton />
        <TouchableOpacity style={styles.logoutButton} onPress={handleDelete}>
          <Icon name={"delete"} color={appTheme.colors.rose} onPress={handleDelete} />
        </TouchableOpacity>
        <TodoDetail todoId={todoId} />
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
