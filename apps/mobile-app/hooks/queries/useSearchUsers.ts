import { useQuery } from "@tanstack/react-query";
import { APIS } from "@whatTodo/models";

import { httpClient } from "@/utils";

const getUsersBySearchText = async (searchText?: string) => {
  if (searchText === undefined || searchText == null) return [];

  const { data } = await httpClient.get(`/users/search?searchText=${searchText}`);
  return data;
};

export function useSearchUsers(searchText?: string) {
  return useQuery({
    queryKey: [APIS.users.searchUsers],
    queryFn: () => getUsersBySearchText(searchText),
    enabled: !!searchText,
    select: (data) => data.slice(0, 10),
  });
}
