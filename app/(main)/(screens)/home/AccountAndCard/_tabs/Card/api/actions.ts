import { clientAxios } from "@/lib/http"

export const getCards = async () => {
    const res = await clientAxios.get("/Shared/GetMyCards");
    return res;
}