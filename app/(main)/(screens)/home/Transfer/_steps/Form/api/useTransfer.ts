import { useMutation } from "@tanstack/react-query"
import { transferAmount } from "./actions"

export const useTransferAmount = () => {
    return useMutation({
        mutationKey: ["transfer_amount"],
        mutationFn: transferAmount 
    })
}