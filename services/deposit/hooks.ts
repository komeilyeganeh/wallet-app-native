import { useMutation } from "@tanstack/react-query"
import { deposit } from "./actions"

export const useDeposit = () => {
    return useMutation({
        mutationKey: ["deposit"],
        mutationFn: deposit
    })
}