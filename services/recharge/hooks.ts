import { useMutation } from "@tanstack/react-query"
import { mobileRecharge } from "./actions"

export const useMobileRecharge = () => {
    return useMutation({
        mutationKey: ["mobile_recharge"],
        mutationFn: mobileRecharge
    })
}