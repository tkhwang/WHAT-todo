import { View } from "react-native";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

import { Text } from "@/components/ui/text";
import { currentListIdAtom } from "@/states/list";

interface Props {
  listId: string;
}

export function TodoList({ listId }: Props) {
  const setCurrentListId = useSetAtom(currentListIdAtom);

  useEffect(() => {
    setCurrentListId(listId);

    return () => {
      setCurrentListId(null);
    };
  }, [listId, setCurrentListId]);

  return (
    <View className={"flex-1"}>
      <Text className={"text-xl font-normal"}>{listId}</Text>
    </View>
  );
}
