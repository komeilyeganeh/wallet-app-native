import { clientAxios } from "@/lib/http"

export const transferAmount = async (data: any) => {
    const res = await clientAxios.post("/Shared/ExecuteInternalTransfer", data);
    return res;
}