import { clientAxios } from "@/lib/http";

export const GetExchangeRate = async () => {
    const res = await clientAxios.get("/ExchangeRate/GetAll");
    return res;
}