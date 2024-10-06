import { Pressable, View } from "react-native";
import { Dispatch, SetStateAction, useMemo } from "react";
import { useAtomValue } from "jotai";
import { useTranslation } from "react-i18next";

import { IUserFS } from "@/types";
import { Text } from "@/components/ui/text";
import Icon from "@/assets/icons";
import { myUserIdAtom } from "@/states/me";
import { cn } from "@/lib/utils";
import { useColorScheme } from "@/lib/useColorScheme";

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
  const { t } = useTranslation();
  const { isDarkColorScheme } = useColorScheme();

  const myUserId = useAtomValue(myUserIdAtom);

  const isItMe = useMemo(() => searchedUser.id === myUserId, [myUserId, searchedUser.id]);

  const handlePress = () => {
    if (userType === "user") {
      setSelectedUsers((prv) => {
        if (!prv.some((user) => user.id === searchedUser.id)) {
          return [...prv, searchedUser];
        }
        return prv;
      });
    } else {
      setSelectedSupervisors((prv) => {
        if (!prv.some((user) => user.id === searchedUser.id)) {
          return [...prv, searchedUser];
        }
        return prv;
      });
    }
    setSearchText("");
  };

  return (
    <Pressable
      className={cn(
        "rounded-2xl p-2",
        isItMe ? (isDarkColorScheme ? "bg-gray-800" : "bg-gray-200") : "",
      )}
      onPress={handlePress}
      disabled={isItMe}
    >
      <View key={index} className={"flex py-2"}>
        <View className={"flex flex-row gap-2"}>
          <Icon name={"user"} size={20} strokeWidth={1.6} />
          <Text key={`searched-user-name-${index}-${searchedUser.id}`} className={"font-semibold"}>
            {`${searchedUser.name} ${isItMe ? t("sendTodo.search.me") : ""}`}
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
