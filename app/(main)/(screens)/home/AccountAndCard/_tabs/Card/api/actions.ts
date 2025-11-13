import { clientAxios } from "@/lib/http"

export const getCards = async () => {
    const res = await clientAxios.get("/Shared/GetMyCards");
    return res;
}
export const deleteCard = async (id: number) => {
    const res = await clientAxios.delete(`/Shared/DeletedCard/${id}`);    
    return res;
}