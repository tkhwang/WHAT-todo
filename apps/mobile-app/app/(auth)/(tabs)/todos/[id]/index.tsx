import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";

import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import Todo from "@/components/Todo/TodoDetail";
import Header from "@/components/MainLayout/Header";

export default function TodoScreen() {
  const { id: todoId } = useLocalSearchParams() as { id: string };

  const { t } = useTranslation();

  return (
    <ScreenWrapper>
      <Header title={t("screen.todo.title")} showBackButton />
      <Todo todoId={todoId} />
    </ScreenWrapper>
  );
}
