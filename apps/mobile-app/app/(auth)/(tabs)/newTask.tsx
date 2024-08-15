import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import MainHeader from "@/components/MainLayout/MainHeader";

export default function NewTaskScreen() {
  const { t } = useTranslation();

  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <ScreenWrapper>
      <MainHeader />
      <View style={styles.container}>
        <BottomSheet snapPoints={["50%"]} ref={bottomSheetRef} onChange={handleSheetChanges}>
          <BottomSheetView style={styles.contentContainer}>
            <Text>{"Awesome 🎉"}</Text>
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
