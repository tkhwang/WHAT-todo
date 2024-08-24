import React, { RefObject, useState } from "react";
import { TextInput, View } from "react-native";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useTranslation } from "react-i18next";

import { Text } from "@/components/ui/text";
import { useAddTodoReducer } from "@/hooks/reducers/useAddTodoReducer";
import { Input } from "@/components/ui/input";

interface Props {
  bottomSheetRef: RefObject<BottomSheetMethods>;
  textInputRef: RefObject<TextInput>;
}

export default function AddTodoSimple({ bottomSheetRef, textInputRef }: Props) {
  const { t } = useTranslation();
  const [addTodo, setAddTodo] = useState("");

  const [{ state: addTodoState, isAddTodoLoading, addTodoError }, addTodoDispatch] = useAddTodoReducer();

  const onChangeText = (text: string) => {
    setAddTodo(text);
    if (text.length === 0) {
      addTodoDispatch({ type: "INITIAL" });
    } else {
      addTodoDispatch({ type: "EDITING" });
    }
  };

  return (
    <View className={"flex-1 w-screen gap-4 p-4 mb-4"}>
      <Text className={"text-xl font-bold text-center"}>{t("todo.add.title")}</Text>
      <View className={"gap-4"}>
        <Input
          ref={textInputRef}
          placeholder={t("todo.add.placehold")}
          value={addTodo}
          onChangeText={onChangeText}
          aria-labelledby={"inputLabel"}
          aria-errormessage={"inputError"}
        />
      </View>
      <View className={"flex-1"} />
    </View>
  );
}
