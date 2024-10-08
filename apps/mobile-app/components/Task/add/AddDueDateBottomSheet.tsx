import { Button, Pressable, Text, View } from "react-native";
import { Dispatch, RefObject, SetStateAction, useCallback, useMemo } from "react";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";

import Icon from "@/assets/icons";
import { getDateWithDayOfWeek } from "@/utils/date";

dayjs.extend(weekday);

interface Props {
  todoId: string;
  bottomSheetModalRef: RefObject<BottomSheetModalMethods>;
  today: Date;
  setDueDate: Dispatch<SetStateAction<Date | null>>;
}

export default function AddDueDateBottomSheet({
  todoId,
  bottomSheetModalRef,
  today,
  setDueDate,
}: Props) {
  const { t } = useTranslation();
  const router = useRouter();

  const snapPoints = useMemo(() => ["35%", "75%"], []);

  const renderBackdrop = useCallback((props) => {
    return (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior={"close"}
      />
    );
  }, []);

  const backToDetail = useCallback(() => {
    bottomSheetModalRef.current?.close();
    router.push(`/(auth)/(tabs)/todos/${todoId}`);
  }, [bottomSheetModalRef, router, todoId]);

  const handlePressToday = () => {
    setDueDate(today);
    backToDetail();
  };

  const handlePressTomorrow = () => {
    setDueDate(dayjs(today).add(1, "day").toDate());
    backToDetail();
  };

  const handlePressNextWeek = () => {
    setDueDate(dayjs(today).add(7, "day").toDate());
    backToDetail();
  };

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
    >
      <View className={"flex-1 w-screen p-4  gap-4"}>
        {/* title */}
        <View className={"flex-row justify-center items-center"}>
          <Text className={"text-xl font-semibold text-center"}>
            {t("todo.addDueDate.bottomSheet.title")}
          </Text>
          <View className={"absolute -right-1"}>
            <Button onPress={backToDetail} title={"Done"} />
          </View>
        </View>

        {/* today */}
        <Pressable className={"flex-row gap-4"} onPress={handlePressToday}>
          <Icon name={"calendarMinus"} size={26} strokeWidth={1.6} />
          <Text className={"text-xl font-normal"}>{t("todo.addDueDate.today")}</Text>
          <Text className={"text-xl font-normal text-gray-400 ml-auto"}>
            {getDateWithDayOfWeek(today, 0)}
          </Text>
        </Pressable>

        {/* tomorrow */}
        <Pressable className={"flex-row gap-4"} onPress={handlePressTomorrow}>
          <Icon name={"calendarCheckOut"} size={26} strokeWidth={1.6} />
          <Text className={"text-xl font-normal"}>{t("todo.addDueDate.tomorrow")}</Text>
          <Text className={"text-xl font-normal text-gray-400 ml-auto"}>
            {getDateWithDayOfWeek(today, 1)}
          </Text>
        </Pressable>

        {/* next week */}
        <Pressable className={"flex-row gap-4"} onPress={handlePressNextWeek}>
          <Icon name={"calendarDownload"} size={26} strokeWidth={1.6} />
          <Text className={"text-xl font-normal"}>{t("todo.addDueDate.nextWeek")}</Text>
          <Text className={"text-xl font-normal text-gray-400 ml-auto"}>
            {getDateWithDayOfWeek(today, 7)}
          </Text>
        </Pressable>

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
