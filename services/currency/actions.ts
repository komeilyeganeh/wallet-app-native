import { clientAxios } from "@/lib/http"

// ---- get all currencies ----
export const getAllCurrencies = async () => {
    const res = await clientAxios.get("/Currency/GetAll");    
    return res;
}