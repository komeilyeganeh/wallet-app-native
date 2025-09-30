import { clientAxios } from "@/lib/http"

export const GetCurrencies = async () => {
    const res = await clientAxios.get("/Currency/GetAll");
    return res;
}