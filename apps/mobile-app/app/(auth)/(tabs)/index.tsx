import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform, TextInput, View } from "react-native";
import { AddTodoRequest } from "@whatTodo/models";

import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import MainHeader from "@/components/MainLayout/MainHeader";
import Today from "@/components/Today";
import Input from "@/components/Input";
import Icon from "@/assets/icons";
import { useAddTodoReducer } from "@/hooks/reducers/useAddTodoReducer";
import { useAddTodo } from "@/hooks/mutations/useAddTodo";

export default function HomeScreen() {
  const { t } = useTranslation();

  const inputRef = useRef<TextInput>(null);

  const [addTodo, setAddTodo] = useState("");

  const [{ state: addTodoState, isAddTodoLoading, addTodoError }, addTodoDispatch] = useAddTodoReducer();
  const { mutateAsync: addTodoMutationAsync } = useAddTodo();

  const onChangeText = useCallback((addTodo: string) => {
    setAddTodo(addTodo);
  }, []);

  const handleAddTodo = useCallback(async () => {
    if (!addTodo) return;

    const addTodoDto: AddTodoRequest = {
      todo: addTodo,
    };

    addTodoDispatch({ type: "UPLOAD" });
    await addTodoMutationAsync(addTodoDto);
    setAddTodo("");
  }, [addTodo, addTodoDispatch, addTodoMutationAsync]);

  useEffect(() => {
    inputRef.current?.blur();
  }, []);

  return (
    <ScreenWrapper>
      <MainHeader />
      <KeyboardAvoidingView className={"flex-1 w-screen"} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View className={"flex-1 w-screen justify-end w-full"}>
          <Today />
          <View className={"m-4"}>
            <Input
              inputRef={inputRef}
              value={addTodo}
              onChangeText={onChangeText}
              icon={<Icon name={"addCircle"} size={26} strokeWidth={1.6} />}
              placeholder={t("todo.add.task")}
              aria-labelledby={"inputLabel"}
              aria-errormessage={"inputError"}
              fontSize={15}
              onFocus={() => inputRef.current?.focus()}
              onSubmitEditing={handleAddTodo}
            />
          </View>
          {/* <FloatingActionButton bottomSheetModalRef={bottomSheetModalRef} /> */}
          {/* <AddTodoBottomSheetSimple bottomSheetModalRef={bottomSheetModalRef} /> */}
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
