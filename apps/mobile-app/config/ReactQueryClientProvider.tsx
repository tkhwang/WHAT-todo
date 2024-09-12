import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import React from "react";

interface Props {
  children: React.ReactNode;
}
export function ReactQueryClientProvider({ children }: Props) {
  const queryClient = new QueryClient();
  useReactQueryDevTools(queryClient);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
