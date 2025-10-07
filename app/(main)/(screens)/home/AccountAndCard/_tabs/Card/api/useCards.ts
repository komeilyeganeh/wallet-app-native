import { useQuery } from "@tanstack/react-query"
import { getCards } from "./actions"

export const useGetCards = () => {
    return useQuery({
        queryKey: ["get_cards"],
        queryFn: getCards
    })
}