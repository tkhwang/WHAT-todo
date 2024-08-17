import { Keyboard, TextInput, View } from "react-native";
import React, { RefObject, useCallback, useRef, useState } from "react";
import { Calendar, DateData } from "react-native-calendars";
import { AddTodoRequest } from "@whatTodo/models";
import { useTranslation } from "react-i18next";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

import { Text } from "@/components/ui/text";
import { useAddTodo } from "@/hooks/mutations/useAddTodo";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface Props {
  bottomSheetRef: RefObject<BottomSheetMethods>;
}

export default function AddTodo({ bottomSheetRef }: Props) {
  const { t } = useTranslation();
  const textInputRef = useRef<TextInput>(null);

  const { mutateAsync: addTodoMutationAsync } = useAddTodo();

  const [newTodo, setNewTodo] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(new Date());

  const onChangeText = (text: string) => {
    setNewTodo(text);
  };

  const handlePressDate = useCallback(() => {
    setShowCalendar((prv: boolean) => {
      if (prv) {
        bottomSheetRef.current?.snapToIndex(1);
      } else {
        bottomSheetRef.current?.snapToIndex(2);
      }
      Keyboard.dismiss();
      return !prv;
    });
  }, [bottomSheetRef]);

  const handleNewTodo = useCallback(async () => {
    if (!newTodo) return;

    const newTodoDto: AddTodoRequest = {
      todo: newTodo,
    };

    try {
      await addTodoMutationAsync(newTodoDto);
      bottomSheetRef.current?.close();
    } catch (error: unknown) {
      if (error instanceof Error) {
        // TODO: (taekeun) handle error
        console.log(error.message);
      }
    }
  }, [addTodoMutationAsync, bottomSheetRef, newTodo]);

  return (
    <View className={"flex-1 w-screen gap-4 p-4"}>
      <Text className={"text-xl font-bold text-center"}>{t("bottomSheet.newTask.title")}</Text>
      <View className={"gap-4"}>
        <Input
          ref={textInputRef}
          placeholder={t("task.create.placehold")}
          value={newTodo}
          onChangeText={onChangeText}
          aria-labelledby={"inputLabel"}
          aria-errormessage={"inputError"}
        />
        <Button variant={"outline"} onPress={handlePressDate} className={"w-28"}>
          <Text>{date.toLocaleDateString(undefined, { month: "2-digit", day: "2-digit" })}</Text>
        </Button>
        {showCalendar && (
          <Calendar
            onDayPress={(day: DateData) => {
              console.log("selected day", day);
            }}
          />
        )}
        <View className={"pb-4"}>
          <Button variant={"default"} onPress={handleNewTodo} disabled={newTodo.length === 0}>
            <Text>{"Submit"}</Text>
          </Button>
        </View>
      </View>
      <View className={"flex-1"} />
    </View>
  );
}
