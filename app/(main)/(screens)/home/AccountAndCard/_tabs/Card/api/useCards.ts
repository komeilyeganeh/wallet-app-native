import { useMutation, useQuery } from "@tanstack/react-query"
import { deleteCard, getCards } from "./actions"

export const useGetCards = () => {
    return useQuery({
        queryKey: ["get_cards"],
        queryFn: getCards
    })
}
export const useDeleteCard = () => {
    return useMutation({
        mutationKey: ["delete_card"],
        mutationFn: (id: number) => deleteCard(id)
    })
}