import { useMutation } from "@tanstack/react-query"
import { newCard } from "./actions"

export const useAddCard = () => {
    return useMutation({
        mutationKey: ["add_card"],
        mutationFn: newCard
    })
}