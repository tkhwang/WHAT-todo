import { useLocalSearchParams } from "expo-router";

import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import MainHeader from "@/components/MainLayout/MainHeader";
import Todo from "@/components/Todo/Todo";

export default function TodoScreen() {
  const { id: todoId } = useLocalSearchParams() as { id: string };

  return (
    <ScreenWrapper>
      <MainHeader />
      <Todo todoId={todoId} />
    </ScreenWrapper>
  );
}
