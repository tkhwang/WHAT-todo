import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import MainHeader from "@/components/MainLayout/MainHeader";

export default function NewTaskScreen() {
  const { t } = useTranslation();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <ScreenWrapper>
      <MainHeader />
      <View style={styles.container}>
        <BottomSheet ref={bottomSheetRef} snapPoints={["50%"]} onChange={handleSheetChanges}>
          <BottomSheetView style={styles.contentContainer}>
            <Text className={"text-base font-medium"}>{t("task.create.title")}</Text>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
