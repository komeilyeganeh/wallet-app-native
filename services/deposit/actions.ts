import { clientAxios } from "@/lib/http"
import { IDeposit } from "./types";

export const deposit = async (data: IDeposit) => {
    const res = await clientAxios.post("/Shared/Deposit", data);
    return res;
}