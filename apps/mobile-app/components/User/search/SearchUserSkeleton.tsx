import { View } from "react-native";

import Icon from "@/assets/icons";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  index: number;
}

export default function SearchUserSkeleton({ index }: Props) {
  return (
    <View key={index} className={"flex py-2"}>
      <View className={"flex flex-row gap-2"}>
        <Icon name={"user"} size={20} strokeWidth={1.6} />
        <Skeleton className={"h-4 w-[100px]"} />
      </View>
      <View className={"flex flex-row gap-2"}>
        <Icon name={"passport"} size={20} strokeWidth={1.6} />
        <Skeleton className={"h-4 w-[180px]"} />
      </View>
      <View className={"flex flex-row gap-2"}>
        <Icon name={"mailAtSign"} size={20} strokeWidth={1.6} />
        <Skeleton className={"h-4 w-[290px]"} />
      </View>
    </View>
  );
}
