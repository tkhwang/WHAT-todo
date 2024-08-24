import { useEffect, useRef } from "react";
import { KeyboardAvoidingView, Platform, TextInput, View } from "react-native";

import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import MainHeader from "@/components/MainLayout/MainHeader";
import Today from "@/components/Today";
import AddTodoSimple from "@/components/Todo/add/AddTodoSimple";

export default function HomeScreen() {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    inputRef.current?.blur();
  }, []);

  return (
    <ScreenWrapper>
      <MainHeader />
      <KeyboardAvoidingView className={"flex-1 w-screen"} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View className={"flex-1 w-screen justify-end w-full"}>
          <Today />
          <AddTodoSimple inputRef={inputRef} />
        </View>
        {/* <FloatingActionButton bottomSheetModalRef={bottomSheetModalRef} /> */}
        {/* <AddTodoBottomSheetSimple bottomSheetModalRef={bottomSheetModalRef} /> */}
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
