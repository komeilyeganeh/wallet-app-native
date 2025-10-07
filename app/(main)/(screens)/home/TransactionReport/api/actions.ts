import { clientAxios } from "@/lib/http"

export const getTransactions = async () => {
    const res = await clientAxios.get("/Transaction/GetAll");
    return res;
}