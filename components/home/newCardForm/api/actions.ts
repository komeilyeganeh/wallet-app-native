import { clientAxios } from "@/lib/http"

export const newCard = async (data: any) => {
    const res = await clientAxios.post(`/Shared/AddNewCard`, data);
    return res;
}