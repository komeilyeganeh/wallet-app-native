import { clientAxios } from "@/lib/http"
import { IMobileRecharge } from "./types";

export const mobileRecharge = async (data: IMobileRecharge) => {
    const res = await clientAxios.post("/MobileRecharge/RechargeMobile", data);
    return res;
}