import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import MainHeader from "@/components/MainLayout/MainHeader";
import FloatingActionButton from "@/components/Button/FloatingActionButton";
import Today from "@/components/Today";

export default function HomeScreen() {
  return (
    <ScreenWrapper>
      <MainHeader />
      <Today />
      <FloatingActionButton />
    </ScreenWrapper>
  );
}
