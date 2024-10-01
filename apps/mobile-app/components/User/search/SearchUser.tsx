import { Pressable, View } from "react-native";
import { Dispatch, SetStateAction } from "react";

import { IUserFS } from "@/types";
import { Text } from "@/components/ui/text";
import Icon from "@/assets/icons";

interface Props {
  index: number;
  userType: "user" | "supervisor";
  setSearchText: Dispatch<SetStateAction<string>>;
  searchedUser: IUserFS;
  setSelectedUsers: Dispatch<SetStateAction<IUserFS[]>>;
  setSelectedSupervisors: Dispatch<SetStateAction<IUserFS[]>>;
}

export default function SearchUser({
  index,
  userType,
  setSearchText,
  searchedUser,
  setSelectedUsers,
  setSelectedSupervisors,
}: Props) {
  const handlePress = () => {
    if (userType === "user") {
      setSelectedUsers((prv) => {
        if (!prv.some((user) => user.id === searchedUser.id)) {
          return [searchedUser, ...prv];
        }
        return prv;
      });
    } else {
      setSelectedSupervisors((prv) => {
        if (!prv.some((user) => user.id === searchedUser.id)) {
          return [searchedUser, ...prv];
        }
        return prv;
      });
    }
    setSearchText("");
  };

  return (
    <Pressable onPress={handlePress}>
      <View key={index} className={"flex py-2"}>
        <View className={"flex flex-row gap-2"}>
          <Icon name={"user"} size={20} strokeWidth={1.6} />
          <Text key={`searched-user-name-${index}-${searchedUser.id}`} className={"font-semibold"}>
            {searchedUser.name}
          </Text>
        </View>
        <View className={"flex flex-row gap-2"}>
          <Icon name={"passport"} size={20} strokeWidth={1.6} />
          <Text key={`searched-user-whatTodoId-${index}-${searchedUser.id}`}>
            {searchedUser.whatTodoId}
          </Text>
        </View>
        <View className={"flex flex-row gap-2"}>
          <Icon name={"mailAtSign"} size={20} strokeWidth={1.6} />
          <Text key={`searched-user-email-${index}-${searchedUser.id}`}>{searchedUser.email}</Text>
        </View>
      </View>
    </Pressable>
  );
}
