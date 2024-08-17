import { TextInput } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import { Href, useLocalSearchParams, useRouter } from "expo-router";

import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import MainHeader from "@/components/MainLayout/MainHeader";
import AddTodo from "@/components/Todo/AddTodo";

export default function NewTaskScreen() {
  const router = useRouter();
  const { previousSegments } = useLocalSearchParams();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const textInputRef = useRef<TextInput>(null);

  const [key, setKey] = useState(new Date().getTime());

  useEffect(() => {
    setTimeout(() => {
      bottomSheetRef.current?.snapToIndex(1);
    }, 1000);
    textInputRef.current?.focus();
  });

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        setKey(new Date().getTime());
        if (Array.isArray(previousSegments)) {
          const targetSegments = `/${previousSegments.join("/")}/`;
          router.replace(targetSegments as Href<string | object>);
        }
      }
    },
    [previousSegments, router],
  );

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} pressBehavior={"close"} />,
    [],
  );

  return (
    <ScreenWrapper>
      <MainHeader />
      <BottomSheet
        key={key}
        ref={bottomSheetRef}
        index={0}
        onChange={handleSheetChanges}
        snapPoints={["3%", "50%", "80%"]}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView className={"flex-1 items-center w-screen"}>
          <AddTodo bottomSheetRef={bottomSheetRef} />
        </BottomSheetView>
      </BottomSheet>
    </ScreenWrapper>
  );
}
