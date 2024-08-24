import { useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import MainHeader from "@/components/MainLayout/MainHeader";
import FloatingActionButton from "@/components/Button/FloatingActionButton";
import Today from "@/components/Today";
import AddTodoBottomSheetSimple from "@/components/Todo/add/AddTodoBottomSheetSimple";

export default function HomeScreen() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  return (
    <ScreenWrapper>
      <MainHeader />
      <Today />
      <FloatingActionButton bottomSheetModalRef={bottomSheetModalRef} />
      <AddTodoBottomSheetSimple bottomSheetModalRef={bottomSheetModalRef} />
    </ScreenWrapper>
  );
}
