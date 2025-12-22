import { clientAxios } from "@/lib/http"
import { IWithdraw } from "./types";

export const withdraw = async (data: IWithdraw) => {
    const res = await clientAxios.post("/Shared/Withdraw", data);
    return res;
}