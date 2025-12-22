import { useMutation } from "@tanstack/react-query"
import { withdraw } from "./actions"

export const useWithdraw = () => {
    return useMutation({
        mutationKey: ["withdraw"],
        mutationFn: withdraw
    })
}