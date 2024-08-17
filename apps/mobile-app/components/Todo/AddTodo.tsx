import { StyleSheet, TextInput, View } from "react-native";
import React, { RefObject, useCallback, useRef, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
      return !prv;
    });
  }, [bottomSheetRef]);

  const handleNewTodo = useCallback(async () => {
    if (!newTodo) return;

    const newTodoDto: AddTodoRequest = {
      todo: newTodo,
    };

    await addTodoMutationAsync(newTodoDto);
  }, [addTodoMutationAsync, newTodo]);

  return (
    <View className={"flex-1 px-10 gap-4"}>
      {/* <View style={styles.container}> */}
      <Text className={"text-xl font-bold text-center"}>{t("bottomSheet.newTask.title")}</Text>
      <KeyboardAwareScrollView className={"flex-1 w-screen"}>
        <View className={"px-4 gap-4"}>
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
          <View>
            <Button className={""} variant={"default"} onPress={handleNewTodo} disabled={newTodo.length === 0}>
              <Text>{"Submit"}</Text>
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
