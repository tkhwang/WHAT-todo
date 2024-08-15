import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import { Href, useLocalSearchParams, useRouter } from "expo-router";

import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import MainHeader from "@/components/MainLayout/MainHeader";

export default function NewTaskScreen() {
  const router = useRouter();
  const { previousSegments } = useLocalSearchParams();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const textInputRef = useRef<TextInput>(null);

  const [key, setKey] = useState(new Date().getTime());

  useEffect(() => {
    textInputRef.current?.focus();
  }, []);

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
          onChange={handleSheetChanges}
          snapPoints={["50%"]}
          backdropComponent={renderBackdrop}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text>{"Awesome 🎉"}</Text>
            <TextInput ref={textInputRef} style={styles.textInput} placeholder={"Type here..."} />
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
