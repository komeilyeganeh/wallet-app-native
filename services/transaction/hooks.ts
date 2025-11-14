// services/transaction/hooks.ts
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "./actions";

export const useGetTransactions = (walletId?: string) => {
  return useQuery({
    queryKey: ["transactions", walletId],
    queryFn: () => {
      let filters: any = {
        orderBy: "",
        includeProperies: "",
      };
      if (walletId) {
        filters.filters = [
          {
            property: "sourceWalletId",
            operation: 5,
            values: [walletId],
          },
          {
            property: "destinationWalletId",
            operation: 5,
            values: [walletId],
          },
        ];
      }      
      return getTransactions(filters);
    },
    enabled: true,
  });
};
