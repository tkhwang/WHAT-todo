import { TextInput, View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import { Href, useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Text } from "@/components/ui/text";
import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import MainHeader from "@/components/MainLayout/MainHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NewTaskScreen() {
  const router = useRouter();
  const { previousSegments } = useLocalSearchParams();
  const { t } = useTranslation();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const textInputRef = useRef<TextInput>(null);

  const [key, setKey] = useState(new Date().getTime());
  const [newTask, setNewTask] = useState("");

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

  const onChangeText = (text: string) => {
    setNewTask(text);
  };

  return (
    <ScreenWrapper>
      <MainHeader />

      <BottomSheet
        key={key}
        ref={bottomSheetRef}
        index={0}
        onChange={handleSheetChanges}
        snapPoints={["3%", "60%"]}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView className={"flex-1 items-center"}>
          <KeyboardAwareScrollView className={"flex-1 w-screen"}>
            <View className={"flex-1 px-4 gap-4"}>
              <Text className={"text-xl font-bold text-center"}>{t("bottomSheet.newTask.title")}</Text>
              <Input
                ref={textInputRef}
                className={"my-4"}
                placeholder={t("task.create.placehold")}
                value={newTask}
                onChangeText={onChangeText}
                aria-labelledby={"inputLabel"}
                aria-errormessage={"inputError"}
              />
              <View>
                <Button className={""} variant={"default"}>
                  <Text>{"Submit"}</Text>
                </Button>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </BottomSheetView>
      </BottomSheet>
    </ScreenWrapper>
  );
}
