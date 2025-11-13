import { useQuery } from "@tanstack/react-query";
import { getMyWallets } from "../actions";

export const useGetMyWallets = (userId?: string | null) => {
  return useQuery({
    queryKey: ["get_my_wallets", userId],
    queryFn: () => {
      const filters = userId
        ? {
            filters: [
              {
                property: "userId",
                operation: 1,
                values: [userId],
              },
            ],
            orderBy: "",
            includeProperies: "",
          }
        : undefined;

      return getMyWallets(filters);
    },
    enabled: !!userId,
  });
};
