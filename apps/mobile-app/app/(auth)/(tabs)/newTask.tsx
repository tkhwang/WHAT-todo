import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";

import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import MainHeader from "@/components/MainLayout/MainHeader";

export default function NewTaskScreen() {
  const router = useRouter();

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [key, setKey] = useState(new Date().getTime());

  useEffect(() => {
    // Open the bottom sheet when the component mounts
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  // callbacks
  const handleSheetChanges = useCallback(
    (index: number) => {
      console.log("handleSheetChanges", index);
      if (index === -1) {
        // bottomSheetRef.current?.close();
        setKey(new Date().getTime());
        router.back();
      }
    },
    [router],
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
          onChange={handleSheetChanges}
          snapPoints={["50%"]}
          backdropComponent={renderBackdrop}
        >
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
    backgroundColor: "cyan",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
