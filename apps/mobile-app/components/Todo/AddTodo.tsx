import { Keyboard, TextInput, View } from "react-native";
import React, { RefObject, useCallback, useState } from "react";
import { Calendar, DateData } from "react-native-calendars";
import { AddTodoRequest } from "@whatTodo/models";
import { useTranslation } from "react-i18next";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

import { Text } from "@/components/ui/text";
import { useAddTodo } from "@/hooks/mutations/useAddTodo";
import { useAddTodoReducer } from "@/hooks/reducers/useAddTodoReducer";
import { appTheme } from "@/constants/uiConsts";

import { Input } from "../ui/input";
import { Button as RNRButton } from "../ui/button";
import Button from "../Button/Button";

interface Props {
  bottomSheetRef: RefObject<BottomSheetMethods>;
  textInputRef: RefObject<TextInput>;
}

export default function AddTodo({ bottomSheetRef, textInputRef }: Props) {
  const { t } = useTranslation();

  const { mutateAsync: addTodoMutationAsync } = useAddTodo();

  const [addTodo, setAddTodo] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(new Date());

  const [{ state: addTodoState, isAddTodoLoading, addTodoError }, addTodoDispatch] = useAddTodoReducer();

  const onChangeText = (text: string) => {
    setAddTodo(text);
    if (text.length === 0) {
      addTodoDispatch({ type: "INITIAL" });
    } else {
      addTodoDispatch({ type: "EDITING" });
    }
  };

  const handlePressDate = useCallback(() => {
    setShowCalendar((prv: boolean) => {
      if (prv) {
        bottomSheetRef.current?.snapToIndex(-1);
      } else {
        bottomSheetRef.current?.snapToIndex(0);
      }
      Keyboard.dismiss();
      return !prv;
    });
  }, [bottomSheetRef]);

  const handleAddTodo = useCallback(async () => {
    if (!addTodo) return;

    const addTodoDto: AddTodoRequest = {
      todo: addTodo,
    };

    addTodoDispatch({ type: "UPLOAD" });
    await addTodoMutationAsync(addTodoDto);
    bottomSheetRef.current?.close();
  }, [addTodo, addTodoDispatch, addTodoMutationAsync, bottomSheetRef]);

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
        <RNRButton variant={"outline"} onPress={handlePressDate} className={"w-28"}>
          <Text>{date.toLocaleDateString(undefined, { month: "2-digit", day: "2-digit" })}</Text>
        </RNRButton>
        {addTodoError && <Text className={"text-xl  text-red-600"}>{addTodoError}</Text>}
        {showCalendar && (
          <Calendar
            onDayPress={(day: DateData) => {
              console.log("selected day", day);
            }}
          />
        )}
        <View className={"pb-4"}>
          <Button
            onPress={handleAddTodo}
            title={t("todo.action.add")}
            color={appTheme.colors.primary}
            loading={isAddTodoLoading}
            disabled={addTodoState !== "EDITING"}
            buttonStyle={{
              backgroundColor:
                addTodoState === "INITIAL" || addTodoState === "ERROR" ? appTheme.colors.gray : appTheme.colors.primary,
            }}
          />
        </View>
      </View>
      <View className={"flex-1"} />
    </View>
  );
}
