import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "./actions";

export const useGetTransactions = () => {
  return useQuery({
    queryKey: ["get_transactions"],
    queryFn: getTransactions,
  });
};
