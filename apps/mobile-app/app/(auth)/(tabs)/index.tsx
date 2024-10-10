import { useEffect, useRef } from "react";
import { KeyboardAvoidingView, Platform, TextInput, View } from "react-native";
import { useSetAtom } from "jotai";

import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import MainHeader from "@/components/MainLayout/MainHeader";
import AddTaskInput from "@/components/Task/add/AddTaskInput";
import ListContainer from "@/components/List/ListContainer";
import { useSelectUserDefaultList } from "@/hooks/queries/select/useSelectUserDefaultList";
import { useUserLists } from "@/hooks/queries/useUserLists";
import { userDefaultListIdAtom } from "@/states/list";

export default function HomeScreen() {
  const inputRef = useRef<TextInput>(null);

  const { selectUserDefaultList } = useSelectUserDefaultList();
  const { data: userDefaultList } = useUserLists("user", selectUserDefaultList);

  const setUserDefaultListId = useSetAtom(userDefaultListIdAtom);

  useEffect(() => {
    inputRef.current?.blur();
  }, []);

  useEffect(() => {
    if (userDefaultList?.id) setUserDefaultListId(userDefaultList.id);
  }, [setUserDefaultListId, userDefaultList]);

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
