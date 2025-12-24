import { clientAxios } from "@/lib/http"
import { IChangePassword } from "./types";

export const changePAssword = async (data: IChangePassword) => {
    const res = await clientAxios.post("/Security/ChangePassword", data);
    return res;
}