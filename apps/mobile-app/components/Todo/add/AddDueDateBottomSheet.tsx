import { Button, Text, View } from "react-native";
import { RefObject, useCallback, useMemo, useRef } from "react";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";

import Icon from "@/assets/icons";

interface Props {
  bottomSheetModalRef: RefObject<BottomSheetModalMethods>;
}
export default function AddDueDateBottomSheet({ bottomSheetModalRef }: Props) {
  const { t } = useTranslation();
  const router = useRouter();

  const snapPoints = useMemo(() => ["35%", "75%"], []);

  const renderBackdrop = useCallback((props) => {
    return <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} pressBehavior={"close"} />;
  }, []);

  const handlePress = () => {
    bottomSheetModalRef.current?.close();
    router.push("/(auth)/(tabs)/");
  };

  return (
    <BottomSheetModal ref={bottomSheetModalRef} index={0} snapPoints={snapPoints} backdropComponent={renderBackdrop}>
      <View className={"flex-1 w-screen p-4 gap-4"}>
        {/* title */}
        <View className={"flex-row justify-center items-center"}>
          <Text className={"text-xl font-semibold text-center"}>{t("todo.addDueDate.bottomSheet.title")}</Text>
          <View className={"absolute right-0"}>
            <Button onPress={handlePress} title={"Done"} />
          </View>
        </View>

        {/* today */}
        <View className={"flex-row gap-4"}>
          <Icon name={"calendarMinus"} size={26} strokeWidth={1.6} />
          <Text className={"text-xl font-normal"}>{t("todo.addDueDate.today")}</Text>
        </View>

        {/* tomorrow */}
        <View className={"flex-row gap-4"}>
          <Icon name={"calendarCheckOut"} size={26} strokeWidth={1.6} />
          <Text className={"text-xl font-normal"}>{t("todo.addDueDate.tomorrow")}</Text>
        </View>

        {/* next week */}
        <View className={"flex-row gap-4"}>
          <Icon name={"calendarDownload"} size={26} strokeWidth={1.6} />
          <Text className={"text-xl font-normal"}>{t("todo.addDueDate.nextWeek")}</Text>
        </View>

        {/* pick a date */}
        <View className={"flex-row flex-1 gap-4"}>
          <Icon name={"calendarUndated"} size={26} strokeWidth={1.6} />
          <Text className={"text-xl font-normal"}>{t("todo.addDueDate.pickADay")}</Text>
          <View className={"ml-auto"}>
            <Icon name={"arrowRight"} size={26} strokeWidth={1.6} />
          </View>
        </View>
      </View>
    </BottomSheetModal>
  );
}
