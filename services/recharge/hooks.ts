import { useMutation, useQuery } from "@tanstack/react-query"
import { getMyRecharges, getRechargeById, mobileRecharge } from "./actions"

export const useMobileRecharge = () => {
    return useMutation({
        mutationKey: ["mobile_recharge"],
        mutationFn: mobileRecharge
    })
}

export const useGetMyRecharges = () => {
    return useQuery({
        queryKey: ["my_recharges"],
        queryFn: getMyRecharges
    })
}

export const useGetRechargeById = (id: number) => {
    return useQuery({
        queryKey: ["get_recharge"],
        queryFn: () => getRechargeById(id),
        enabled: !!id
    })
}