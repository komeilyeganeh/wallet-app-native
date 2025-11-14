import { useQuery } from "@tanstack/react-query"
import { getAllCurrencies } from "./actions"

// ---- currency receiving hook ----
export const useGetCurrencies = () => {
    return useQuery({
        queryKey: ["get_all_currencies"],
        queryFn: getAllCurrencies
    })
}