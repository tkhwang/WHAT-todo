import React, { RefObject, useCallback, useState } from "react";
import { TextInput, View } from "react-native";
import { useTranslation } from "react-i18next";
import { AddTodoRequest } from "@whatTodo/models";

import { useAddTodoReducer } from "@/hooks/reducers/useAddTodoReducer";
import Icon from "@/assets/icons";
import { useAddTodo } from "@/hooks/mutations/useAddTodo";
import Input from "@/components/Input";

interface Props {
  inputRef: RefObject<TextInput>;
}

export default function AddTodoSimple({ inputRef }: Props) {
  const { t } = useTranslation();

  const [addTodo, setAddTodo] = useState("");
  const [showButttons, setShowButttons] = useState(false);

  const { mutateAsync: addTodoMutationAsync } = useAddTodo();
  const [{ state: addTodoState, isAddTodoLoading, addTodoError }, addTodoDispatch] = useAddTodoReducer();

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
    setShowButttons(false);
  }, [addTodo, addTodoDispatch, addTodoMutationAsync]);

  const handleFocus = () => {
    setShowButttons(true);
    // inputRef.current?.focus();
  };

  const handleBlur = () => {
    setShowButttons(false);
  };

  return (
    <View className={"w-screen p-4 mb-1 gap-4"}>
      <Input
        inputRef={inputRef}
        value={addTodo}
        onChangeText={onChangeText}
        icon={<Icon name={"addCircle"} size={26} strokeWidth={1.6} />}
        placeholder={t("todo.add.task")}
        aria-labelledby={"inputLabel"}
        aria-errormessage={"inputError"}
        fontSize={15}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onSubmitEditing={handleAddTodo}
      />
      {showButttons && (
        <View className={"flex-row gap-6 mx-2"}>
          <Icon name={"calendar"} size={22} strokeWidth={1.5} />
          <Icon name={"alertCircle"} size={22} strokeWidth={1.5} />
          <Icon name={"noteEdit"} size={22} strokeWidth={1.5} />
        </View>
      )}
    </View>
  );
}
