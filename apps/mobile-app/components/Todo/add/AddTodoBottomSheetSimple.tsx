import { KeyboardAvoidingView, Platform, StyleSheet, TextInput, View } from "react-native";
import React, { RefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";
import BottomSheet, { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Href, useLocalSearchParams, useRouter } from "expo-router";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useTranslation } from "react-i18next";

import { Text } from "@/components/ui/text";
import Input from "@/components/Input";
import { useAddTodoReducer } from "@/hooks/reducers/useAddTodoReducer";

interface Props {
  bottomSheetModalRef: RefObject<BottomSheetModalMethods>;
}

export default function AddTodoBottomSheetSimple({ bottomSheetModalRef }: Props) {
  const { t } = useTranslation();
  const router = useRouter();
  const { previousSegments } = useLocalSearchParams();

  const snapPoints = useMemo(() => ["55%", "75%"], []);

  const textInputRef = useRef<TextInput>(null);

  const [addTodo, setAddTodo] = useState("");

  const [{ state: addTodoState, isAddTodoLoading, addTodoError }, addTodoDispatch] = useAddTodoReducer();

  const renderBackdrop = useCallback(
    (props) => {
      if (Array.isArray(previousSegments)) {
        const targetSegments = `/${previousSegments.join("/")}/`;
        router.push(targetSegments as Href<string | object>);
      }
      return <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} pressBehavior={"close"} />;
    },
    [previousSegments, router],
  );

  const onChangeText = (text: string) => {
    setAddTodo(text);
    if (text.length === 0) {
      addTodoDispatch({ type: "INITIAL" });
    } else {
      addTodoDispatch({ type: "EDITING" });
    }
  };

  return (
    <BottomSheetModal ref={bottomSheetModalRef} index={0} snapPoints={snapPoints} backdropComponent={renderBackdrop}>
      <View className={"flex-1 w-screen gap-4 p-4 mb-4"}>
        <Input
          ref={textInputRef}
          placeholder={t("todo.add.task")}
          value={addTodo}
          onChangeText={onChangeText}
          aria-labelledby={"inputLabel"}
          aria-errormessage={"inputError"}
          fontSize={18}
        />
      </View>
    </BottomSheetModal>
  );
}
