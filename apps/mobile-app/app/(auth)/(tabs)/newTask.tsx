import { StyleSheet, TextInput, View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import { Href, useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

import { Text } from "@/components/ui/text";
import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import MainHeader from "@/components/MainLayout/MainHeader";

export default function NewTaskScreen() {
  const router = useRouter();
  const { previousSegments } = useLocalSearchParams();

  const { t } = useTranslation();

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
      <View style={styles.container}>
        <BottomSheet
          key={key}
          ref={bottomSheetRef}
          index={0}
          onChange={handleSheetChanges}
          snapPoints={["3%", "50%"]}
          backdropComponent={renderBackdrop}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text>{t("bottomSheet.newTask.title")}</Text>
            <View className={"flex-1 w-screen px-4"}>
              <TextInput ref={textInputRef} style={styles.textInput} placeholder={"Add new task..."} />
            </View>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  textInput: {
    width: "100%",
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 20,
  },
});
