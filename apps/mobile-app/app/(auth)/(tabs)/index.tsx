import { useEffect, useRef } from "react";
import { KeyboardAvoidingView, Platform, TextInput, View } from "react-native";

import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import MainHeader from "@/components/MainLayout/MainHeader";
import AddTaskInput from "@/components/Task/add/AddTaskInput";
import ListContainer from "@/components/List/ListContainer";

export default function HomeScreen() {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    inputRef.current?.blur();
  }, []);

  return (
    <ScreenWrapper>
      <MainHeader />
      <KeyboardAvoidingView
        className={"flex-1 w-screen"}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className={"flex-1 w-screen justify-end"}>
          <ListContainer userType={"user"} />
          <AddTaskInput inputRef={inputRef} />
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
