import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import MainHeader from "@/components/MainLayout/MainHeader";
import AddTodoButtomSheet from "@/components/Todo/add/AddTodoBottomSheet";

export default function NewTaskScreen() {
  return (
    <ScreenWrapper>
      <MainHeader />
      <AddTodoButtomSheet />
    </ScreenWrapper>
  );
}
