import { Pressable, View } from "react-native";
import { Dispatch, SetStateAction } from "react";

import { Text } from "@/components/ui/text";
import { IUserFS } from "@/types";
import Icon from "@/assets/icons";
import { cn } from "@/lib/utils";
import { useColorScheme } from "@/lib/useColorScheme";

interface Props {
  selectedUser: IUserFS;
  setSelectedUsers: Dispatch<SetStateAction<IUserFS[]>>;
}

export default function SelectedUser({ selectedUser, setSelectedUsers }: Props) {
  const { isDarkColorScheme } = useColorScheme();

  const handlePress = () => {
    setSelectedUsers((prv) => prv.filter((user) => user.id !== selectedUser.id));
  };

  return (
    <View key={selectedUser.id} className={"m-1"}>
      <View
        className={cn(
          "block flex-row items-center px-3 py-1 rounded-2xl",
          isDarkColorScheme ? "bg-gray-700" : "bg-gray-200",
        )}
      >
        <Text
          className={"mr-2 text-lg text-foreground"}
        >{`${selectedUser.name} (${selectedUser.email})`}</Text>
        <Pressable className={""} onPress={handlePress}>
          <Icon name={"cancelCircle"} size={26} strokeWidth={1.6} />
        </Pressable>
      </View>
    </View>
  );
}
