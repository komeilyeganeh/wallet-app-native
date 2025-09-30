import { useMutation, useQuery } from "@tanstack/react-query";
import { GetCurrencies } from "./actions";

export const useGetCurrency = () => {
  return useQuery({
    queryKey: ["get_currencies"],
    queryFn: GetCurrencies,
  });
};