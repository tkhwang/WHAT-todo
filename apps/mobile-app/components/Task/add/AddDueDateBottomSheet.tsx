import { Button, Pressable, Text, View } from "react-native";
import { RefObject, useCallback, useEffect, useMemo } from "react";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { days, Language } from "@whatTodo/models";

import Icon from "@/assets/icons";
import { useDueDateStore } from "@/stores/dueDate";

interface Props {
  todoId: string;
  bottomSheetModalRef: RefObject<BottomSheetModalMethods>;
}
export default function AddDueDateBottomSheet({ todoId, bottomSheetModalRef }: Props) {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const chosenLanguage = useMemo<Language>(() => i18n.language as Language, [i18n.language]);

  const todayDay = useDueDateStore((state) => state.todayDay);
  const tomorrowDay = useDueDateStore((state) => state.tomorrowDay);
  const reset = useDueDateStore((state) => state.reset);
  const setToday = useDueDateStore((state) => state.setToday);

  const snapPoints = useMemo(() => ["35%", "75%"], []);

  const renderBackdrop = useCallback((props) => {
    return <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} pressBehavior={"close"} />;
  }, []);

  const backToDetail = useCallback(() => {
    bottomSheetModalRef.current?.close();
    router.push(`/(auth)/(tabs)/todos/${todoId}`);
  }, [bottomSheetModalRef, router, todoId]);

  const handlePressToday = () => {
    setToday();
    backToDetail();
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <BottomSheetModal ref={bottomSheetModalRef} index={0} snapPoints={snapPoints} backdropComponent={renderBackdrop}>
      <View className={"flex-1 w-screen p-4  gap-4"}>
        {/* title */}
        <View className={"flex-row justify-center items-center"}>
          <Text className={"text-xl font-semibold text-center"}>{t("todo.addDueDate.bottomSheet.title")}</Text>
          <View className={"absolute -right-1"}>
            <Button onPress={backToDetail} title={"Done"} />
          </View>
        </View>

        {/* today */}
        <Pressable className={"flex-row gap-4"} onPress={handlePressToday}>
          <Icon name={"calendarMinus"} size={26} strokeWidth={1.6} />
          <Text className={"text-xl font-normal"}>{t("todo.addDueDate.today")}</Text>
          <Text className={"text-xl font-normal text-gray-400 ml-auto"}>{days[chosenLanguage][todayDay]}</Text>
        </Pressable>

        {/* tomorrow */}
        <View className={"flex-row gap-4"}>
          <Icon name={"calendarCheckOut"} size={26} strokeWidth={1.6} />
          <Text className={"text-xl font-normal"}>{t("todo.addDueDate.tomorrow")}</Text>
          <Text className={"text-xl font-normal text-gray-400 ml-auto"}>{days[chosenLanguage][tomorrowDay]}</Text>
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
