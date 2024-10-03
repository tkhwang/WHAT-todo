import { View } from "react-native";

import SearchUserSkeleton from "./SearchUserSkeleton";

export default function SearchUserSkeletonLists() {
  return (
    <View className={"flex flex-col w-full gap-2"}>
      {[0, 1].map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <SearchUserSkeleton key={index} index={index} />
      ))}
    </View>
  );
}
