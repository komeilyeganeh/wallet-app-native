import { clientAxios } from "@/lib/http"
import { IMobileRecharge } from "./types";

export const mobileRecharge = async (data: IMobileRecharge) => {
    const res = await clientAxios.post("/MobileRecharge/RechargeMobile", data);
    return res;
}

export const getMyRecharges = async () => {
    const res = await clientAxios.get("/MobileRecharge/GetMyRecharges");
    return res;
}

export const getRechargeById = async (id: number) => {
    const res = await clientAxios.get(`/MobileRecharge/GetRechargeById/${id}`)
    return res;
}