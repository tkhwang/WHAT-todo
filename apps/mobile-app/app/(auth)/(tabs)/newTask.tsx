import { KeyboardAvoidingView, Platform, TextInput, View } from "react-native";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { Href, useLocalSearchParams, useRouter } from "expo-router";

import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import MainHeader from "@/components/MainLayout/MainHeader";
import AddTodo from "@/components/Todo/AddTodo";

export default function NewTaskScreen() {
  const router = useRouter();
  const { previousSegments } = useLocalSearchParams();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const textInputRef = useRef<TextInput>(null);

  const snapPoints = useMemo(() => ["75%"], []);

  // TODO: (tkhwang) check depedency
  useEffect(() => {
    bottomSheetModalRef.current?.present();
    textInputRef.current?.focus();
  });

  const renderBackdrop = useCallback(
    (props) => {
      if (Array.isArray(previousSegments)) {
        const targetSegments = `/${previousSegments.join("/")}/`;
        router.replace(targetSegments as Href<string | object>);
      }
      return <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} pressBehavior={"close"} />;
    },
    [previousSegments, router],
  );

  return (
    <ScreenWrapper>
      <MainHeader />
      <KeyboardAvoidingView className={"flex-1 w-screen"} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View className={"flex-1 w-screen justify-end w-full"}>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
          >
            <View className={"flex-1 items-center"}>
              <AddTodo bottomSheetRef={bottomSheetModalRef} textInputRef={textInputRef} />
            </View>
          </BottomSheetModal>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
