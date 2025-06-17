import { QueryClient } from "react-query";

export function generateQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: parseInt(Number.MAX_SAFE_INTEGER / 2),
        cacheTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    },
  });
}

export const queryClient = generateQueryClient();
