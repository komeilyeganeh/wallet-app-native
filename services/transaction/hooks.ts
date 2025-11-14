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
            operation: 1,
            values: [walletId?.toString()],
          },
          {
            property: "destinationWalletId",
            operation: 1,
            values: [walletId?.toString()],
          },
        ];
      }      
      return getTransactions(filters);
    },
    enabled: true,
  });
};
